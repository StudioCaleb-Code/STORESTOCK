import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPublic from './index';
import Login from './auth/login';
import Register from './auth/register';

import Panel from './panel/panel';
import Productos from './modules/productos/index';
import FormularioProducto from './modules/productos/form';

// Importa tus módulos (ejemplos)
// import Productos from './modules/Productos'; 
// import Categorias from './modules/Categorias';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPublic />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* RUTAS DEL PANEL (Anidadas) */}
        <Route path="/panel" element={<Panel />}>
          <Route path="productos" element={<Productos />} />
          <Route path="productos/nuevo" element={<FormularioProducto />} />
          <Route path="productos/editar/:id" element={<FormularioProducto />} />
          {/* <Route path="categorias" element={<Categorias />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;