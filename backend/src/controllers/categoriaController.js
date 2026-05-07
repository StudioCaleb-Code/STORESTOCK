const db = require('../config/db');

// Listar todas con descripción incluida
const listarCategorias = async (req, res) => {
    try {
        // Añadimos 'descripcion' a la consulta
        const [rows] = await db.query("SELECT id_categoria, nombre, descripcion FROM categoria ORDER BY nombre ASC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
};

// Obtener una sola (Para cuando vas a editar)
const obtenerCategoriaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query("SELECT * FROM categoria WHERE id_categoria = ?", [id]);
        if (rows.length === 0) return res.status(404).json({ message: "No existe" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
};

// Crear nueva categoría
const crearCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const sql = "INSERT INTO categoria (nombre, descripcion) VALUES (?, ?)";
        const [result] = await db.query(sql, [nombre, descripcion]);
        res.json({ ok: true, id: result.insertId });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
};

// Actualizar categoría
const actualizarCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        const sql = "UPDATE categoria SET nombre = ?, descripcion = ? WHERE id_categoria = ?";
        await db.query(sql, [nombre, descripcion, id]);
        res.json({ ok: true, message: "Actualizado" });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
};

module.exports = { 
    listarCategorias, 
    obtenerCategoriaPorId, 
    crearCategoria, 
    actualizarCategoria 
};