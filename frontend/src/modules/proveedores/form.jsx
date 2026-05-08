import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function FormularioProveedor() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [proveedor, setProveedor] = useState({
        nombre_empresa: "",
        contacto_nombre: "",
        telefono: "",
        correo: "",
        direccion: ""
    });

    useEffect(() => {
        if (id) {
            fetch(`https://storestock.onrender.com/api/proveedores/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data) setProveedor(data);
                })
                .catch(err => console.error("Error al cargar proveedor:", err));
        }
    }, [id]);

    const handleChange = (e) => {
        setProveedor({ ...proveedor, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = id ? `https://storestock.onrender.com/api/proveedores/${id}` : `https://storestock.onrender.com/api/proveedores`;
        const method = id ? "PUT" : "POST";

        try {
            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(proveedor)
            });

            if (response.ok) {
                alert(id ? "Proveedor actualizado" : "Proveedor registrado con éxito");
                navigate("/panel/proveedores");
            }
        } catch (error) {
            console.error("Error al guardar proveedor:", error);
        }
    };

    return (
        <section className="seccion">
            <h2>{id ? "Editar" : "Nuevo"} Proveedor</h2>
            
            <form onSubmit={handleSubmit} className="formulario-estilo" style={{ marginTop: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="grupo-input">
                        <label>Nombre de la Empresa</label>
                        <input type="text" name="nombre_empresa" value={proveedor.nombre_empresa} onChange={handleChange} required />
                    </div>

                    <div className="grupo-input">
                        <label>Nombre del Contacto</label>
                        <input type="text" name="contacto_nombre" value={proveedor.contacto_nombre} onChange={handleChange} />
                    </div>

                    <div className="grupo-input">
                        <label>Teléfono</label>
                        <input type="text" name="telefono" value={proveedor.telefono} onChange={handleChange} />
                    </div>

                    <div className="grupo-input">
                        <label>Correo Electrónico</label>
                        <input type="email" name="correo" value={proveedor.correo} onChange={handleChange} />
                    </div>
                </div>

                <div className="grupo-input" style={{ marginTop: '15px' }}>
                    <label>Dirección</label>
                    <textarea name="direccion" value={proveedor.direccion} onChange={handleChange} rows="3"></textarea>
                </div>

                <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                    <button type="submit" className="btn-guardar">Guardar Proveedor</button>
                    <button type="button" onClick={() => navigate("/panel/proveedores")} className="btn-volver">Cancelar</button>
                </div>
            </form>
        </section>
    );
}

export default FormularioProveedor;