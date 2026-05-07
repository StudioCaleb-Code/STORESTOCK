const db = require('../config/db');

const listarProveedores = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM proveedores ORDER BY nombre_empresa ASC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
};

const obtenerProveedorPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query("SELECT * FROM proveedores WHERE id_proveedor = ?", [id]);
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
};

const crearProveedor = async (req, res) => {
    try {
        const { nombre_empresa, contacto_nombre, telefono, correo, direccion } = req.body;
        const sql = `INSERT INTO proveedores (nombre_empresa, contacto_nombre, telefono, correo, direccion) 
                     VALUES (?, ?, ?, ?, ?)`;
        const [result] = await db.query(sql, [nombre_empresa, contacto_nombre, telefono, correo, direccion]);
        res.json({ ok: true, id: result.insertId });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
};

module.exports = { listarProveedores, obtenerProveedorPorId, crearProveedor };