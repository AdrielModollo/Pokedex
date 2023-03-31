const express = require('express');
const router = express.Router();
const controller = require('../interface/http/controllers/usersController');
const middlewares = require('../middlewares/auth');

// CRUD Routes /users
router.get('/', middlewares.authenticateJWT, controller.getUsers); // /users
router.get('/:userId', middlewares.authenticateJWT, controller.getUser); // /users/:userId
router.put('/:userId', middlewares.authenticateJWT, controller.updateUser); // /users/:userId
router.delete('/:userId', middlewares.authenticateJWT, controller.deleteUser); // /users/:userId

module.exports = router;
