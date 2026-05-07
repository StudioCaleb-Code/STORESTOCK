import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderPublico from '../components/HeaderPublico';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

function Carrito() {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [paso, setPaso] = useState(1);
    const [cargando, setCargando] = useState(false);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('carrito_publico')) || [];
        setItems(savedCart);
        const t = savedCart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
        setTotal(t);
    }, []);

    const generarPDF = (idVenta) => {
        const doc = new jsPDF();
        
        // Encabezado
        doc.setFontSize(18);
        doc.text("RECIBO DE COMPRA - STORESTOCK", 105, 20, { align: 'center' });
        
        doc.setFontSize(12);
        doc.text(`Venta No: #000${idVenta}`, 20, 35);
        doc.text(`Fecha: ${new Date().toLocaleString()}`, 20, 42);
        doc.text(`Vendedor: Fermín (951 648 614)`, 20, 49);

        // Tabla de productos corregida
        autoTable(doc, {
            startY: 55,
            head: [['Producto', 'Cant.', 'Precio', 'Subtotal']],
            body: items.map(i => [
                i.nombre, 
                i.cantidad, 
                `S/ ${parseFloat(i.precio).toFixed(2)}`, 
                `S/ ${(i.precio * i.cantidad).toFixed(2)}`
            ]),
            theme: 'grid',
            headStyles: { fillColor: [116, 34, 108] } // Color morado Yape
        });

        const finalY = doc.lastAutoTable.finalY;
        doc.setFontSize(14);
        doc.text(`TOTAL PAGADO: S/ ${total.toFixed(2)}`, 140, finalY + 15);
        
        doc.save(`Compra_STORESTOCK_${idVenta}.pdf`);
    };

    const finalizarCompra = async () => {
        if (items.length === 0) return;
        setCargando(true);

        const ventaData = {
            id_usuario: 3, 
            total: total,
            id_metodo_pago: 1, 
            estado_pago: 'completado', 
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

            const data = await res.json();

            if (res.ok) {
                // Generar PDF con la ID que devuelve el servidor
                generarPDF(data.id_venta || Math.floor(Math.random() * 1000));
                
                localStorage.removeItem('carrito_publico');
                alert("¡Compra Exitosa! El stock ha sido actualizado automáticamente.");
                navigate("/");
            } else {
                console.error("Error del servidor:", data);
                alert("Error al procesar la venta en el servidor.");
            }
        } catch (e) {
            console.error("Error de red:", e);
            alert("No se pudo conectar con el servidor.");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div style={{ background: '#f4f7f6', minHeight: '100vh' }}>
            <HeaderPublico carritoCount={items.length} />
            <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px', background: '#fff', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
                {paso === 1 ? (
                    <>
                        <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #74226C', paddingBottom: '10px' }}>Mi Carrito</h2>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                            <thead>
                                <tr style={{ background: '#f8f9fa', textAlign: 'center' }}>
                                    <th style={{ padding: '12px' }}>Imagen</th>
                                    <th>Producto</th>
                                    <th>Disp.</th>
                                    <th>Cant.</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, idx) => (
                                    <tr key={idx} style={{ borderBottom: '1px solid #eee', textAlign: 'center' }}>
                                        <td style={{ padding: '10px' }}>
                                            <img 
                                                src={`http://localhost:3001/uploads/${item.imagen || 'default.png'}`} 
                                                width="50" height="50" 
                                                style={{ objectFit: 'cover', borderRadius: '8px' }} 
                                                alt="p"
                                            />
                                        </td>
                                        <td style={{ fontWeight: '500' }}>{item.nombre}</td>
                                        <td style={{ color: '#666' }}>{item.stock}</td>
                                        <td>{item.cantidad}</td>
                                        <td style={{ fontWeight: 'bold' }}>S/ {(item.precio * item.cantidad).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h3 style={{ textAlign: 'right', marginTop: '30px', fontSize: '1.5rem' }}>Total: S/ {total.toFixed(2)}</h3>
                        <button 
                            onClick={() => setPaso(2)} 
                            style={{ width: '100%', padding: '15px', background: '#74226C', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem', marginTop: '20px' }}
                        >
                            PROCEDER A PAGAR CON YAPE
                        </button>
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <button onClick={() => setPaso(1)} style={{ background: 'none', border: 'none', color: '#74226C', cursor: 'pointer', fontWeight: 'bold', float: 'left' }}>← Volver</button>
                        <h2 style={{ color: '#74226C', marginBottom: '20px' }}>Escanea y Paga</h2>
                        <p style={{ fontSize: '1.2rem' }}>Monto a Yapear: <strong>S/ {total.toFixed(2)}</strong></p>
                        <div style={{ background: '#fdf0ff', padding: '20px', borderRadius: '20px', width: 'fit-content', margin: '20px auto', border: '2px dashed #74226C' }}>
                            <i className="bi bi-qr-code" style={{ fontSize: '10rem' }}></i>
                        </div>
                        <h3>Celular: 951 648 614</h3>
                        <p><strong>Titular:</strong> Fermín - STORESTOCK</p>
                        <button 
                            onClick={finalizarCompra} 
                            disabled={cargando}
                            style={{ width: '100%', padding: '18px', background: cargando ? '#ccc' : '#27ae60', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: cargando ? 'not-allowed' : 'pointer', fontSize: '1.2rem', marginTop: '20px' }}
                        >
                            {cargando ? "Procesando..." : "¡YA PAGUÉ! (Descargar Voucher)"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Carrito;