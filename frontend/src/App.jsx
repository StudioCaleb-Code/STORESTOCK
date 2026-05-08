import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// VISTAS PÚBLICAS
import IndexPublic from './index';
import Carrito from './pages/carrito'; // Asegúrate de que el archivo se llame carrito.jsx

// AUTENTICACIÓN (src/auth/...)
import Login from './auth/login';
import Register from './auth/Register';

// PANEL Y MÓDULOS (Administración)
import Panel from './panel/panel';
import Productos from './modules/productos/index';
import FormularioProducto from './modules/productos/form';

import Categorias from './modules/categorias/index';
import FormularioCategoria from './modules/categorias/form';

import IndexProveedores from "./modules/proveedores/index";
import FormularioProveedor from "./modules/proveedores/form";

import Ventas from './modules/ventas/index';
import FormularioVenta from './modules/ventas/form';

function App() {
  return (
    <Router>
      <Routes>
        {/* RUTA PRINCIPAL PÚBLICA */}
        <Route path="/" element={<IndexPublic />} />
        
        {/* RUTA DEL CARRITO / PAGO YAPE */}
        <Route path="/carrito" element={<Carrito />} />

        {/* RUTAS DE AUTENTICACIÓN */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* RUTAS DEL PANEL ADMINISTRATIVO (Anidadas) */}
        <Route path="/panel" element={<Panel />}>
          
          {/* Módulo Productos */}
          <Route path="productos" element={<Productos />} />
          <Route path="productos/nuevo" element={<FormularioProducto />} />
          <Route path="productos/editar/:id" element={<FormularioProducto />} />

          {/* Módulo Categorías */}
          <Route path="categorias" element={<Categorias />} />
          <Route path="categorias/nuevo" element={<FormularioCategoria />} />
          <Route path="categorias/editar/:id" element={<FormularioCategoria />} />

          {/* Módulo Proveedores */}
          <Route path="proveedores" element={<IndexProveedores />} />
          <Route path="proveedores/nuevo" element={<FormularioProveedor />} />
          <Route path="proveedores/editar/:id" element={<FormularioProveedor />} />

          {/* Módulo Ventas */}
          <Route path="ventas" element={<Ventas />} />
          <Route path="ventas/nuevo" element={<FormularioVenta />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;