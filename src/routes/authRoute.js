const express = require('express');
const router = express.Router();
const authController = require('../interface/http/controllers/authController');
const middlewares = require('../middlewares/auth');

router.post('/login', authController.login);
router.post('/register', middlewares.authenticateRegister, authController.register);

module.exports = router;
