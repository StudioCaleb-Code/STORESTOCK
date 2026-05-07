const db = require('../config/db');

const listarProveedores = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT id_proveedor, nombre_empresa FROM proveedores ORDER BY nombre_empresa ASC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
};

module.exports = { listarProveedores };