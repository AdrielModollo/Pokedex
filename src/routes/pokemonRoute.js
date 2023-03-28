const express = require('express');
const router = express.Router();
const pokemonController = require('../interface/http/controllers/pokemonController');
const middlewares = require('../middlewares/auth');

router.get('/', middlewares.authenticateJWT, pokemonController.getAll);
router.get('/:id', middlewares.authenticateJWT, pokemonController.getById);
router.get('/name/:name', middlewares.authenticateJWT, pokemonController.getByName);
router.get('/types/teste', middlewares.authenticateJWT, pokemonController.getByType);

module.exports = router;
