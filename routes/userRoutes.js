const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

//POST registrar usuario
router.post('/register', userController.register);
//POST login usuario
router.post('/login', userController.login);
//GET ver datos del usuario
router.get('/profile', auth, userController.getProfile);
//PUT actualizar usuario
router.put('/profile', auth, userController.updateProfile);

module.exports = router;
