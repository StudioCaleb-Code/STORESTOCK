const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');
const categoriaController = require('../controllers/categoriaController');
const proveedorController = require('../controllers/proveedorController');
const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento de imágenes
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// --- RUTAS DE PRODUCTOS ---
router.get('/productos', productosController.listarProductos);
router.get('/productos/:id', productosController.obtenerProductoPorId);
router.post('/productos', upload.single('imagen'), productosController.crearProducto);
router.put('/productos/:id', upload.single('imagen'), productosController.actualizarProducto);

// --- RUTAS AUXILIARES (Para el formulario) ---
// Estas rutas son las que cargan los Selects de tu formulario
router.get('/categorias', categoriaController.listarCategorias);
router.get('/proveedores', proveedorController.listarProveedores);

module.exports = router;