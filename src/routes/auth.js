const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize'); // Importante para a lógica do "OU"
const User = require('../models/User');

// --- ROTA DE LOGIN ---
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body; // 'username' aqui é o que o user digitou

    // 1. Procura por username OU email
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { username: username },
          { email: username }
        ]
      }
    });

    // 2. Verifica se utilizador existe
    if (!user) {
      return res.status(401).json({ success: false, message: 'Utilizador ou Email não encontrado.' });
    }

    // 3. Verifica a password (usando o método do seu Model)
    const isMatch = await user.validPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Password incorreta.' });
    }

    // 4. Gera o Token
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      'SEGREDO_MUITO_SEGURO',
      { expiresIn: '8h' }
    );

    // 5. Responde ao Frontend
    res.json({
      success: true,
      token,
      user: {
        username: user.username,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro interno no servidor.' });
  }
});

// --- ROTA DE REGISTO (PARA REFERÊNCIA) ---
router.post('/register', async (req, res) => {
  try {
    // 1. Extraímos os três campos do corpo da requisição
    const { username, email, password } = req.body;

    // 2. Criamos o utilizador no MySQL
    // O Sequelize vai mapear 'email' para a nova coluna que criou
    const newUser = await User.create({ 
      username, 
      email, 
      password,
      role: 'Technician' // <--- Define aqui a role padrão/por defeito como Technician
    });

    res.status(201).json({ 
      success: true, 
      message: 'Utilizador registado com sucesso!' 
    });
  } catch (error) {
    console.error("Erro no registo:", error);
    
    // 3. Tratamento de erro para UNIQUE (Email ou Username já existentes)
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ 
        success: false, 
        message: 'O nome de utilizador ou email já estão em uso.' 
      });
    }

    res.status(400).json({ success: false, message: 'Erro ao criar conta.' });
  }
});
module.exports = router;