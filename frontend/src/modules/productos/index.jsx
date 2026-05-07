import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Productos() {
    const [lista, setLista] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                // Asegúrate de que tu backend esté corriendo en el puerto 3001
                const response = await fetch('http://localhost:3001/api/productos');
                const data = await response.json();
                setLista(data);
            } catch (error) {
                console.error("Error al obtener productos:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductos();
    }, []);

    if (loading) {
        return (
            <section className="seccion">
                <div className="loading">Cargando inventario de STORESTOCK...</div>
            </section>
        );
    }

    return (
        <section className="seccion">
            <div className="modulo-productos">
                <div className="header-modulo" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h2 style={{ margin: 0 }}>Gestión de Productos</h2>
                    <Link to="/panel/productos/nuevo" className="btn-nuevo">
                        <i className="bi bi-plus-lg"></i> Nuevo Producto
                    </Link>
                </div>

                <div className="table-container" style={{ overflowX: 'auto' }}>
                    <table className="tabla-stock" style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ textAlign: 'left', borderBottom: '2px solid #eee' }}>
                                <th style={{ padding: '12px' }}>ID</th>
                                <th style={{ padding: '12px' }}>Producto</th>
                                <th style={{ padding: '12px' }}>Categoría</th>
                                <th style={{ padding: '12px' }}>Precio Venta</th>
                                <th style={{ padding: '12px' }}>Stock</th>
                                <th style={{ padding: '12px' }}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {lista.length > 0 ? (
                                lista.map((p) => (
                                    <tr key={p.id_producto} style={{ borderBottom: '1px solid #f4f4f4' }}>
                                        <td style={{ padding: '12px' }}>{p.id_producto}</td>
                                        <td style={{ padding: '12px' }}>{p.nombre}</td>
                                        <td style={{ padding: '12px' }}>
                                            <span className="badge-categoria" style={{ padding: '4px 8px', backgroundColor: '#e9ecef', borderRadius: '4px', fontSize: '0.85em' }}>
                                                {p.nombre_categoria || 'Sin categoría'}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px' }}>S/ {p.precio_venta}</td>
                                        <td style={{ padding: '12px' }}>
                                            <span className={p.stock < 5 ? 'stock-bajo' : ''} style={{ fontWeight: 'bold', color: p.stock < 5 ? '#dc3545' : 'inherit' }}>
                                                {p.stock}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px' }}>
                                            <Link to={`/panel/productos/editar/${p.id_producto}`} className="btn-accion edit">
                                                <i className="bi bi-pencil-square"></i>
                                            </Link>
                                            <button title="Eliminar" className="btn-accion delete" style={{ border: 'none', background: 'none', color: '#dc3545', cursor: 'pointer', fontSize: '1.2rem' }}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" style={{ padding: '30px', textAlign: 'center', color: '#888' }}>
                                        No hay productos registrados en la base de datos.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default Productos;