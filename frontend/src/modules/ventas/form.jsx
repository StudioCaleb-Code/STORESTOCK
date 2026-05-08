import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function FormularioVenta() {
    const navigate = useNavigate();
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    
    // Estado de la venta
    const [id_cliente, setIdCliente] = useState("");
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Cargar clientes y productos al iniciar
        fetch("https://storestock.onrender.com/api/clientes")
            .then(res => res.json())
            .then(data => setClientes(data))
            .catch(err => console.error("Error clientes:", err));

        fetch("https://storestock.onrender.com/api/productos")
            .then(res => res.json())
            .then(data => setProductos(data))
            .catch(err => console.error("Error productos:", err));
    }, []);

    const agregarAlCarrito = (e) => {
        const prodId = e.target.value;
        if (!prodId) return;

        const prodEncontrado = productos.find(p => p.id_producto === parseInt(prodId));
        
        if (prodEncontrado) {
            if (prodEncontrado.stock <= 0) {
                alert("Este producto no tiene stock disponible");
                return;
            }

            const existe = carrito.find(item => item.id_producto === prodEncontrado.id_producto);

            if (existe) {
                const nuevoCarrito = carrito.map(item => 
                    item.id_producto === prodEncontrado.id_producto 
                    ? { 
                        ...item, 
                        cantidad: item.cantidad + 1, 
                        subtotal: (item.cantidad + 1) * item.precio_unitario 
                      }
                    : item
                );
                setCarrito(nuevoCarrito);
            } else {
                const nuevoItem = {
                    id_producto: prodEncontrado.id_producto,
                    nombre: prodEncontrado.nombre,
                    precio_unitario: parseFloat(prodEncontrado.precio_venta),
                    cantidad: 1,
                    subtotal: parseFloat(prodEncontrado.precio_venta)
                };
                setCarrito([...carrito, nuevoItem]);
            }
            setTotal(prevTotal => prevTotal + parseFloat(prodEncontrado.precio_venta));
        }
        e.target.value = ""; 
    };

    const quitarDelCarrito = (index) => {
        const itemAEliminar = carrito[index];
        const nuevoCarrito = carrito.filter((_, i) => i !== index);
        setCarrito(nuevoCarrito);
        setTotal(prevTotal => prevTotal - parseFloat(itemAEliminar.subtotal));
    };

    const generarTicketPDF = (ventaFinal) => {
        const doc = new jsPDF();
        
        doc.setFontSize(18);
        doc.text("COMPROBANTE DE VENTA", 14, 20);
        
        doc.setFontSize(11);
        doc.text(`Cliente: ${ventaFinal.cliente_nombre}`, 14, 30);
        doc.text(`Fecha: ${new Date().toLocaleString()}`, 14, 37);
        doc.text(`Vendedor ID: ${ventaFinal.id_usuario}`, 14, 44);

        // Uso de autoTable importado directamente
        autoTable(doc, {
            startY: 50,
            head: [['Producto', 'P. Unitario', 'Cant.', 'Subtotal']],
            body: carrito.map(item => [
                item.nombre, 
                `$${item.precio_unitario.toFixed(2)}`, 
                item.cantidad, 
                `$${item.subtotal.toFixed(2)}`
            ]),
            foot: [['', '', 'TOTAL', `$${total.toFixed(2)}`]]
        });

        doc.save(`Ticket_Venta_${Date.now()}.pdf`);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (carrito.length === 0) return alert("Debes agregar al menos un producto");

        // LÓGICA DE USUARIO: Buscamos sesión o usamos el ID 3 por defecto
        const userStorage = JSON.parse(localStorage.getItem("usuario"));
        const idUsuarioLogueado = userStorage ? userStorage.id_usuario : 3;

        const clienteSeleccionado = clientes.find(c => c.id_cliente == id_cliente);
        const cliente_nombre = clienteSeleccionado 
            ? `${clienteSeleccionado.nombres} ${clienteSeleccionado.apellidos}` 
            : "Consumidor Final";

        const ventaData = {
            id_cliente: id_cliente || null,
            id_usuario: idUsuarioLogueado, 
            cliente_nombre: cliente_nombre, 
            total: total,
            detalles: carrito.map(item => ({
                id_producto: item.id_producto,
                cantidad: item.cantidad,
                precio_unitario: item.precio_unitario
            }))
        };

        try {
            const response = await fetch("https://storestock.onrender.com/api/ventas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(ventaData)
            });

            const resultado = await response.json();

            if (response.ok) {
                alert(`Venta registrada exitosamente.`);
                generarTicketPDF(ventaData); // Generamos el PDF
                navigate("/panel/ventas");
            } else {
                // Aquí verás el error de MySQL si el ID 3 no existe
                alert("Error en el servidor: " + resultado.error);
            }
        } catch (error) {
            console.error("Error al procesar venta:", error);
            alert("No se pudo conectar con el servidor");
        }
    };

    return (
        <section className="seccion">
            <div className="header-modulo">
                <h2> <i className="bi bi-cart-plus"></i> Registrar Nueva Venta</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="formulario-estilo">
                <div className="grupo-input">
                    <label>Seleccionar Cliente</label>
                    <select 
                        value={id_cliente} 
                        onChange={(e) => setIdCliente(e.target.value)}
                        className="control-input"
                    >
                        <option value="">Consumidor Final (Opcional)</option>
                        {clientes.map(c => (
                            <option key={c.id_cliente} value={c.id_cliente}>
                                {c.nombres} {c.apellidos}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grupo-input" style={{ marginTop: '20px' }}>
                    <label>Buscar y Añadir Producto</label>
                    <select onChange={agregarAlCarrito} className="control-input">
                        <option value="">Seleccione un producto...</option>
                        {productos.map(p => (
                            <option key={p.id_producto} value={p.id_producto} disabled={p.stock <= 0}>
                                {p.nombre} - ${p.precio_venta} {p.stock <= 0 ? "(SIN STOCK)" : `(Stock: ${p.stock})`}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="contenedor-tabla" style={{ marginTop: '30px' }}>
                    <table className="tabla-estilo">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th className="text-center">Precio</th>
                                <th className="text-center">Cant.</th>
                                <th className="text-right">Subtotal</th>
                                <th className="text-center">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carrito.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center" style={{ padding: '20px' }}>
                                        No hay productos en el carrito
                                    </td>
                                </tr>
                            ) : (
                                carrito.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.nombre}</td>
                                        <td className="text-center">${item.precio_unitario.toFixed(2)}</td>
                                        <td className="text-center">{item.cantidad}</td>
                                        <td className="text-right"><strong>${item.subtotal.toFixed(2)}</strong></td>
                                        <td className="text-center">
                                            <button 
                                                type="button" 
                                                onClick={() => quitarDelCarrito(index)} 
                                                className="btn-eliminar-tabla"
                                                style={{ border: 'none', background: 'transparent', color: '#e74c3c', cursor: 'pointer' }}
                                            >
                                                <i className="bi bi-trash"></i> Quitar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="resumen-venta" style={{ marginTop: '20px', padding: '20px', background: '#f1f2f6', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <h2 style={{ margin: 0, color: '#2f3542' }}>Total a Pagar: ${total.toFixed(2)}</h2>
                    </div>
                </div>

                <div className="botones-accion" style={{ marginTop: '30px', display: 'flex', gap: '15px' }}>
                    <button type="submit" className="btn-guardar" style={{ padding: '12px 30px', cursor: 'pointer' }}>
                        <i className="bi bi-printer"></i> Finalizar y Generar Ticket
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate("/panel/ventas")} 
                        className="btn-volver"
                        style={{ padding: '12px 30px', cursor: 'pointer' }}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </section>
    );
}

export default FormularioVenta;