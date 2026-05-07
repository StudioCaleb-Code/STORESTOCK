const db = require('../config/db');

const crearVenta = async (req, res) => {
    // Obtenemos una conexión para manejar la transacción
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        // Extraemos los datos del body que manda el Carrito.jsx
        const { id_cliente, id_usuario, total, detalles } = req.body;

        // 1. Insertar en la tabla 'ventas'
        const sqlVenta = "INSERT INTO ventas (id_cliente, id_usuario, total) VALUES (?, ?, ?)";
        const [resultVenta] = await connection.query(sqlVenta, [
            id_cliente || null, 
            id_usuario || 3, // Usamos el ID 3 que es el de ventas web
            total
        ]);
        
        const id_venta = resultVenta.insertId;

        // 2. Insertar en 'detalle_venta' y actualizar stock
        // IMPORTANTE: Verifica si tu tabla se llama 'detalle_venta' o 'detalle_ventas'
        const sqlDetalle = "INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)";
        
        for (const item of detalles) {
            // Insertar detalle de la compra
            await connection.query(sqlDetalle, [
                id_venta, 
                item.id_producto, 
                item.cantidad, 
                item.precio_unitario
            ]);

            // Descontar stock directamente aquí (por si no tienes el Trigger en MySQL)
            await connection.query(
                "UPDATE productos SET stock = stock - ? WHERE id_producto = ?", 
                [item.cantidad, item.id_producto]
            );
        }

        // 3. Confirmamos los cambios en la BD
        await connection.commit();

        // Respondemos al Frontend con éxito y el ID de venta
        // Quitamos toda la parte de generar el PDF aquí para evitar el error 500
        res.json({ 
            ok: true, 
            message: "Venta registrada y stock actualizado", 
            id_venta 
        });

    } catch (err) {
        // Si algo sale mal, deshacemos los cambios
        await connection.rollback();
        console.error("ERROR EN EL BACKEND:", err);
        res.status(500).json({ ok: false, error: err.message });
    } finally {
        // Siempre liberamos la conexión
        connection.release();
    }
};

const listarVentas = async (req, res) => {
    try {
        const sql = `
            SELECT 
                V.id_venta, 
                V.total, 
                V.fecha_venta, 
                CONCAT(C.nombres, ' ', C.apellidos) as cliente_nombre, 
                U.username as vendedor_username
            FROM ventas V
            LEFT JOIN clientes C ON V.id_cliente = C.id_cliente
            LEFT JOIN usuario U ON V.id_usuario = U.id_usuario
            ORDER BY V.id_venta DESC
        `;
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: err.message });
    }
};

module.exports = { crearVenta, listarVentas };