import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function IndexProveedores() {
    const [proveedores, setProveedores] = useState([]);
    const navigate = useNavigate();

    const cargarProveedores = async () => {
        try {
            const res = await fetch('https://storestock.onrender.com/api/proveedores');
            if (res.ok) {
                const data = await res.json();
                setProveedores(data);
            }
        } catch (err) {
            console.error("Error al cargar proveedores:", err);
        }
    };

    useEffect(() => {
        cargarProveedores();
    }, []);

    return (
        <section className="seccion">
            <div className="header-modulo" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Gestión de Proveedores</h2>
                <button onClick={() => navigate("nuevo")} className="btn-nuevo">Nuevo Proveedor</button>
            </div>

            <table className="tabla-estilo" style={{ marginTop: '20px', width: '100%' }}>
                <thead>
                    <tr>
                        <th>Empresa</th>
                        <th>Contacto</th>
                        <th>Teléfono</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {proveedores.map((p) => (
                        <tr key={p.id_proveedor}>
                            <td><strong>{p.nombre_empresa}</strong></td>
                            <td>{p.contacto_nombre}</td>
                            <td>{p.telefono}</td>
                            <td>{p.correo}</td>
                            <td>
                                <button onClick={() => navigate(`editar/${p.id_proveedor}`)} className="btn-editar">Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default IndexProveedores;