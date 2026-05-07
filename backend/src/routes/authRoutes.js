const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const db = require('../config/db');

// Ruta para cargar los roles en el frontend
router.get('/roles', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM rol');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error en DB" });
    }
});

// Verifica que estos nombres coincidan con el module.exports del controlador
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;