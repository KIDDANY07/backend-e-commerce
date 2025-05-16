const db = require('../config/db');
//Object model product -> consultas para los productos
class Product {
  static async getAll(categoryId = null) {
    let query = 'SELECT * FROM products';
    const params = [];

    if (categoryId) {
      query += ' WHERE category_id = ?';
      params.push(categoryId);
    }

    const [rows] = await db.query(query, params);
    return rows;
  }

  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(product) {
    const { name, description, price, stock, image_url } = product;
    const [result] = await db.query(
      'INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)',
      [name, description, price, stock, image_url]
    );
    return result.insertId;
  }

  static async update(id, product) {
    const { name, description, price, stock, image_url } = product;
    await db.query(
      'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, image_url = ? WHERE id = ?',
      [name, description, price, stock, image_url, id]
    );
  }

  static async delete(id) {
    await db.query('DELETE FROM products WHERE id = ?', [id]);
  }
}

module.exports = Product;
