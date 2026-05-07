const mysql = require('mysql2/promise'); // Usamos promise para poder usar async/await
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Probar la conexión
pool.getConnection()
    .then(connection => {
        console.log('✅ Conectado a la base de datos MySQL local.');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Error al conectar a MySQL:', err.message);
    });

module.exports = pool;