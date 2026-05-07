const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

// Estas rutas ahora son limpias
router.get('/', categoriaController.listarCategorias);
router.get('/:id', categoriaController.obtenerCategoriaPorId);
router.post('/', categoriaController.crearCategoria); // Para registrar
router.put('/:id', categoriaController.actualizarCategoria);

module.exports = router;