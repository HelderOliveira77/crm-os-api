// src/routes/auth.js

const express = require('express');
const jwt = require('jsonwebtoken'); 
const router = express.Router();
const User = require('../models/User'); // Importa o modelo User

// ROTA DE REGISTO: POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username e Password são obrigatórios.' });
  }

  try {
    const newUser = await User.create({ username, password, role });

    const userResponse = { id: newUser.id, username: newUser.username, role: newUser.role, message: 'Utilizador registado com sucesso.' };
    
    res.status(201).json(userResponse);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'O nome de utilizador já existe.' });
    }
    console.error('Erro no Registo:', error);
    res.status(500).json({ message: 'Erro interno ao registar utilizador.' });
  }
});


// ROTA DE LOGIN: POST /auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ message: 'Credenciais Inválidas.' });
    }
    
    const payload = { id: user.id, role: user.role };

    const token = jwt.sign(
      payload, 
      'SEGREDO_MUITO_SEGURO', // MUDAR PARA VARIÁVEL DE AMBIENTE NUM PROJETO REAL!
      { expiresIn: '1h' }     
    );

    res.status(200).json({ 
      token, 
      user: { id: user.id, username: user.username, role: user.role } 
    });

  } catch (error) {
    console.error('Erro no Login:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});


module.exports = router;