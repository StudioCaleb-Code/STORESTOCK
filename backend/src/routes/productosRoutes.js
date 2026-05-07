const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
const categoriaController = require('../controllers/categoriaController');
const proveedorController = require('../controllers/proveedorController');
const multer = require('multer');
const path = require('path');

// 1. Configuración de almacenamiento de imágenes
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// --- RUTAS DE PRODUCTOS ---
// Quitamos '/productos' porque el prefijo ya viene del index.js app.use('/api/productos', ...)
router.get('/', productosController.listarProductos);
router.get('/:id', productosController.obtenerProductoPorId);
router.post('/', upload.single('imagen'), productosController.crearProducto);
router.put('/:id', upload.single('imagen'), productosController.actualizarProducto);

// --- RUTAS AUXILIARES (Para los Selects del formulario y Listados) ---
// Estas rutas ahora funcionarán como /api/productos/categorias y /api/productos/proveedores
router.get('/categorias', categoriaController.listarCategorias);
router.get('/proveedores', proveedorController.listarProveedores);

// --- RUTAS PARA REGISTRAR (Añadidas para que funcionen tus formularios) ---
router.post('/categorias', categoriaController.crearCategoria);
router.post('/proveedores', proveedorController.crearProveedor);
router.get('/categorias/:id', categoriaController.obtenerCategoriaPorId);
router.get('/proveedores/:id', proveedorController.obtenerProveedorPorId);

module.exports = router;