import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TablaProducts = ({ products }) => {
  const eliminarItem = async (item) => {
    console.log(item);

    try {
      const URL =
        "https://zpje4svosl.execute-api.us-east-1.amazonaws.com/dev/products/" +
        item.id;
      const response = await axios.delete(URL);
      console.log(response.data); // Handle the response as needed
      alert(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };
 return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Precio</th>
          <th>Categoría</th>
          <th>Marca</th>
          <th>Cantidad</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item, index) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.price}</td>
            <td>{item.category}</td>
            <td>{item.brand}</td>
            <td>{item.quantity}</td>
            <img src={item.image} alt={item.nombre} style={{ width: '80px', height: 'auto', padding:'10px' }} />
       
            <td>
              <button
                className="btn btn-danger"
                onClick={() => eliminarItem(item)}
              >
                Eliminar
              </button>
              <Link className="btn btn-info" to={`/detailProduct/${item.id}`}>
                Ver
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaProducts;
