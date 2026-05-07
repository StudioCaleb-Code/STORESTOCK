import { Link, useLocation } from "react-router-dom";

function Navegador() {
    // Esto sirve para saber en qué página estás y poner el color de "active"
    const location = useLocation();

    return (
        <nav className="navegador">
            <ul className="menuNav">
                <li className="listaNav">
                    <Link
                        to="/panel/productos"
                        className={`linkNav ${location.pathname === "/panel/productos" ? "active" : ""}`}
                    >
                        <i className="bi bi-box"></i>
                        <span>Productos</span>
                    </Link>
                </li>

                <li className="listaNav">
                    <Link
                        to="/panel/categorias"
                        className={`linkNav ${location.pathname === "/panel/categorias" ? "active" : ""}`}
                    >
                        <i className="bi bi-inbox"></i>
                        <span>Categorias</span>
                    </Link>
                </li>

                <li className="listaNav">
                    <Link
                        to="/panel/ventas"
                        className={`linkNav ${location.pathname === "/panel/ventas" ? "active" : ""}`}
                    >
                        <i className="bi bi-cart3"></i>
                        <span>Ventas</span>
                    </Link>
                </li>

                <li className="listaNav">
                    <Link
                        to="/panel/reportes"
                        className={`linkNav ${location.pathname === "/panel/reportes" ? "active" : ""}`}
                    >
                        <i className="bi bi-folder"></i>
                        <span>Reportes</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navegador;
