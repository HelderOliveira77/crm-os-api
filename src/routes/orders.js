// src/routes/orders.js

const express = require('express');
const cors    = require('cors');
const router = express.Router(); 
const Order = require('../models/Order'); // <--- Certifique-se que o caminho está correto!

const { verifyToken } = require('../middleware/auth'); // O caminho é '../middleware/auth' a partir de 'src/routes'





// ROTA: POST /api/os
// Objetivo: Criar uma nova Ordem de Serviço
// [ADICIONAR O verifyToken AQUI]
router.post('/', verifyToken, async (req, res) => {
  try {
    // Nota: O req.body deve conter os campos necessários (ex: cliente, descricao)
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

// [MELHORIA DE SEGURANÇA] Proteger a listagem também (GET)
// ROTA: GET /api/os
router.get('/', verifyToken, async (req, res) => { 
  try {
    const orders = await Order.findAll({
      // SE RETIRAR OS ATRIBUTOS APARECEM TODOS OS CAMPOS
        // ADICIONE os campos que faltam aqui:
        // attributes: [
        //     'id', 
        //     'num_o_s', 
        //     'cliente', 
        //     'estado', 
        //     'data_aber', 
        //     'formato',        
        //     'cores_miolo',    
        //     'observacoes_miolo' 
        // ],
        order: [['data_aber', 'DESC']]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar OS' });
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
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const orderId = parseInt(req.params.id, 10);

    // 1. Encontra a OS
    const order = await Order.findByPk(orderId);

    if (!order) {
      // Retorna 404 se não for encontrada
      return res.status(404).json({ message: 'Ordem de Serviço não encontrada.' });
    }

    // 2. Atualiza os dados no objeto da OS
    const updatedOrder = await order.update({
      ...req.body,       // Mantém o que veio do formulário
      updatedAt: new Date() // Adiciona/Força a data atual no objeto de atualização
  });
    // 3. Retorna a OS atualizada
    return res.status(200).json(updatedOrder);
  } catch (error) {
    console.error('Erro no PUT:', error);
    res.status(500).json({ message: 'Erro interno ao atualizar Ordem de Serviço.' });
  }
});


// ROTA: DELETE /api/os/:id
// Objetivo: Eliminar uma Ordem de Serviço por ID
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Order.destroy({
      where: { id: id }
    });

    if (deleted) {
      return res.status(200).json({ message: "Ordem de serviço apagada com sucesso." });
    }
    
    return res.status(404).json({ message: "Ordem de serviço não encontrada." });
  } catch (error) {
    console.error('Erro ao eliminar:', error);
    res.status(500).json({ message: "Erro interno ao eliminar." });
  }
});



module.exports = router; 