// 1. Cargar variables de entorno inmediatamente
require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const db = require('./src/config/db'); // Importamos la conexión para verificarla

const app = express();

// 2. Middlewares Globales
app.use(cors());
app.use(express.json());

// 3. Verificación de conexión a la Base de Datos antes de lanzar rutas
// Esto ayuda a saber si el error es de MySQL apenas inicias
console.log('--- Intentando conectar a la Base de Datos ---');

// 4. Definición de Rutas
app.use('/api/auth', authRoutes);

// Ruta de prueba rápida (opcional)
app.get('/', (req, res) => {
    res.send('API STORESTOCK funcionando correctamente 🚀');
});

// 5. Manejo de rutas no encontradas (404)
app.use((req, res) => {
    res.status(404).json({ 
        ok: false,
        message: "La ruta que buscas no existe en este servidor" 
    });
});

// 6. Manejo de errores global (Evita que el servidor se caiga por un error inesperado)
app.use((err, req, res, next) => {
    console.error('❌ Error no controlado:', err.stack);
    res.status(500).json({ 
        ok: false,
        message: 'Algo salió mal en el servidor',
        error: err.message 
    });
});

// 7. Lanzamiento del servidor
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`\n==========================================`);
    console.log(`🚀 SERVIDOR CORRIENDO EN: http://localhost:${PORT}`);
    console.log(`📡 BASE DE DATOS: ${process.env.DB_NAME}`);
    console.log(`👤 USUARIO BD: ${process.env.DB_USER}`);
    console.log(`🏠 HOST: ${process.env.DB_HOST}`);
    console.log(`==========================================\n`);
});