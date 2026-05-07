    // 1. Cargar variables de entorno inmediatamente
    require('dotenv').config();

    const express = require('express');
    const cors = require('cors');
    const path = require('path'); // <--- AÑADIDO: Para manejar rutas de carpetas
    const authRoutes = require('./src/routes/authRoutes');
    const productosRoutes = require('./src/routes/productosRoutes');
    const db = require('./src/config/db');

    const app = express();

    // 2. Middlewares Globales
    app.use(cors());
    app.use(express.json());

    // --- AÑADIDO: Carpeta Pública para Imágenes ---
    // Esto permite que al acceder a http://localhost:3001/uploads/imagen.jpg se vea la foto
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // 3. Verificación de conexión a la Base de Datos
    console.log('--- Intentando conectar a la Base de Datos ---');

    // 4. Definición de Rutas
    app.use('/api', productosRoutes);
    app.use('/api/auth', authRoutes);
    // app.use('/api/productos', productosRoutes);

    // Ruta de prueba rápida
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

    // 6. Manejo de errores global
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