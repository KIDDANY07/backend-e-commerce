const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// GET Obtener todos los productos (con filtro opcional por categoría)
router.get("/", productController.getAllProducts);

// GET Obtener un producto por ID
router.get("/:id", productController.getByIdProducts);

// POST Crear un nuevo producto
router.post("/", productController.createProduct);

// PUT Actualizar un producto existente
router.put("/:id", productController.updateProduct);

// DELETE Eliminar un producto por ID
router.delete("/:id", productController.deleteProduct);

module.exports = router;
