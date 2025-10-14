// src/routes/orders.js

const express = require('express');
const router = express.Router(); 
const Order = require('../models/Order'); // <--- Certifique-se que o caminho está correto!

// ROTA: POST /api/orders
// Objetivo: Criar uma nova Ordem de Serviço
router.post('/', async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder); 
  } catch (error) {
    console.error('Erro ao criar OS:', error);
    res.status(500).json({ 
        message: 'Erro interno do servidor ao criar a Ordem de Serviço.',
        error: error.message
    });
  }
});

// ROTA: GET /api/orders
// Objetivo: Listar todas as Ordens de Serviço
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.status(200).json(orders); 
  } catch (error) {
    console.error('Erro ao listar OS:', error);
    res.status(500).json({ 
        message: 'Erro interno do servidor ao listar Ordens de Serviço.',
        error: error.message
    });
  }
});


// ROTA: GET /api/orders/:id
// Objetivo: Buscar uma Ordem de Serviço específica por ID
router.get('/:id', async (req, res) => {
  try {
    // Pega o ID da URL (ex: /api/orders/5)
    const order = await Order.findByPk(req.params.id); 
    
    if (!order) {
      // Se não encontrar, retorna 404
      return res.status(404).json({ message: 'Ordem de Serviço não encontrada.' });
    }
    
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar Ordem de Serviço.' });
  }
});


// ROTA: PUT /api/orders/:id
// Objetivo: Atualizar uma Ordem de Serviço por ID
router.put('/:id', async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);
    
    // 1. Encontra a OS
    const order = await Order.findByPk(orderId);
    
    if (!order) {
      // Retorna 404 se não for encontrada
      return res.status(404).json({ message: 'Ordem de Serviço não encontrada.' });
    }
    
    // 2. Atualiza os dados no objeto da OS
    const updatedOrder = await order.update(req.body); 

    // 3. Retorna a OS atualizada
    return res.status(200).json(updatedOrder);

  } catch (error) {
    console.error('Erro no PUT:', error);
    res.status(500).json({ message: 'Erro interno ao atualizar Ordem de Serviço.' });
  }
});


// ROTA: DELETE /api/orders/:id
// Objetivo: Eliminar uma Ordem de Serviço por ID
router.delete('/:id', async (req, res) => {
  try {
    // 1. Converter o ID para número
    const orderId = parseInt(req.params.id, 10); 

    const deletedCount = await Order.destroy({
      // 2. Usar o ID convertido
      where: { id: orderId } 
    });

    if (deletedCount === 0) {
      return res.status(404).json({ message: 'Ordem de Serviço não encontrada.' });
    }


    // Retorna 204 No Content para indicar sucesso na eliminação
    return res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ message: 'Erro ao eliminar Ordem de Serviço.' });
  } // <--- ESTA CHAVE ESTAVA A FALTAR/MAL COLOCADA

}); // <--- ESTE PARÊNTESE FECHA o router.delete
// AQUI DEVE ESTAR O module.exports = router; (Certifique-se que está no final)


module.exports = router; 