const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_secret_key'; 
//POST Register controller
exports.register = async (req, res) => {
  try {
    const { name, email, password, role, image, address } = req.body;
    const existingUser = await User.findByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'El correo ya está en uso' });

    const userId = await User.create({ name, email, password, role, image, address });
    res.status(201).json({ id: userId, name, email, role, image, address });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//POST Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//GETProfile controller
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//PUT Update profile controller
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, image, address } = req.body;
    await User.update(req.user.id, { name, email, image, address });
    res.json({ message: 'Datos actualizados correctamente' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};