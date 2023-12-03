import React, { useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Alert, Row, Container, Form, Button } from "react-bootstrap";
import TablaProducts from "../components/TablaProducts";
import { createProduct, listProducts } from "../actions/productActions";



const ProductScreen = ({ onSubmit }) => {
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mostrarAlerta1, setMostrarAlerta1] = useState(false);
  const productDelete = useSelector((state) => state.productDelete); //sacado del store.js
  const productCreate = useSelector((state) => state.productCreate); //sacado del store.js
  const categoryList = useSelector((state) => state.categoryList); //sacado del store.js
  
  //AQuí lo llamo
  var obj = useSelector((state) => state.productDetails); //sacado del store.js
  //const [product, setProduct] = useState({});
  const productList = useSelector((state) => state.productList);
  const dispatch = useDispatch();

  
    const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    quantity: "",
    image: {},
    id:null
  });

  useEffect(() => {
   // setProduct(obj.product);
    dispatch(listProducts());
  }, [dispatch]);

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
    //product={...product, [name]: value}
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const extension = file.name.split(".").pop(); // Obtener la extensión del archivo
      const base64 = reader.result; // Obtener el valor base64 de la imagen
      dispatch({
        type: "IMG_FULL",
        payload: { imageFormat: extension, encodedImage: base64 },
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !product.name ||
      !product.description ||
      !(product.price > 0) ||
      !product.category ||
      !product.brand ||
      !(product.quantity > 0)
    ) {
      setMostrarAlerta1(true);
      return;
    }
    generarSync(product);

    // Resetear el formulario después de enviar
     setProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      brand: "",
      quantity: "",
      image: {},
    });
  };

  const generarSync = (data) => {
    dispatch(createProduct(data));

    setMostrarAlerta(true);
    //ocultar luego de 3seg.
    setTimeout(() => {
      disabledAlert();
    }, 4000);
  };
  const disabledAlert = () => {
    setMostrarAlerta(false);
    setMostrarAlerta1(false);
  };
  return (
    <div>
      {mostrarAlerta1 && (
        <Alert
          variant="danger"
          onClose={() => disabledAlert(false)}
          dismissible
        >
          Completar los campos
        </Alert>
      )}
      {productCreate.false && mostrarAlerta && (
        <Alert
          variant="danger"
          onClose={() => disabledAlert(false)}
          dismissible
        >
          {productCreate.error}
        </Alert>
      )}
      {productCreate.success && mostrarAlerta && (
        <Alert
          variant="success"
          onClose={() => disabledAlert(false)}
          dismissible
        >
          Producto creado exitosamente
        </Alert>
      )}
      {productDelete.loading && (
        <Alert
          variant="success"
          onClose={() => disabledAlert(false)}
          dismissible
        >
          Producto eliminado exitosamente
        </Alert>
      )}

      <Container>
        <h2>Administrador de productos</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del producto"
              name="name"
              value={product.name ||  ""}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Descripción del producto"
              name="description"
              value={product.description || "" }
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
              value={product.price || "" }
              onChange={handleInputChange2}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={handleInputChange}
              value={product.category || "" }
              name="category"
            >
              <option value="">Open this select menu</option>
              {categoryList.categories.map((e, i) => {
                return (
                  <option key={i} value={e.categoria}>
                    {e.categoria}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="brand">
            <Form.Label>Marca</Form.Label>
            <Form.Control
              type="text"
              placeholder="Marca del producto"
              name="brand"
              value={product.brand || "" }
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
              value={product.quantity || "" }
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
          <TablaProducts products={productList.products} />{" "}
        </Row>
      </Container>
    </div>
  );
};

export default ProductScreen;
