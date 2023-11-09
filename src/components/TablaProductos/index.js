import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tabla.css";

const TablaProducto = () => {
  const [data, setData] = useState([]);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    detalles: "",
    price: "",
  });

  const endpoint = "http://localhost:3000/Productos/";

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
        detalles: "",
        price: "",
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
      detalles: item.detalles,
      price: item.price,
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
      detalles: "",
      price: "",
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
          required
        />
        <input
          type="text"
          name="detalles"
          placeholder="detalles"
          value={formData.detalles}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="precio"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <button id="bt" type="submit">{formData.id ? "Modificar" : "Agregar"}</button>
      </form>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Detalles</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.detalles}</td>
              <td>{item.price}</td>
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

export default TablaProducto;
