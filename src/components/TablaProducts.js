import axios from "axios";
import { Table } from "react-bootstrap";
import React, { useState, useEffect, useReducer } from "react";
import { deleteProduct,updateProduct } from "../actions/productActions";
import { useSelector, useDispatch } from "react-redux";

const TablaProducts = ({ products }) => {
  const dispatch = useDispatch();
  const eliminarItem = async (item) => {
    console.log(item);
    dispatch(deleteProduct(item.id));
  };

  const editarProduct = (item)=>{
    console.log(item);
    delete item.createdAt;
    delete item.updatedAt;
    dispatch(updateProduct(item))
  }

  return (
    <Table striped bordered hover>
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
        {products.length > 0 &&
          products.map((item, index) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>{item.brand}</td>
              <td>{item.quantity}</td>
              <td>
              <img
                src={item.image}
                alt={item.nombre}
                style={{ width: "80px", height: "auto", padding: "10px" }}
              />
              </td>

              <td>
                <div className="d-flex justify-content-around">
                <button
                  className="btn btn-danger"
                  onClick={() => eliminarItem(item)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => editarProduct(item)}
                >
                  Editar
                </button>
                {/*<Link className="btn btn-info" to={`/detailProduct/${item.id}`}>
                  Editar
          </Link>*/}
                </div>
                
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default TablaProducts;
