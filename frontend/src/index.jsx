import { useNavigate } from 'react-router-dom';

const IndexPublic = () => {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1>STORESTOCK</h1>
                <p>Sistema Inteligente de Control de Inventario y Ventas</p>
            </header>

            <main style={styles.main}>
                <section style={styles.hero}>
                    <h2>Gestiona tus productos y genera comprobantes en segundos.</h2>
                    <p>La herramienta completa para proveedores, stock y reportes detallados.</p>

                    <button
                        style={styles.loginButton}
                        onClick={() => navigate('/login')}
                    >
                        Ingresar al Sistema
                    </button>
                </section>
            </main>

            <footer style={styles.footer}>
                <p>&copy; 2024 STORESTOCK - Gestión Profesional</p>
            </footer>
        </div>
    );
};

// Estilos rápidos para que no se vea vacío
const styles = {
    container: { fontFamily: 'Arial, sans-serif', textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column' },
    header: { padding: '2rem', backgroundColor: '#2c3e50', color: 'white' },
    main: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
    hero: { maxWidth: '600px' },
    loginButton: {
        padding: '15px 30px',
        fontSize: '1.2rem',
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginTop: '20px'
    },
    footer: { padding: '1rem', backgroundColor: '#f4f4f4' }
};

export default IndexPublic;