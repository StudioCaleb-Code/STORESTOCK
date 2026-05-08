import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function IndexVentas() {
    // Inicializar con array vacío para evitar errores de .map
    const [ventas, setVentas] = useState([]);
    const navigate = useNavigate();

    // Función para obtener las ventas desde el backend
    const obtenerVentas = () => {
        fetch("https://storestock.onrender.com/api/ventas")
            .then(res => {
                if (!res.ok) throw new Error("Error en el servidor");
                return res.json();
            })
            .then(data => {
                // El backend ahora nos devuelve el campo nombre_archivo_vaucher
                setVentas(Array.isArray(data) ? data : []);
            })
            .catch(err => {
                console.error("Error al cargar ventas:", err);
                setVentas([]);
            });
    };

    useEffect(() => {
        obtenerVentas();
    }, []);

    return (
        <section className="seccion">
            <div className="header-modulo" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                    <h2 style={{ margin: 0 }}> <i className="bi bi-cart-check"></i> Historial de Ventas</h2>
                    <p style={{ color: '#666', margin: 0 }}>Consulta y descarga tus comprobantes</p>
                </div>
                <button onClick={() => navigate("nuevo")} className="btn-nuevo">
                    <i className="bi bi-plus-circle"></i> Nueva Venta
                </button>
            </div>

            <div className="contenedor-tabla">
                <table className="tabla-estilo">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha y Hora</th>
                            <th>Cliente</th>
                            <th>Vendedor</th>
                            <th className="text-center">Total</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventas.length > 0 ? (
                            ventas.map((v) => (
                                <tr key={v.id_venta}>
                                    <td>#{v.id_venta}</td>
                                    <td>{new Date(v.fecha_venta).toLocaleString()}</td>
                                    <td>{v.cliente_nombre || "Consumidor Final"}</td>
                                    <td>
                                        <span className="badge-vendedor">{v.vendedor_username}</span>
                                    </td>
                                    <td className="text-center">
                                        <strong>${parseFloat(v.total).toFixed(2)}</strong>
                                    </td>
                                    <td className="text-center">
                                        {v.nombre_archivo_vaucher ? (
                                            <a
                                                href={`https://storestock.onrender.com/vauchers/${v.nombre_archivo_vaucher}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="btn-pdf"
                                                style={{
                                                    backgroundColor: '#e74c3c',
                                                    color: 'white',
                                                    padding: '6px 12px',
                                                    borderRadius: '4px',
                                                    textDecoration: 'none',
                                                    fontSize: '0.9em',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '5px'
                                                }}
                                            >
                                                <i className="bi bi-file-earmark-pdf"></i> Ver PDF
                                            </a>
                                        ) : (
                                            <span style={{ color: '#999', fontSize: '0.8em' }}>Sin comprobante</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center', padding: '30px', color: '#999' }}>
                                    No hay ventas registradas actualmente.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default IndexVentas;