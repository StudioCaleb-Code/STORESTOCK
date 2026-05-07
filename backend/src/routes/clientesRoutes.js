const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Lo hacemos directo aquí para ser rápidos

// URL: /api/clientes
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM clientes");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

module.exports = router;