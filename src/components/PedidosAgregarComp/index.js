import React, { useState, useEffect } from "react";
import axios from "axios";

const PedidosAgregarComp = () => {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("");
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [productosAgregados, setProductosAgregados] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const endpointClientes = "http://localhost:3000/Clientes/";
  const endpointProductos = "http://localhost:3000/Productos/";

  useEffect(() => {
    fetchData(endpointClientes, setClientes);
    fetchData(endpointProductos, setProductos);
  }, []);

  const fetchData = async (endpoint, setData) => {
    try {
      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const handleAgregarProducto = () => {
    if (clienteSeleccionado && productoSeleccionado) {
      const producto = productos.find(
        (prod) => prod.id === parseInt(productoSeleccionado)
      );
      setProductosAgregados([...productosAgregados, producto]);
      setProductoSeleccionado("");
    } else {
      setMensaje("Por favor, selecciona un cliente y un producto.");
    }
  };

  const handleConfirmarPedido = async () => {
    try {
      await axios.post("http://localhost:3000/Pedidos/", {
        clienteId: parseInt(clienteSeleccionado),
        productos: productosAgregados,
        entregado: false,
      });
      setMensaje("Pedido agregado correctamente.");
      setProductosAgregados([]);
    } catch (error) {
      console.error("Error al agregar pedido:", error);
    }
  };

  return (
    <div>
      <h2>Agregar Pedido</h2>
      <div>
        <label>Cliente:</label>
        <select
          value={clienteSeleccionado}
          onChange={(e) => setClienteSeleccionado(e.target.value)}
        >
          <option value="">Selecciona un cliente</option>
          {clientes.map((cliente) => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Producto:</label>
        <select
          value={productoSeleccionado}
          onChange={(e) => setProductoSeleccionado(e.target.value)}
        >
          <option value="">Selecciona un producto</option>
          {productos.map((producto) => (
            <option key={producto.id} value={producto.id}>
              {producto.name}
            </option>
          ))}
        </select>
        <button id="bt" onClick={handleAgregarProducto}>Agregar Producto</button>
      </div>
      <div>
        <h3>Productos Agregados:</h3>
        <ul>
          {productosAgregados.map((producto) => (
            <li key={producto.id}>{producto.name}</li>
          ))}
        </ul>
      </div>
      {mensaje && <p>{mensaje}</p>}
      <button id="bt" onClick={handleConfirmarPedido}>Confirmar Pedido</button>
    </div>
  );
};

export default PedidosAgregarComp;
