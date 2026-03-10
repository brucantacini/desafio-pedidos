const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrderByNumber,
  listOrders,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController.js');

router.post('/order', createOrder);

router.get('/order/list', listOrders);

router.get('/order/:orderId', getOrderByNumber);

router.put('/order/:orderId', updateOrder);

router.delete('/order/:orderId', deleteOrder);

module.exports = router;
