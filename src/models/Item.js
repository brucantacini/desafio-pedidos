/**
 * Schema do subdocumento Item (itens do pedido)
 * Campos no banco: productId, quantity, price
 */
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    productId: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 0 },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: true }
);

module.exports = itemSchema;
