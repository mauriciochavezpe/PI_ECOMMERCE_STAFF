import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Alert, Row, Container, Form, Button, Table } from "react-bootstrap";
import { createProduct, deleteProduct } from "../actions/productActions";
import {
  getAllUser,
  // deleteProducts,
  // updateProducts,
  // downloadReports
} from "../store/slice/sliceUserNew";

const UserNew = () => {
  const { userList} = useSelector(
    (state) => state.userNewSlice
  );

  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mostrarAlerta1, setMostrarAlerta1] = useState(false);
  const dispatch = useDispatch();
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  const handleInputChange2 = (e) => {
    const { name, value } = e.target;
    // Validar que solo se ingresen números y un solo punto decimal
    if (/^\d*\.?\d*$/.test(value)) {
      // setProduct({ ...product, [name]: value });
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // setProduct({ ...product, [name]: value });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !description ||
      !(price > 0) ||
      !category ||
      !brand ||
      !(quantity > 0)
    ) {
      setMostrarAlerta1(true);
      return;
    }
    let obj = {
      name: name,
      description: description,
      price: price,
      category: category,
      brand: brand,
      quantity: quantity,
      id: id,
      image: image,
    };
    await generarSync(obj);
    fillInputs();
  };

  const generarSync = async (data = "") => {
    if (data) {
      dispatch(createProduct(data));

      setMostrarAlerta(true);
      //ocultar luego de 3seg.
      setTimeout(() => {
        disabledAlert();
      }, 4000);
    }
  };
  const disabledAlert = () => {
    setMostrarAlerta(false);
    setMostrarAlerta1(false);
  };
  const eliminarItem = async (item) => {
    console.log(item);
    dispatch(deleteProduct(item.id));
  };
  const fillInputs = (item = {}) => {
    setBrand(item.brand || "");
    setCategory(item.category || "");
    setDescription(item.description || "");
    setPrice(item.price || "");
    setName(item.name || "");
    setQuantity(item.quantity || "");
    setId(item.id || "");
    setImage(item.image || "");
  };
  const editarProduct = (item) => {
    console.log(item);

    fillInputs(item);
  };
  return (
    <div>
       

      <Container>
        <h2>Lista de usuarios en el sistmea</h2>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nombre del producto"
              name="name"
              value={name || ""}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Descripción del producto"
              name="description"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Precio del producto"
              name="price"
              min={1}
              value={price || ""}
              onChange={(e) => setPrice(e.target.value)}
            />
            {/*onChange={handleInputChange2}*/}
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setCategory(e.target.value)}
              value={category || ""}
              name="category"
            >
              <option value="">Seleccione una categoria</option>
              {/* {categoryList.categories.map((e, i) => {
                return (
                  <option key={i} value={e.categoria}>
                    {e.categoria}
                  </option>
                );
              })} */}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="brand">
            <Form.Label>Marca</Form.Label>
            <Form.Select
              name="brand"
              value={brand || ""}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="">Seleccione una marca</option>
           
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="quantity">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              placeholder="Cantidad del producto"
              name="quantity"
              min={0}
              value={quantity || ""}
              onChange={(e) => setQuantity(e.target.value)}
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
      
          {/* <TablaProducts products={productList.products} />*/}
          <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Group</th>
              <th>Document Type</th>
              <th>Document ID</th>
              <th>Address</th>
              <th>Department</th>
              <th>Province</th>
              <th>District</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user) => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.group}</td>
                <td>{user.documentType}</td>
                <td>{user.documentId}</td>
                <td>{user.address}</td>
                <td>{user.department}</td>
                <td>{user.province}</td>
                <td>{user.district}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>{new Date(user.updatedAt).toLocaleString()}</td>
                <td>
                  <Button variant="primary" className="mr-2">View</Button>
                  <Button variant="secondary">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        </Row>
      </Container>
    </div>
  );
};

export default UserNew;
