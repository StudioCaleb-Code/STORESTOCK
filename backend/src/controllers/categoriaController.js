const db = require('../config/db');

const listarCategorias = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT id_categoria, nombre FROM categoria ORDER BY nombre ASC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
};

module.exports = { listarCategorias };