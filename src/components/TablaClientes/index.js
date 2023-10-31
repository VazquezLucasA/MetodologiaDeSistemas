import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tabla.css";

const TablaClientes = () => {
  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    dni: "",
    phoneNumber: "",
    instagramUser: "",
    address: "",
  });

  const endpoint = "http://localhost:3000/Clientes/";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(endpoint);
      setData(response.data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await axios.put(endpoint + `${formData.id}`, formData);
      } else {
        await axios.post(endpoint, formData);
      }
      setFormData({
        id: null,
        name: "",
        dni: "",
        phoneNumber: "",
        instagramUser: "",
        address: "",
      });
      fetchData();
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      name: item.name,
      dni: item.dni,
      phoneNumber: item.phoneNumber,
      instagramUser: item.instagramUser,
      address: item.address,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(endpoint + `${id}`);
      fetchData();
    } catch (error) {
      console.error("Error al eliminar datos:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      id: null,
      name: "",
      dni: "",
      phoneNumber: "",
      instagramUser: "",
      address: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="dni"
          placeholder="DNI"
          value={formData.dni}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Número de teléfono"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="instagramUser"
          placeholder="Usuario de Instagram"
          value={formData.instagramUser}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          value={formData.address}
          onChange={handleInputChange}
        />
        <button id="bt" type="submit">{formData.id ? "Modificar" : "Agregar"}</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Numero cel</th>
            <th>Usuario de IG</th>
            <th>Direccion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.dni}</td>
              <td>{item.phoneNumber}</td>
              <td>{item.instagramUser}</td>
              <td>{item.address}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Modificar</button>
                <button onClick={() => handleDelete(item.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button id="bt" type="button" onClick={handleCancel}>
        Cancelar
      </button>
    </div>
  );
};

export default TablaClientes;
