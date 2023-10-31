import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
// import CrudApp from "../../components/TablaProductos";
// import TablaPedidos from "../../components/TablaPedidos";
import PedidosAgregarComp from "../../components/PedidosAgregarComp";

const AgregarPedidos = () => {
  const navigate = useNavigate();
  return (
    <div className="grid-layout">
      <div className="header"></div>
      <div className="nav">
        <div className="ContenedorBotones">
          <button 
            className="BotonPrincipal"
            onClick={() => navigate(`/Clientes/`)}
          >
            <h2>Clientes</h2>
          </button>
          <button
            className="BotonPrincipal"
            onClick={() => navigate(`/Pedidos`)}
          >
            <h2>Pedidos</h2>
          </button>
          <button
            className="BotonPrincipal"
            onClick={() => navigate(`/Productos/`)}
          >
            <h2>Productos</h2>
          </button>
        </div>
      </div>
      <div className="main">
        <PedidosAgregarComp />
        <div className="contenedor"></div>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default AgregarPedidos;
