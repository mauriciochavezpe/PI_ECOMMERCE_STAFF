import React, { useState, useEffect, useReducer } from "react";
import {  useSelector,useDispatch } from 'react-redux'

import axios from "axios";
import {
  Row,
  Col,
  Image,
  Container,
  Card,
  Form,
  Button,
} from "react-bootstrap";
import TablaProducts from "../components/TablaProducts";
import {createProduct} from "../actions/productActions";
import { listProducts } from "../actions/productActions";

const ProductScreen = ({ onSubmit }) => {
  const [newValue,setNewValue] = useState('');

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    quantity: "",
    image: "https://cdn.shopify.com/s/files/1/0632/7880/9324/products/IMG-7325616.jpg?v=1663002895"    ,
  });
  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    // Validar que solo se ingresen números y un solo punto decimal
    if (/^\d*\.?\d*$/.test(value)) {
      setProduct({ ...product, [name]: value });
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });
  };
  // const [arrList, setarrList] = useState([]);
 
  const allStore = useSelector((state) => state);
  const product1 = useSelector((state) => state.productCreate.product);
  const productList = useSelector((state) => state.productList);

  console.log("allStore",allStore);
  console.log("productList",productList.products);
  const dispatch = useDispatch();

 
  useEffect(() => {
    dispatch(listProducts());
 
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar el formulario o hacer algo con los datos del producto
    console.log(product)
    generarSync(product);
    /*
    if (
      !nombre ||
      !descripcion ||
      !(precio > 0) ||
      !categoria ||
      !brand ||
      !(cantidad > 0) ||
      !imagen
    ) {
      alert("Por favor, completa todos los campos");
      return;
    }
    // Resetear el formulario después de enviar
    setProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      quantity: "",
      image: null,
    });*/
  };

  const generarSync = (data)=> {
    dispatch({type:"PRODUCT_CREATE_SUCCESS",payload:data})
    dispatch(createProduct())
    dispatch(listProducts());
  }
  return (
    <div>
      <Container>
        <h2>Administrador de productos</h2>
       
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del producto"
              name="name"
              value={product.name}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Descripción del producto"
              name="description"
              value={product.description}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Precio del producto"
              name="price"
              min={1}
              value={product.price}
              onChange={handleInputChange2}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              type="text"
              placeholder="Categoría del producto"
              name="category"
              value={product.category}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="brand">
            <Form.Label>Marca</Form.Label>
            <Form.Control
              type="text"
              placeholder="Marca del producto"
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="quantity">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Cantidad del producto"
              name="quantity"
              min={0}
              value={product.quantity}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="image">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handleFileChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Crear Producto
          </Button>
        </Form>
            
  <Row>
    <TablaProducts products={productList.products} /> </Row>
      </Container>

  
    </div>
  );
};

export default ProductScreen;
