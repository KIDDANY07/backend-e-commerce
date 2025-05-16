const db = require('../config/db');

const CartModel = {
  // Obtener todos los items del carrito de un usuario
  async getCartItems(userId) {
    const [items] = await db.execute(`
      SELECT ci.product_id, p.name, p.price, p.image_url, ci.quantity
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `, [userId]);
    return items;
  },

  // Agregar o actualizar un producto en el carrito
  async addOrUpdateItem(userId, productId, quantity) {
    await db.execute(`
      INSERT INTO cart_items (user_id, product_id, quantity)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE quantity = quantity + ?
    `, [userId, productId, quantity, quantity]);
  },

  // Actualizar cantidad de un producto en el carrito
  async updateQuantity(userId, productId, quantity) {
    await db.execute(`
      UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?
    `, [quantity, userId, productId]);
  },

  // Eliminar un producto del carrito
  async deleteItem(userId, productId) {
    await db.execute(`
      DELETE FROM cart_items WHERE user_id = ? AND product_id = ?
    `, [userId, productId]);
  }
};

module.exports = CartModel;
