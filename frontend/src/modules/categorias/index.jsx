import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function IndexCategorias() {
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

    const cargarCategorias = async () => {
        try {
            const res = await fetch('https://storestock.onrender.com/api/categorias');
            const data = await res.json();
            setCategorias(data);
        } catch (err) {
            console.error("Error al cargar categorías:", err);
        }
    };

    useEffect(() => {
        cargarCategorias();
    }, []);

    return (
        <section className="seccion">
            <div className="header-modulo" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Gestión de Categorías</h2>
                <button onClick={() => navigate("nuevo")} className="btn-nuevo">Nueva Categoría</button>
            </div>

            <table className="tabla-estilo" style={{ marginTop: '20px', width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((cat) => (
                        <tr key={cat.id_categoria}>
                            <td>{cat.id_categoria}</td>
                            <td>{cat.nombre}</td>
                            <td>{cat.descripcion}</td>
                            <td>
                                <button onClick={() => navigate(`editar/${cat.id_categoria}`)} className="btn-editar">Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default IndexCategorias;