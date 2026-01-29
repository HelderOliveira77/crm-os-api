// src/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken } = require('../middleware/auth');

// ROTA PARA LISTAR TODOS (Importante para o UsersManagement.jsx)
router.get('/', verifyToken, async (req, res) => {
  try {
    // Apenas Admins podem listar
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Acesso negado.' });
    }

    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'role'] // Segurança: não enviamos a password
    });
    
    res.json(users);
  } catch (error) {
    console.error("Erro ao listar users:", error);
    res.status(500).json({ message: 'Erro ao buscar utilizadores.' });
  }
});

/// ROTA PARA ATUALIZAR ROLE (AGORA COM LÓGICA)
router.put('/update-role/:id', verifyToken, async (req, res) => {
    try {
      const { role } = req.body;
      const userId = req.params.id;
  
      // 1. Verificação de segurança: apenas Admins podem mudar roles
      if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Acesso negado. Apenas administradores.' });
      }
  
      // 2. Procurar o utilizador
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: 'Utilizador não encontrado.' });
      }
  
      // 3. Atualizar e guardar
      await user.update({ role });
      
      // 4. Enviar resposta de sucesso
      res.json({ success: true, message: `Role de ${user.username} atualizada para ${role}!` });
  
    } catch (error) {
      console.error("Erro ao atualizar role:", error);
      res.status(500).json({ message: 'Erro interno ao atualizar role.' });
    }
  });
  
  module.exports = router;