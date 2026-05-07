const db = require('../config/db');

// 1. Listar todos los productos (Ya lo tenías)
const listarProductos = (req, res) => {
    const sql = `
        SELECT p.*, c.nombre AS nombre_categoria 
        FROM productos p
        LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
    `;
    db.query(sql, (err, data) => {
        if (err) return res.status(500).json({ ok: false, error: err.message });
        res.json(data);
    });
};

// 2. Obtener UN producto por ID (Para cargar el formulario de edición)
const obtenerProductoPorId = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM productos WHERE id_producto = ?";
    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json({ ok: false, error: err.message });
        res.json(data[0]); // Retornamos solo el objeto
    });
};

// 3. Crear Producto (POST)
const crearProducto = (req, res) => {
    const { nombre, id_categoria, precio_venta, stock, descripcion } = req.body;
    const sql = "INSERT INTO productos (nombre, id_categoria, precio_venta, stock, descripcion) VALUES (?, ?, ?, ?, ?)";

    db.query(sql, [nombre, id_categoria, precio_venta, stock, descripcion], (err, result) => {
        if (err) return res.status(500).json({ ok: false, error: err.message });
        res.json({ ok: true, message: "Producto creado con éxito", id: result.insertId });
    });
};

// 4. Actualizar Producto (PUT)
const actualizarProducto = (req, res) => {
    const { id } = req.params;
    const { nombre, id_categoria, precio_venta, stock, descripcion } = req.body;
    const sql = `
        UPDATE productos 
        SET nombre = ?, id_categoria = ?, precio_venta = ?, stock = ?, descripcion = ? 
        WHERE id_producto = ?
    `;

    db.query(sql, [nombre, id_categoria, precio_venta, stock, descripcion, id], (err, result) => {
        if (err) return res.status(500).json({ ok: false, error: err.message });
        res.json({ ok: true, message: "Producto actualizado" });
    });
};

module.exports = {
    listarProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto
};