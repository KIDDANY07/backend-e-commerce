const Product = require('../models/productModels');

//GET Obtener todos los productos (con filtro opcional por categoría)
exports.getAllProducts = async (req, res) => {
  try {
    const categoryId = req.query.category || null;
    const products = await Product.getAll(categoryId);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener productos", error: err.message });
  }
};

//GET Obtener un producto por ID
exports.getByIdProducts = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener producto", error: err.message });
  }
};

//POST Crear un nuevo producto
exports.createProduct = async (req, res) => {
  const { name, price, description, stock, image_url } = req.body;

  if (!name || price == null || !description || stock == null || !image_url) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }
  if (isNaN(price) || isNaN(stock)) {
    return res.status(400).json({ message: "Precio y stock deben ser numéricos" });
  }

  try {
    const id = await Product.create({ name, price, description, stock, image_url });
    res.status(201).json({ id, name, price, description, stock, image_url });
  } catch (err) {
    res.status(400).json({ message: "Error al crear producto", error: err.message });
  }
};

//PUT Actualizar un producto existente
exports.updateProduct = async (req, res) => {
  const { name, price, description, stock, image_url } = req.body;

  if (!name || price == null || !description || stock == null || !image_url) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }
  if (isNaN(price) || isNaN(stock)) {
    return res.status(400).json({ message: "Precio y stock deben ser numéricos" });
  }

  try {
    const product = await Product.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await Product.update(req.params.id, { name, price, description, stock, image_url });
    res.json({ id: req.params.id, name, price, description, stock, image_url });
  } catch (err) {
    res.status(400).json({ message: "Error al actualizar producto", error: err.message });
  }
};

//DELETE Eliminar un producto por ID
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await Product.delete(req.params.id);
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar producto", error: err.message });
  }
};
