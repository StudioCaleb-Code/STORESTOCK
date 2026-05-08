import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function FormularioProducto() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [preview, setPreview] = useState(null);
    const [file, setFile] = useState(null);

    const [producto, setProducto] = useState({
        nombre: "",
        id_categoria: "",
        id_proveedor: "",
        descripcion: "",
        precio_venta: "",
        stock: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. MEJORA: Peticiones con manejo individual para evitar bloqueo total
                const [resCat, resProv] = await Promise.all([
                    fetch('https://storestock.onrender.com/api/categorias').catch(() => null),
                    fetch('https://storestock.onrender.com/api/proveedores').catch(() => null)
                ]);

                if (resCat && resCat.ok) {
                    const dataCat = await resCat.json();
                    setCategorias(Array.isArray(dataCat) ? dataCat : []);
                }

                if (resProv && resProv.ok) {
                    const dataProv = await resProv.json();
                    setProveedores(Array.isArray(dataProv) ? dataProv : []);
                }

                // 2. Cargar producto si estamos en modo edición
                if (id) {
                    const resProd = await fetch(`https://storestock.onrender.com/api/productos/${id}`);
                    if (resProd.ok) {
                        const data = await resProd.json();
                        // Importante: Asegurar que los campos no sean null para que los inputs no fallen
                        setProducto({
                            nombre: data.nombre || "",
                            id_categoria: data.id_categoria || "",
                            id_proveedor: data.id_proveedor || "",
                            descripcion: data.descripcion || "",
                            precio_venta: data.precio_venta || "",
                            stock: data.stock || ""
                        });
                        if (data.imagen_principal) {
                            setPreview(`https://storestock.onrender.com/uploads/${data.imagen_principal}`);
                        }
                    }
                }
            } catch (err) {
                console.error("Error crítico en el formulario:", err);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setProducto({ ...producto, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        // 3. MEJORA: Enviar datos asegurando que no sean undefined
        Object.keys(producto).forEach(key => {
            formData.append(key, producto[key]);
        });
        if (file) formData.append("imagen", file);

        const url = id ? `https://storestock.onrender.com/api/productos/${id}` : `https://storestock.onrender.com/api/productos`;
        const method = id ? "PUT" : "POST";

        try {
            const response = await fetch(url, { method, body: formData });
            if (response.ok) {
                alert("Guardado correctamente");
                navigate("/panel/productos");
            }
        } catch (error) {
            console.error("Error al enviar:", error);
        }
    };

    return (
        <section className="seccion">
            <div className="header-modulo" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>{id ? "Editar" : "Nuevo"} Producto</h2>
                <button type="button" onClick={() => navigate("/panel/productos")} className="btn-volver">Volver</button>
            </div>

            <form onSubmit={handleSubmit} className="formulario-estilo" style={{ marginTop: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <div className="grupo-input">
                            <label>Nombre</label>
                            <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} required />
                        </div>

                        <div className="grupo-input">
                            <label>Categoría</label>
                            <select name="id_categoria" value={producto.id_categoria} onChange={handleChange} required>
                                <option value="">Seleccione...</option>
                                {categorias.map(c => (
                                    <option key={c.id_categoria} value={c.id_categoria}>{c.nombre}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grupo-input">
                            <label>Proveedor</label>
                            <select name="id_proveedor" value={producto.id_proveedor} onChange={handleChange} required>
                                <option value="">Seleccione...</option>
                                {proveedores.map(p => (
                                    <option key={p.id_proveedor} value={p.id_proveedor}>{p.nombre_empresa}</option>
                                ))}
                            </select>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <div className="grupo-input" style={{ flex: 1 }}>
                                <label>Precio</label>
                                <input type="number" step="0.01" name="precio_venta" value={producto.precio_venta} onChange={handleChange} required />
                            </div>
                            <div className="grupo-input" style={{ flex: 1 }}>
                                <label>Stock</label>
                                <input type="number" name="stock" value={producto.stock} onChange={handleChange} required />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="grupo-input">
                            <label>Descripción</label>
                            <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} rows="4"></textarea>
                        </div>

                        <div className="grupo-input">
                            <label>Imagen</label>
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                            {preview && <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'contain', marginTop: '10px' }} />}
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn-guardar" style={{ marginTop: '20px' }}>
                    {id ? "Actualizar" : "Guardar"}
                </button>
            </form>
        </section>
    );
}

export default FormularioProducto;