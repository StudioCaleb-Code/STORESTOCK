import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function FormularioProducto() {
    const { id } = useParams(); // Si hay ID, estamos editando
    const navigate = useNavigate();

    const [producto, setProducto] = useState({
        nombre: "",
        id_categoria: "",
        precio_venta: "",
        stock: "",
        descripcion: ""
    });

    // Si hay ID, cargar los datos actuales del producto
    useEffect(() => {
        if (id) {
            fetch(`http://localhost:3001/api/productos/${id}`)
                .then(res => res.json())
                .then(data => setProducto(data))
                .catch(err => console.error("Error al cargar producto:", err));
        }
    }, [id]);

    const handleChange = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificamos si es edición o creación
        const url = id
            ? `http://localhost:3001/api/productos/${id}`
            : `http://localhost:3001/api/productos`;

        const method = id ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(producto) // 'producto' debe tener id_categoria, precio_venta, etc.
            });

            const resData = await response.json();

            if (resData.ok || response.ok) {
                alert(id ? "¡Actualizado!" : "¡Guardado!");
                navigate("/panel/productos"); // Regresamos a la tabla
            } else {
                alert("Error al procesar: " + resData.message);
            }
        } catch (error) {
            console.error("Error en la petición:", error);
        }
    };

    return (
        <section className="seccion-form">
            <div className="header-modulo">
                <h2>{id ? "Editar Producto" : "Nuevo Producto"}</h2>
                <button onClick={() => navigate("/panel/productos")} className="btn-volver">
                    <i className="bi bi-arrow-left"></i> Volver
                </button>
            </div>

            <form onSubmit={handleSubmit} className="formulario-estilo">
                <div className="grupo-input">
                    <label>Nombre del Producto</label>
                    <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} required />
                </div>

                <div className="grupo-input">
                    <label>Precio de Venta</label>
                    <input type="number" name="precio_venta" value={producto.precio_venta} onChange={handleChange} required />
                </div>

                <div className="grupo-input">
                    <label>Stock Inicial</label>
                    <input type="number" name="stock" value={producto.stock} onChange={handleChange} required />
                </div>

                <div className="grupo-input">
                    <label>Descripción</label>
                    <textarea name="descripcion" value={producto.descripcion} onChange={handleChange}></textarea>
                </div>

                <button type="submit" className="btn-guardar">
                    {id ? "Actualizar Producto" : "Guardar Producto"}
                </button>
            </form>
        </section>
    );
}

export default FormularioProducto;