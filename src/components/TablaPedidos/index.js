import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tabla.css";
import { useNavigate } from "react-router-dom";

const TablaPedidos = () => {
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const endpoint = "http://localhost:3000/Pedidos/";
  const [data2, setData2] = useState([]);
  const [Search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
    buscar(e.target.value);
  };

  const buscar = (busqueda) => {
    var resultados = data2.filter((pedido) => {
      const clienteNombre = pedido.cliente?.toLowerCase() || "";
      const productosNombres = pedido.productos?.toLowerCase() || "";
      const monto = pedido.monto?.toLowerCase() || "";

      return (
        clienteNombre.includes(busqueda.toLowerCase()) ||
        productosNombres.includes(busqueda.toLowerCase()) ||
        monto.includes(busqueda.toLowerCase())
      );
    });
    setData(resultados);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(endpoint);
      const pedidosWithClienteAndProductos = await Promise.all(
        response.data.map(async (pedido) => {
          const clienteResponse = await axios.get(
            `http://localhost:3000/Clientes/${pedido.clienteId}`
          );
          const productosResponse = await Promise.all(
            pedido.productos.map(async (producto) => {
              const productoInfo = await axios.get(
                `http://localhost:3000/Productos/${producto.id}`
              );
              return productoInfo.data;
            })
          );
          return {
            ...pedido,
            cliente: clienteResponse.data.name,
            productos: productosResponse
              .map((producto) => producto.name)
              .join(", "),
            monto: productosResponse
              .reduce(
                (total, producto) => total + parseFloat(producto.price),
                0
              )
              .toFixed(2),
          };
        })
      );
      setData(pedidosWithClienteAndProductos);
      setData2(pedidosWithClienteAndProductos);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const handleEliminarPedido = async (id) => {
    try {
      await axios.delete(`${endpoint}${id}`);
      fetchData();
    } catch (error) {
      console.error("Error al eliminar pedido:", error);
    }
  };

  const handleMarcarEntregado = async (id) => {
    try {
      const response = await axios.get(`${endpoint}${id}`);
      const pedido = response.data;
      pedido.entregado = true;
      await axios.put(`${endpoint}${id}`, pedido);
      fetchData();
    } catch (error) {
      console.error("Error al marcar como entregado:", error);
    }
  };

  return (
    <div>

      <input
        type="text"
        value={Search}
        placeholder="Buscar"
        onChange={handleChange}
      />
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Detalle</th>
            <th>Monto</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.cliente}</td>
              <td>{item.productos}</td>
              <td>{item.monto}</td>
              <td
                className={
                  item.entregado ? "entregado-verde" : "entregado-rojo"
                }
              >
                {item.entregado ? "Entregado" : "Pendiente"}
              </td>
              <td>
                <button onClick={() => handleEliminarPedido(item.id)}>
                  Eliminar
                </button>
                {!item.entregado && (
                  <button onClick={() => handleMarcarEntregado(item.id)}>
                    Entregado
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type="button" onClick={() => Navigate("/Pedidos/Agregar")}>
        Agregar Pedidos
      </button>
    </div>
  );
};

export default TablaPedidos;
