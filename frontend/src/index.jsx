import { useState, useEffect } from 'react';
import HeaderPublico from './components/HeaderPublico';

function IndexPublic() {
    const [productos, setProductos] = useState([]);
    const [carritoCount, setCarritoCount] = useState(0);

    useEffect(() => {
        fetch("https://storestock.onrender.com/api/productos")
            .then(res => res.json())
            .then(data => setProductos(data))
            .catch(err => console.error("Error:", err));

        const savedCart = JSON.parse(localStorage.getItem('carrito_publico')) || []; setCarritoCount(savedCart.length);
    }, []);

    const agregarAlCarrito = (p) => {
        let cart = JSON.parse(localStorage.getItem('carrito_publico')) || [];
        const existe = cart.find(item => item.id_producto === p.id_producto);
        
        if (existe) {
            cart = cart.map(item => 
                item.id_producto === p.id_producto 
                ? { ...item, cantidad: item.cantidad + 1 } : item
            );
        } else {
            cart.push({ 
                id_producto: p.id_producto, 
                nombre: p.nombre, 
                precio: parseFloat(p.precio_venta), 
                imagen: p.imagen_principal, // IMPORTANTE: Guardamos el nombre del archivo
                stock: p.stock, // Guardamos el stock disponible
                cantidad: 1 
            });
        }
        localStorage.setItem('carrito_publico', JSON.stringify(cart));
        setCarritoCount(cart.length);
    };

    return (
        <div style={styles.wrapper}>
            <HeaderPublico carritoCount={carritoCount} />
            <div style={styles.scrollContent}>
                <section style={styles.hero}>
                    <div style={styles.heroOverlay}>
                        <h1 style={styles.heroTitle}>STORESTOCK</h1>
                        <p>Calidad garantizada por Fermín</p>
                    </div>
                </section>

                <main style={styles.mainContainer}>
                    <h2 style={styles.title}>Catálogo de Productos</h2>
                    <div style={styles.grid}>
                        {productos.map(p => (
                            <div key={p.id_producto} style={styles.card}>
                                <div style={styles.imgContainer}>
                                    <img 
                                        src={`https://storestock.onrender.com/uploads/${p.imagen_principal || 'default.png'}`} 
                                        alt={p.nombre} 
                                        style={styles.img}
                                    />
                                    <div style={styles.priceTag}>S/ {parseFloat(p.precio_venta).toFixed(2)}</div>
                                </div>
                                <div style={styles.cardBody}>
                                    <h4 style={styles.prodNombre}>{p.nombre}</h4>
                                    <p style={styles.stockLabel}>Stock disponible: {p.stock}</p>
                                    <button onClick={() => agregarAlCarrito(p)} style={styles.btnComprar}>
                                        <i className="bi bi-cart-plus"></i> Agregar
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

const styles = {
    wrapper: { display: 'flex', flexDirection: 'column', height: '100vh', background: '#f8fafc', overflow: 'hidden' },
    scrollContent: { flex: 1, overflowY: 'auto' },
    hero: { height: '300px', background: 'url("https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1000") center/cover', position: 'relative' },
    heroOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: '#fff' },
    heroTitle: { fontSize: '3rem', fontWeight: 'bold', margin: 0 },
    mainContainer: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' },
    card: { background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
    imgContainer: { height: '200px', position: 'relative' },
    img: { width: '100%', height: '100%', objectFit: 'cover' },
    priceTag: { position: 'absolute', bottom: '10px', right: '10px', background: '#27ae60', color: '#fff', padding: '5px 10px', borderRadius: '5px', fontWeight: 'bold' },
    cardBody: { padding: '15px' },
    prodNombre: { margin: '0 0 5px 0' },
    stockLabel: { fontSize: '0.8rem', color: '#666' },
    btnComprar: { width: '100%', padding: '10px', border: 'none', background: '#74226C', color: '#fff', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' },
    title: { textAlign: 'center', marginBottom: '30px' }
};

export default IndexPublic;