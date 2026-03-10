function mapRequestToOrder(body) {
  const items = (body.items || []).map((item) => ({
    productId: Number(item.idItem) || 0,
    quantity: Number(item.quantidadeItem) || 0,
    price: Number(item.valorItem) || 0,
  }));

  return {
    orderId: String(body.numeroPedido || '').trim(),
    value: Number(body.valorTotal) || 0,
    creationDate: body.dataCriacao ? new Date(body.dataCriacao) : new Date(),
    items,
  };
}
function mapOrderToResponse(doc) {
  if (!doc) return null;
  const obj = doc.toObject ? doc.toObject() : doc;
  return {
    _id: obj._id,
    orderId: obj.orderId,
    value: obj.value,
    creationDate: obj.creationDate,
    items: (obj.items || []).map((item) => ({
      _id: item._id,
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    })),
    __v: obj.__v,
  };
}

module.exports = {
  mapRequestToOrder,
  mapOrderToResponse,
};
