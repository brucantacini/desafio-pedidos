/**
 * Controller dos pedidos - CRUD e transformação dos dados
 */
const Order = require('../models/Order.js');
const { mapRequestToOrder, mapOrderToResponse } = require('../utils/mapOrderRequest.js');

/**
 * Cria um novo pedido.
 * Recebe no body o JSON com numeroPedido, valorTotal, dataCriacao, items.
 * Faz o mapping dos campos e persiste no MongoDB.
 */
async function createOrder(req, res, next) {
  try {
    const body = req.body;
    if (!body || typeof body !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Envie um JSON no body. No Postman: Body → raw → selecione "JSON" no dropdown.',
      });
    }

    const mapped = mapRequestToOrder(body);

    if (!mapped.orderId) {
      return res.status(400).json({
        success: false,
        message: 'Campo obrigatório ausente: numeroPedido',
      });
    }

    const existing = await Order.findOne({ orderId: mapped.orderId });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `Já existe um pedido com o número: ${mapped.orderId}`,
      });
    }

    const order = new Order(mapped);
    await order.save();

    return res.status(201).json({
      success: true,
      message: 'Pedido criado com sucesso',
      data: mapOrderToResponse(order),
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Obtém um pedido pelo número do pedido (orderId), passado como parâmetro na URL.
 */
async function getOrderByNumber(req, res, next) {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Pedido não encontrado: ${orderId}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: mapOrderToResponse(order),
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Lista todos os pedidos.
 */
async function listOrders(req, res, next) {
  try {
    const orders = await Order.find({}).sort({ creationDate: -1 });
    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders.map(mapOrderToResponse),
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Atualiza um pedido pelo número do pedido.
 * Body no mesmo formato da criação (numeroPedido, valorTotal, dataCriacao, items).
 */
async function updateOrder(req, res, next) {
  try {
    const { orderId } = req.params;
    const mapped = mapRequestToOrder(req.body);

    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Pedido não encontrado: ${orderId}`,
      });
    }

    order.value = mapped.value;
    order.creationDate = mapped.creationDate;
    order.items = mapped.items;
    await order.save();

    return res.status(200).json({
      success: true,
      message: 'Pedido atualizado com sucesso',
      data: mapOrderToResponse(order),
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Remove um pedido pelo número do pedido.
 */
async function deleteOrder(req, res, next) {
  try {
    const { orderId } = req.params;
    const order = await Order.findOneAndDelete({ orderId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Pedido não encontrado: ${orderId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Pedido excluído com sucesso',
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createOrder,
  getOrderByNumber,
  listOrders,
  updateOrder,
  deleteOrder,
};
