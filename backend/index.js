// 1. Cargar variables de entorno inmediatamente
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// Importación de rutas
const authRoutes = require("./src/routes/authRoutes");
const productosRoutes = require("./src/routes/productosRoutes");
const categoriaRoutes = require("./src/routes/categoriaRoutes");
const proveedorRoutes = require("./src/routes/proveedorRoutes");
const ventasRoutes = require("./src/routes/ventasRoutes");
const clientesRoutes = require("./src/routes/clientesRoutes");

const app = express();

// 2. Middlewares Globales
app.use(cors());
app.use(express.json());

// --- 3. Configuración de Carpetas Estáticas ---

// Carpeta para imágenes de productos (asegúrate de que exista)
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

app.use("/uploads", express.static(uploadsDir));

// Carpeta específica para los Vauchers PDF
const pdfDir = path.join(__dirname, "uploads/pdf");
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

app.use("/vauchers", express.static(pdfDir));

// 4. Verificación de conexión a la Base de Datos (Informativo)
console.log("--- Intentando conectar a la Base de Datos ---");

// 5. Definición de Rutas
app.use("/api/auth", authRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/proveedores", proveedorRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/api/clientes", clientesRoutes);

// Ruta de prueba rápida
app.get("/", (req, res) => {
  res.send("API STORESTOCK funcionando correctamente 🚀");
});

// 6. Manejo de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({
    ok: false,
    message: "La ruta que buscas no existe en este servidor",
  });
});

// 7. Manejo de errores global
// He mejorado esto para que te devuelva el error real del PDF si falla
app.use((err, req, res, next) => {
  console.error("❌ Error detectado:", err);
  res.status(err.status || 500).json({
    ok: false,
    message: err.message || "Algo salió mal en el servidor",
    error: process.env.NODE_ENV === "development" ? err.stack : {},
  });
});

// 8. Lanzamiento del servidor
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`\n==========================================`);
  console.log(`🚀 SERVIDOR CORRIENDO EN PUERTO: ${PORT}`);
  console.log(`📡 BASE DE DATOS: ${process.env.DB_NAME}`);
  console.log(`📂 RUTA PDF: ${pdfDir}`);
  console.log(`==========================================\n`);
});
