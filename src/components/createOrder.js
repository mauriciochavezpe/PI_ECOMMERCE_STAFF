import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { changeQuanty, createOrder } from "../store/slice/sliceOrder";

const formatterPay = () => {
  console.log("dasdadasda");
};
const OrderCreate = () => {
  const { orderItemsSelected } = useSelector((state) => state.orderSlice);

  const [formData, setFormData] = useState({
    name: "Raul Penilla",
    email: "rpenilla00@gmail.com",
    address: "av. lima - Magdalena",
    paymentMethod: "Credit card",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const dispatch = useDispatch();
  // Obtener la URL actual

  const handleQuantityChange = (productId, e) => {
    const { value } = e.target;
    // Aquí puedes manejar el cambio de cantidad del producto en el carrito
    console.log(`Cambiando cantidad del producto ${productId} a ${value}`);
    dispatch(changeQuanty({ productId, quantity: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let objProd = orderItemsSelected.map((e) => ({
      id: e.id,
      quantity: e.qtySelect,
      subTotal: e.price,
    }));
    let totalPrice = orderItemsSelected
      .reduce((total, item) => total + item.qtySelect * item.price, 0)
      .toFixed(2);
    let objPay = {
      totalPrice: Number(totalPrice),
      products: [...objProd],
    };
    dispatch(createOrder(objPay));
  };
  return (
    <>
      <Container>
        <Row className="justify-content-center mt-3">
          <Col md={3} className="p-2">
            <h2 className="mb-4">Crear Orden</h2>
            <Form onSubmit={handleSubmit} className="order-form">
             {/* <Form.Group controlId="formName">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese su nombre"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Ingrese su email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formAddress">
                <Form.Label>Dirección de Envío</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Ingrese su dirección de envío"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPaymentMethod">
                <Form.Label>Método de Pago</Form.Label>
                <Form.Control
                  as="select"
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione un método de pago</option>
                  <option value="efectivo">Efectivo</option>
                  <option value="tarjeta">Tarjeta de Crédito/Débito</option>
                </Form.Control>
              </Form.Group> */ }
              <Table striped bordered className="product-table">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItemsSelected.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>
                        <Form.Control
                          type="number"
                          value={item.qtySelect}
                          onChange={(e) => handleQuantityChange(item.id, e)}
                          min={1}
                        />
                      </td>
                      <td>{item.price}</td>
                      <td>{(item.qtySelect * item.price).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="text-right mb-3">
                <strong>Total a Pagar:</strong>{" "}
                {orderItemsSelected
                  .reduce(
                    (total, item) => total + item.qtySelect * item.price,
                    0
                  )
                  .toFixed(2)}
              </div>
              <Button variant="primary" type="submit" className="submit-btn">
                Crear Orden
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderCreate;
