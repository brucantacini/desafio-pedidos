
const mongoose = require('mongoose');
const itemSchema = require('./Item.js');

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true, trim: true },
    value: { type: Number, required: true, min: 0 },
    creationDate: { type: Date, required: true, default: Date.now },
    items: [itemSchema],
  },
  {
    timestamps: false,
    versionKey: '__v',
  }
);
  
orderSchema.index({ orderId: 1 });

module.exports = mongoose.model('Order', orderSchema);
