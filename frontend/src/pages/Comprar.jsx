import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderPublico from '../components/HeaderPublico';

function Carrito() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [pagando, setPagando] = useState(false);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('carrito_publico')) || [];
        setItems(savedCart);
        calcularTotal(savedCart);
    }, []);

    const calcularTotal = (cartItems) => {
        const t = cartItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        setTotal(t);
    };

    const procesarPagoYape = async () => {
        setPagando(true);

        // Simulación de validación automática de API Yape
        // En un entorno real, aquí llamarías al webhook de la pasarela
        setTimeout(async () => {
            const ventaData = {
                id_cliente: null, // O el ID si está logueado
                id_usuario: 3, // Sistema/Admin por defecto
                total: total,
                id_metodo_pago: 1, // 1 es Yape
                estado_pago: 'completado', // Validación automática exitosa
                detalles: items.map(i => ({
                    id_producto: i.id_producto,
                    cantidad: i.cantidad,
                    precio_unitario: i.precio
                }))
            };

            try {
                const res = await fetch("http://localhost:3001/api/ventas", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(ventaData)
                });

                if (res.ok) {
                    alert("¡Pago con Yape verificado exitosamente! Su pedido está en camino.");
                    localStorage.removeItem('carrito_publico');
                    navigate("/");
                }
            } catch (error) {
                alert("Error al procesar el pago");
            } finally {
                setPagando(false);
            }
        }, 2000); // 2 segundos de "validación"
    };

    return (
        <div style={{ background: '#f4f7f6', minHeight: '100vh' }}>
            <HeaderPublico carritoCount={items.length} />
            <main style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', background: '#fff', borderRadius: '10px' }}>
                <h2>Tu Carrito</h2>
                {items.length === 0 ? <p>El carrito está vacío</p> : (
                    <>
                        {items.map((item, idx) => (
                            <div key={idx} style={styles.item}>
                                <span>{item.nombre} (x{item.cantidad})</span>
                                <strong>${(item.precio * item.cantidad).toFixed(2)}</strong>
                            </div>
                        ))}
                        <hr />
                        <div style={{ textAlign: 'right', fontSize: '1.5rem' }}>Total: ${total.toFixed(2)}</div>

                        <div style={styles.metodos}>
                            <h3>Pagar con Yape</h3>
                            <div style={styles.yapeBox}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/Yape_logo.png" width="80" alt="Yape" />
                                <p>Escanea el QR o paga al número: <b>987 654 321</b></p>
                                <button
                                    onClick={procesarPagoYape}
                                    disabled={pagando}
                                    style={styles.btnYape}
                                >
                                    {pagando ? "Verificando pago..." : "Ya pagué, verificar ahora"}
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

const styles = {
    item: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' },
    metodos: { marginTop: '30px', textAlign: 'center' },
    yapeBox: { border: '2px solid #74226C', padding: '20px', borderRadius: '15px', background: '#f9f0f9' },
    btnYape: { background: '#74226C', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', marginTop: '15px' }
};

export default Carrito;