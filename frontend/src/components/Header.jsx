import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault(); // Evita que el enlace recargue la página

        // 1. Limpiamos los datos del usuario
        localStorage.removeItem("usuario");

        // 2. Redirigimos al Login (asumiendo que es la ruta "/")
        navigate("/");
    };

    return (
        <header className="header">
            <h2 className="tituloHeader">STORESTOCK</h2>

            {/* Botón de cerrar sesión con tu estructura original */}
            <a href="#" onClick={handleLogout} className="btn-logout" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <i className="bi bi-power"></i>
                <span>Cerrar Sesión</span>
            </a>
        </header>
    );
}

export default Header;