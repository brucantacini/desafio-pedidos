/**
 * Rotas da API de pedidos
 * Ordem importa: /order/list antes de /order/:orderId para não tratar "list" como orderId
 */
const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderByNumber,
  listOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController.js');

// Criar novo pedido (obrigatório)
router.post('/order', createOrder);

// Listar todos os pedidos (opcional) - deve vir antes de /order/:orderId
router.get('/order/list', listOrders);

// Obter pedido por número (obrigatório)
router.get('/order/:orderId', getOrderByNumber);

// Atualizar pedido (opcional)
router.put('/order/:orderId', updateOrder);

// Deletar pedido (opcional)
router.delete('/order/:orderId', deleteOrder);

module.exports = router;
