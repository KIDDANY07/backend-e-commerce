const CartModel = require('../models/cartModel');

//Ir al carrito
exports.getCart = async (req, res) => {
  try {
    const items = await CartModel.getCartItems(req.user.id);
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el carrito', error: err.message });
  }
};
//Agregar al carrito
exports.addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  if (!product_id || quantity <= 0) {
    return res.status(400).json({ message: 'Datos inválidos' });
  }

  try {
    await CartModel.addOrUpdateItem(req.user.id, product_id, quantity);
    res.json({ message: 'Producto agregado al carrito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al agregar al carrito', error: err.message });
  }
};
//Actualizar cantidad de un producto
exports.updateQuantity = async (req, res) => {
  const { quantity } = req.body;
  const { productId } = req.params;

  if (quantity <= 0) {
    return res.status(400).json({ message: 'Cantidad inválida' });
  }

  try {
    await CartModel.updateQuantity(req.user.id, productId, quantity);
    res.json({ message: 'Cantidad actualizada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar cantidad', error: err.message });
  }
};
//Eliminar producto
exports.deleteFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    await CartModel.deleteItem(req.user.id, productId);
    res.json({ message: 'Producto eliminado del carrito' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar del carrito', error: err.message });
  }
};
