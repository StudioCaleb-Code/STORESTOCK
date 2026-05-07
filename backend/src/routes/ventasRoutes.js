const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

// Esta ruta responderá a: http://localhost:3001/api/ventas
router.get('/', ventasController.listarVentas);
router.post('/', ventasController.crearVenta);

module.exports = router;