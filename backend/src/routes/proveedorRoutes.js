const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');

// Listar proveedores
router.get('/', proveedorController.listarProveedores);

// Obtener uno por ID
router.get('/:id', proveedorController.obtenerProveedorPorId);

// Registrar nuevo
router.post('/', proveedorController.crearProveedor);

module.exports = router;