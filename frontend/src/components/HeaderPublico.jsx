import { Link } from 'react-router-dom';

function HeaderPublico({ carritoCount }) {
    return (
        <header className="header-publico" style={styles.header}>
            <div className="container" style={styles.container}>
                <Link to="/" style={{textDecoration: 'none'}}><h2 style={{margin: 0, color: '#2c3e50'}}>STORESTOCK</h2></Link>
                <nav style={styles.nav}>
                    <Link to="/carrito" style={styles.carritoBtn}>
                        <i className="bi bi-cart4"></i>
                        {carritoCount > 0 && <span style={styles.badge}>{carritoCount}</span>}
                    </Link>
                    <Link to="/login" style={styles.botonLogin}>Acceder</Link>
                </nav>
            </div>
        </header>
    );
}

const styles = {
    header: { background: '#fff', padding: '15px 0', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', position: 'sticky', top: 0, zIndex: 1000 },
    container: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' },
    nav: { display: 'flex', gap: '20px', alignItems: 'center' },
    carritoBtn: { position: 'relative', fontSize: '1.5rem', color: '#2c3e50', textDecoration: 'none' },
    badge: { position: 'absolute', top: '-5px', right: '-10px', background: '#e74c3c', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '0.7rem' },
    botonLogin: { background: '#2c3e50', color: '#fff', padding: '8px 18px', borderRadius: '5px', textDecoration: 'none' }
};

export default HeaderPublico;