const db = require('../config/db');

// 1. Listar todos los productos con su Categoría
const listarProductos = async (req, res) => {
    try {
        const sql = `
            SELECT p.*, c.nombre AS nombre_categoria 
            FROM productos p
            LEFT JOIN categoria c ON p.id_categoria = c.id_categoria
            ORDER BY p.id_producto DESC
        `;
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (err) {
        console.error("❌ Error en listarProductos:", err);
        res.status(500).json({ ok: false, error: err.message });
    }
};

// 2. Obtener un producto por ID
const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const sql = "SELECT * FROM productos WHERE id_producto = ?";
        const [rows] = await db.query(sql, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ ok: false, message: "Producto no encontrado" });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
};

// 3. Crear Producto (POST)
const crearProducto = async (req, res) => {
    try {
        const { id_categoria, id_proveedor, nombre, descripcion, precio_venta, stock } = req.body;
        const imagen_principal = req.file ? req.file.filename : null;

        const sql = `
            INSERT INTO productos 
            (id_categoria, id_proveedor, nombre, descripcion, precio_venta, stock, imagen_principal) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [id_categoria, id_proveedor, nombre, descripcion, precio_venta, stock, imagen_principal];

        const [result] = await db.query(sql, values);
        res.json({ ok: true, message: "Producto creado con éxito", id: result.insertId });
    } catch (err) {
        console.error("❌ Error en crearProducto:", err);
        res.status(500).json({ ok: false, error: err.message });
    }
};

// 4. Actualizar Producto (PUT)
const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { id_categoria, id_proveedor, nombre, descripcion, precio_venta, stock } = req.body;

        let sql = "";
        let values = [];

        if (req.file) {
            const imagen_principal = req.file.filename;
            sql = `
                UPDATE productos 
                SET id_categoria = ?, id_proveedor = ?, nombre = ?, descripcion = ?, precio_venta = ?, stock = ?, imagen_principal = ?
                WHERE id_producto = ?
            `;
            values = [id_categoria, id_proveedor, nombre, descripcion, precio_venta, stock, imagen_principal, id];
        } else {
            sql = `
                UPDATE productos 
                SET id_categoria = ?, id_proveedor = ?, nombre = ?, descripcion = ?, precio_venta = ?, stock = ?
                WHERE id_producto = ?
            `;
            values = [id_categoria, id_proveedor, nombre, descripcion, precio_venta, stock, id];
        }

        await db.query(sql, values);
        res.json({ ok: true, message: "Producto actualizado correctamente" });
    } catch (err) {
        console.error("❌ Error en actualizarProducto:", err);
        res.status(500).json({ ok: false, error: err.message });
    }
};

module.exports = {
    listarProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto
};