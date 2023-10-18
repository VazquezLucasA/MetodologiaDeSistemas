import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Productos from "../pages/Productos";
import Clientes from "../pages/Clientes";
import AgregarPedidos from "../pages/AgregarPedidos";

const RouterApp = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />

        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<Register />} />

        <Route path="/Pedidos" element={<Home/>} />
        <Route path="/Pedidos/Agregar" element={<AgregarPedidos/>} />
        <Route path="/Productos" element={<Productos/>} />
        <Route path="/Clientes" element={<Clientes />} />

      </Routes>
    </BrowserRouter>
  );
};

export default RouterApp;


