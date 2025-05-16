const db = require('../config/db');
const bcrypt = require('bcrypt');
//Object model user -> consultas para los usuarios
class User {
  static async create({ name, email, password, role, image, address }) {
    if (!name || !email || !password) throw new Error('Todos los campos son obligatorios');

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role, image, address) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, hashedPassword, role || 'customer', image || null, address || null]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await db.query(
      'SELECT id, name, email, role, image, address FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  static async update(id, { name, email, image, address }) {
    await db.query(
      'UPDATE users SET name = ?, email = ?, image = ?, address = ? WHERE id = ?',
      [name, email, image, address, id]
    );
  }

  static async updatePassword(id, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id]);
  }
}


module.exports = User;
