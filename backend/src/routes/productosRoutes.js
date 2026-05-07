const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// GET - Listar todos
router.get('/', productosController.listarProductos);

// GET - Obtener uno solo por ID
router.get('/:id', productosController.obtenerProductoPorId);

// POST - Crear nuevo
router.post('/', productosController.crearProducto);

// PUT - Actualizar existente
router.put('/:id', productosController.actualizarProducto);

module.exports = router;