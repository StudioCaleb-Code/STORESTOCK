import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function FormularioCategoria() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Estado inicial limpio
    const [categoria, setCategoria] = useState({
        nombre: "",
        descripcion: ""
    });

    const [cargando, setCargando] = useState(false);

    // Cargar datos si es edición
    useEffect(() => {
        if (id) {
            const obtenerCategoria = async () => {
                try {
                    const res = await fetch(`http://localhost:3001/api/categorias/${id}`);
                    if (res.ok) {
                        const data = await res.json();
                        setCategoria({
                            nombre: data.nombre || "",
                            descripcion: data.descripcion || ""
                        });
                    } else {
                        console.error("No se encontró la categoría");
                    }
                } catch (err) {
                    console.error("Error al obtener categoría:", err);
                }
            };
            obtenerCategoria();
        }
    }, [id]);

    const handleChange = (e) => {
        setCategoria({ 
            ...categoria, 
            [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);
        
        // La URL depende de si el ID existe (PUT) o no (POST)
        const url = id 
            ? `http://localhost:3001/api/categorias/${id}` 
            : `http://localhost:3001/api/categorias`;
            
        const method = id ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(categoria)
            });

            const resultado = await response.json();

            if (response.ok) {
                alert(id ? "Categoría actualizada" : "Categoría registrada con éxito");
                navigate("/panel/categorias");
            } else {
                alert("Error: " + (resultado.error || "No se pudo guardar"));
            }
        } catch (error) {
            console.error("Error al guardar:", error);
            alert("Error de conexión con el servidor");
        } finally {
            setCargando(false);
        }
    };

    return (
        <section className="seccion">
            <div className="header-modulo">
                <h2>{id ? "Editar" : "Nueva"} Categoría</h2>
            </div>

            <form onSubmit={handleSubmit} className="formulario-estilo" style={{ maxWidth: '500px', marginTop: '20px' }}>
                <div className="grupo-input">
                    <label>Nombre de la Categoría</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        placeholder="Ej: Electrónicos, Ropa..."
                        value={categoria.nombre} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div className="grupo-input">
                    <label>Descripción (Opcional)</label>
                    <textarea 
                        name="descripcion" 
                        placeholder="Breve descripción de la categoría"
                        value={categoria.descripcion} 
                        onChange={handleChange} 
                        rows="4"
                    ></textarea>
                </div>

                <div style={{ marginTop: '25px', display: 'flex', gap: '15px' }}>
                    <button 
                        type="submit" 
                        className="btn-guardar" 
                        disabled={cargando}
                    >
                        {cargando ? "Guardando..." : id ? "Actualizar" : "Registrar Categoría"}
                    </button>
                    
                    <button 
                        type="button" 
                        onClick={() => navigate("/panel/categorias")} 
                        className="btn-volver"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </section>
    );
}

export default FormularioCategoria;