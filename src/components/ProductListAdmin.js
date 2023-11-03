import React, { useState, useEffect, useReducer } from "react";
import {  useSelector,useDispatch } from 'react-redux'
import store from '../../src/store'
import axios from "axios";

import {
  Row,
  Container,
  Form,
  Button,
} from "react-bootstrap";
import TablaProducts from "../components/TablaProducts";
import {createProduct,listProducts} from "../actions/productActions";
import { createProductImage } from "../actions/imgActions";

const ProductScreen = ({ onSubmit }) => {
  const [newValue,setNewValue] = useState('');
  const [imageData, setImageData] = useState({ extension: '', base64: '' });

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    quantity: "",
    image: {},
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
  const handleImageUpload = (e) => {
    debugger;
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const extension = file.name.split('.').pop(); // Obtener la extensión del archivo
      const base64 = reader.result; // Obtener el valor base64 de la imagen
      dispatch({type:"IMG_FULL",payload:{"imageFormat":extension,"encodedImage": base64 }})
    };

    if (file) {
      reader.readAsDataURL(file);
    }

   
  };
 
  const allStore = useSelector((state) => state);
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
    //dispatch({type:"PRODUCT_CREATE_SUCCESS",payload:data})
    dispatch(createProduct(data))
    store.subscribe(() => {
      const updatedProductCreate = store.getState().productCreate;
      //creamos un product
      let sId = updatedProductCreate.product.id; 
      if(sId){
        //jalaria el reduer
        dispatch(createProductImage(sId))

      }
      // Aquí puedes hacer lo que quieras con el estado actualizado
      //console.log('Estado productCreate actualizado:', updatedProductCreate);
    });
//   dispatch(listProducts());
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
              onChange={handleImageUpload}
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
