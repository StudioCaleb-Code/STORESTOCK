import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [fetchingRoles, setFetchingRoles] = useState(true);

    // Estados del formulario
    const [formData, setFormData] = useState({
        nombres: '',
        apellido_pa: '',
        apellido_ma: '',
        telefono: '',
        correo: '',
        username: '',
        password: '',
        id_rol: '',
        ubicacion: '' // Añadido para coincidir con tu tabla dato_u
    });

    // Cargar roles desde tu API MySQL
    useEffect(() => {
        const getRoles = async () => {
            setFetchingRoles(true);
            try {
                // Cambia esta URL por la de tu backend si es distinta
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/roles`);
                const data = await response.json();
                
                if (response.ok) {
                    setRoles(data);
                } else {
                    console.error("Error al obtener roles");
                }
            } catch (err) {
                console.error("Error de conexión:", err);
            } finally {
                setFetchingRoles(false);
            }
        };
        getRoles();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (!formData.id_rol) {
            alert("Por favor, selecciona un rol.");
            return;
        }

        setLoading(true);

        try {
            // Petición a tu nuevo servidor Node.js + MySQL
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                alert('¡Registro exitoso en MySQL!');
                navigate('/login');
            } else {
                throw new Error(result.message || "Error al registrar");
            }

        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={containerStyle}>
            <div style={cardStyle}>
                <div style={headerStyle}>
                    <h2 style={titleStyle}>Crear Cuenta</h2>
                    <p style={subtitleStyle}>Únete a STORESTOCK y gestiona tu inventario</p>
                </div>

                <form onSubmit={handleRegister} style={formStyle}>
                    
                    <div style={sectionTitle}>Datos Personales</div>
                    <input name="nombres" placeholder="Nombres" onChange={handleChange} required style={inputStyle} />
                    
                    <div style={rowStyle}>
                        <input name="apellido_pa" placeholder="Ap. Paterno" onChange={handleChange} required style={inputStyle} />
                        <input name="apellido_ma" placeholder="Ap. Materno" onChange={handleChange} required style={inputStyle} />
                    </div>

                    <div style={rowStyle}>
                        <input name="telefono" placeholder="Teléfono" onChange={handleChange} required style={inputStyle} />
                        <input name="ubicacion" placeholder="Ciudad/Ubicación" onChange={handleChange} style={inputStyle} />
                    </div>

                    <div style={sectionTitle}>Credenciales de Acceso</div>
                    <input name="username" placeholder="Nombre de Usuario" onChange={handleChange} required style={inputStyle} />
                    <input name="correo" type="email" placeholder="Correo electrónico" onChange={handleChange} required style={inputStyle} />
                    <input name="password" type="password" placeholder="Contraseña segura" onChange={handleChange} required style={inputStyle} />

                    <select
                        name="id_rol"
                        onChange={handleChange}
                        required
                        style={selectStyle}
                        disabled={fetchingRoles}
                    >
                        <option value="">{fetchingRoles ? 'Cargando roles...' : 'Selecciona tu nivel de acceso'}</option>
                        {roles.map(rol => (
                            <option key={rol.id_rol} value={rol.id_rol}>{rol.nombre}</option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        disabled={loading || fetchingRoles}
                        style={{
                            ...buttonStyle,
                            backgroundColor: (loading || fetchingRoles) ? '#bdc3c7' : '#2ecc71',
                            transform: loading ? 'scale(0.98)' : 'scale(1)'
                        }}
                    >
                        {loading ? 'Procesando...' : 'Finalizar Registro'}
                    </button>

                    <div style={footerLinkStyle}>
                        ¿Ya eres miembro? <span onClick={() => navigate('/login')} style={linkStyle}>Inicia Sesión</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- ESTILOS MEJORADOS (CSS-in-JS) ---

const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
};

const cardStyle = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
    width: '100%',
    maxWidth: '500px',
    animation: 'fadeIn 0.5s ease'
};

const headerStyle = {
    textAlign: 'center',
    marginBottom: '30px'
};

const titleStyle = {
    color: '#2c3e50',
    fontSize: '28px',
    fontWeight: '700',
    margin: '0 0 10px 0'
};

const subtitleStyle = {
    color: '#7f8c8d',
    fontSize: '14px',
    margin: 0
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
};

const sectionTitle = {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#95a5a6',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    marginTop: '10px',
    borderBottom: '1px solid #eee',
    paddingBottom: '5px'
};

const rowStyle = {
    display: 'flex',
    gap: '12px'
};

const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    borderRadius: '8px',
    border: '1px solid #dfe6e9',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.3s',
    backgroundColor: '#f9f9f9',
    boxSizing: 'border-box'
};

const selectStyle = {
    ...inputStyle,
    cursor: 'pointer',
    appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 15px center',
    backgroundSize: '15px'
};

const buttonStyle = {
    padding: '15px',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    marginTop: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 6px rgba(46, 204, 113, 0.2)'
};

const footerLinkStyle = {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '14px',
    color: '#7f8c8d'
};

const linkStyle = {
    color: '#3498db',
    fontWeight: 'bold',
    cursor: 'pointer',
    textDecoration: 'none'
};

export default Register;