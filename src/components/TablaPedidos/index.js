import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Tabla.css";

const TablaPedidos = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: "" });
  const endpoint = 'http://localhost:3000/Productos/'

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
        // Actualizar datos si formData tiene un ID
        await axios.put(endpoint+`${formData.id}`, formData);
      } else {
        // Crear nuevos datos si formData no tiene un ID
        await axios.post(endpoint, formData);
      }
      // Limpiar el formulario después de la operación
      setFormData({ id: null, name: "" });
      // Volver a cargar los datos después de la operación
      fetchData();
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  };

  const handleEdit = (item) => {
    // Rellenar el formulario con los datos del item seleccionado para la modificación
    setFormData({ id: item.id, name: item.name });
  };

  const handleDelete = async (id) => {
    try {
      // Eliminar datos según el ID
      await axios.delete(endpoint+`${id}`);
      // Volver a cargar los datos después de la operación
      fetchData();
    } catch (error) {
      console.error("Error al eliminar datos:", error);
    }
  };

  return (
    <div>
      <label>Buscar: </label>
      <input></input>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleInputChange}
        />
        <button type="submit">{formData.id ? "Modificar" : "Agregar"}</button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Detalle</th>
            <th>Monto</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={() => handleEdit(item)}>Modificar</button>
                <button onClick={() => handleDelete(item.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaPedidos;
