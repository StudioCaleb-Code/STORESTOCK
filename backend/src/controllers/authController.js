const db = require('../config/db');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
    const { nombres, apellido_pa, apellido_ma, telefono, correo, username, password, id_rol, ubicacion } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [datoUResult] = await db.query(
            'INSERT INTO dato_u (nombres, apellido_pa, apellido_ma, telefono, correo, ubicacion) VALUES (?, ?, ?, ?, ?, ?)',
            [nombres, apellido_pa, apellido_ma, telefono, correo, ubicacion || '']
        );
        const id_dato_u = datoUResult.insertId;

        await db.query(
            'INSERT INTO usuario (id_rol, id_estado, id_dato_u, correo, username, password) VALUES (?, ?, ?, ?, ?, ?)',
            [id_rol, 1, id_dato_u, correo, username, hashedPassword]
        );

        res.status(201).json({ ok: true, message: "Usuario registrado con éxito" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, message: error.message });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM usuario WHERE username = ?', [username]);
        if (rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });

        const user = rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ message: "Contraseña incorrecta" });

        res.json({ ok: true, message: "Bienvenido", user: { id: user.id_usuario, username: user.username } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// --- ESTO ES LO QUE CAUSA EL ERROR SI FALTA ---
module.exports = { register, login };