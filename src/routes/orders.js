// src/routes/orders.js

const express = require('express');
const router = express.Router(); 
const Order = require('../models/Order'); 
const { verifyToken } = require('../middleware/auth');

// Middleware para verificar permissões (Mantido como estava)
const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    // O req.user é preenchido pelo verifyToken antes deste middleware
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: `Acesso negado: a sua função (${req.user?.role || 'Desconhecida'}) não permite esta ação.` 
      });
    }
    next();
  };
};

// --- ROTAS ---

// 1. LISTAR TODAS (GET /api/os)
// Acesso: Qualquer utilizador autenticado (Admin, Technician, Viewer)
router.get('/', verifyToken, async (req, res) => { 
  try {
    const orders = await Order.findAll({
        order: [['num_o_s', 'DESC']]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar OS' });
  }
});

// 2. CRIAR NOVA (POST /api/os)
// Acesso: Apenas Admin e Technician
router.post('/', verifyToken, checkRole(['Admin', 'Technician']), async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder); 
  } catch (error) {
    console.error('Erro ao criar OS:', error);
    res.status(500).json({ message: 'Erro ao criar a Ordem de Serviço.' });
  }
});

// 3. BUSCAR ESPECÍFICA (GET /api/os/:id)
// Acesso: Todos os autenticados
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id); 
    if (!order) return res.status(404).json({ message: 'OS não encontrada.' });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar OS.' });
  }
});

// 4. ATUALIZAR (PUT /api/os/:id)
// Acesso: Apenas Admin e Technician
router.put('/:id', verifyToken, checkRole(['Admin', 'Technician']), async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: 'OS não encontrada.' });

    const updatedOrder = await order.update({
      ...req.body,
      updatedAt: new Date()
    });
    return res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar OS.' });
  }
});

// 5. ELIMINAR (DELETE /api/os/:id)
// Acesso: APENAS ADMIN
router.delete('/:id', verifyToken, checkRole(['Admin']), async (req, res) => {
  try {
    const deleted = await Order.destroy({ where: { id: req.params.id } });
    if (deleted) {
      return res.status(200).json({ message: "Ordem de serviço apagada com sucesso." });
    }
    return res.status(404).json({ message: "Ordem de serviço não encontrada." });
  } catch (error) {
    res.status(500).json({ message: "Erro interno ao eliminar." });
  }
});

module.exports = router;