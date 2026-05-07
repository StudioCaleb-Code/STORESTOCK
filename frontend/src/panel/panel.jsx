import { Outlet } from 'react-router-dom';
import Header from "../components/Header";
import Navegador from "../components/Navegador";
import "../components/header.css";

function Panel() {
    return (
        <div className="panel-body-wrapper">
            {/* 1. El Header arriba */}
            <Header />

            {/* 2. El Navegador debajo (o al lado, según tu CSS) */}
            <Navegador />

            {/* 3. El contenido principal */}
            <main className="main">
                <div className="sub-main">
                    {/* Aquí es donde se "inyectarán" los módulos de src/modules */}
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

export default Panel;