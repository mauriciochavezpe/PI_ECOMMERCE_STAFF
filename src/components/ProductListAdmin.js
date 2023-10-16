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
import {createProduct} from "../actions/productActions"
const ProductScreen = ({ onSubmit }) => {
  const [newValue,setNewValue] = useState('');

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    quantity: "",
    image: null,
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProduct({ ...product, image: file });
  };
  // const [arrList, setarrList] = useState([]);
  const [items, setItems] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [brand, setBrand] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [imagen, setImagen] = useState("");

  const allStore = useSelector((state) => state.test2);
  const product1 = useSelector((state) => state.createproduct1);
  //console.log("allStore2",product1)
  const dispatch = useDispatch();

  // fn test
  const fnPrueba = ()=>{
    setNewValue("prueba2")
  }

 

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar el formulario o hacer algo con los datos del producto
    console.log(product);
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
    });

    setNombre("");
    setDescripcion("");
    setPrecio(0);
    setCategoria("");
    setBrand("");
    setCantidad(0);
    setImagen("");
  };

  const URL =
    "https://zpje4svosl.execute-api.us-east-1.amazonaws.com/dev/products/";
  const handleSubmit2 = () => {
    // Validar los campos del formulario
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

    // Crear un nuevo objeto con los datos del formulario
    const nuevoItem = {
      name: nombre,
      description: descripcion,
      price: precio,
      category: categoria,
      brand,
      quantity: cantidad,
      image: imagen,
    };

    // Agregar el nuevo item usando la función pasada como prop
    agregarItem(nuevoItem);

    // Limpiar los campos del formulario
    setNombre("");
    setDescripcion("");
    setPrecio(0);
    setCategoria("");
    setBrand("");
    setCantidad(0);
    setImagen("");
  };
  const fetchData = async (data) => {

    dispatch(createProduct())
  };
  useEffect(() => {
    fetchData();
  }, []);

  // "https://cdn.shopify.com/s/files/1/0632/7880/9324/products/IMG-7325616.jpg?v=1663002895

  const agregarItem = async (nuevoItem) => {
    // arrList.push(obj);
    try {
      nuevoItem.image =
        "https://cdn.shopify.com/s/files/1/0632/7880/9324/products/IMG-7325616.jpg?v=1663002895";
      // const response = await axios('/api/items'); // Use the relative path to your API endpoint
      const response = await axios.post(URL, nuevoItem); // Use the relative path to your API endpoint
      const data = await response;
      alert(data.data.message);
      items.push(data.data.product);
      // fetchData();
    } catch (error) {
      console.error(error);
    }

    setProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      quantity: "",
      image: null,
    });
  };
 
  
  return (
    <div>
      <Container>
        <h2>Administrador de productos</h2>
        <h4>El contador esta en : {allStore}</h4>
     
        <Button onClick={()=>{
         
        //hacerlo dinamico
       let ob= {
          "quantity": 10,
          "image": "https://cdn.shopify.com/s/files/1/0632/7880/9324/products/IMG-7325616.jpg?v=1663002895",
          "category": "Electronics",
          "brand": "Example Brand",
          "price": 10.50,
          "description": "This is an example product2",
          "name": "Example Product"
      }
         console.log(dispatch({type:"FILL",payload:ob}))
        
         dispatch(createProduct())
         
          
          
          }}>TEST</Button>
        {/*
           <input placeholder="write something.." 
        value={newValue}
        onChange={(e)=> {  
          
          console.log(e.target.value)}}
        ></input>
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
              type="number"
              placeholder="Precio del producto"
              name="price"
              min={1}
              value={product.price}
              onChange={handleInputChange}
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
        </Form>*/}
      </Container>

      {/*}
            <form className="formulario" onSubmit={handleSubmit}>
              <label className="label1" htmlFor="nombre">
                Nombre:
              </label>
              <input
                className="input1"
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />

              <label className="label1" htmlFor="descripcion">
                Descripción:
              </label>
              <input
                className="input1"
                type="text"
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />

              <label className="label1" htmlFor="precio">
                Precio:
              </label>
              <input
                className="input1"
                type="number"
                id="precio"
                value={precio}
                min="0"
                onChange={(e) => setPrecio(+e.target.value)}
              />

              <label className="label1" htmlFor="categoria">
                Categoría:
              </label>
              <input
                className="input1"
                type="text"
                id="categoria"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              />

              <label className="label1" htmlFor="brand">
                Marca:
              </label>
              <input
                className="input1"
                type="text"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />

              <label className="label1" htmlFor="cantidad">
                Cantidad:
              </label>
              <input
                className="input1"
                type="number"
                id="cantidad"
                min="0"
                value={cantidad}
                onChange={(e) => setCantidad(+e.target.value)}
              />
              <label className="label1" htmlFor="cantidad">
                Imagen:
              </label>
              <input
                className="input1"
                type="file"
                id="img"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
              />

              <button className="button1" type="submit">
                Agregar Producto
              </button>
            </form>*/}

      {/* <TablaProducts products={items} /> </Row> */}
    </div>
  );
};

export default ProductScreen;
