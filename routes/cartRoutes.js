const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');
//GET al middleware para validar el usuario por la cookie o JWT
router.get('/', authMiddleware, cartController.getCart);
//POST al middleware para la peticion de agregar al carrito
router.post('/', authMiddleware, cartController.addToCart);
//PUT para actualizar el carrito
router.put('/:productId', authMiddleware, cartController.updateQuantity);
//DELETE 
router.delete('/:productId', authMiddleware, cartController.deleteFromCart);

module.exports = router;
