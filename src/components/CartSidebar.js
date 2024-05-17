import React, { useState, useEffect } from "react";
import { Modal, ListGroup, Button, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteItemToShop } from "../store/slice/sliceProduct";
import { useNavigate } from "react-router-dom";

const CartSidebar = ({ show, onHide }) => {
  // const { ItemSelected } = useSelector((state) => state.product);
  const { orderItemsSelected } = useSelector((state) => state.orderSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fun = (id) => {
    console.log(id);
    dispatch(deleteItemToShop(id));
  };
  const ongotoOrder = () => {
    navigate("/order/createOrder");
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Carrito de Compras
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="cart-items">
          <ListGroup>
            {show && orderItemsSelected.length >= 1 ? (
              orderItemsSelected.map((item, index) => (
                <ListGroup.Item key={index}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <Image
                        src={item.image}
                        rounded
                        className="mr-3"
                        style={{ width: "50px" }}
                      />
                      <div>
                        <h6>{item.name}</h6>
                        <p>Cantidad: {item.qtySelect}</p>
                      </div>
                    </div>
                    <Button variant="danger" onClick={() => fun(item.id)}>
                      X
                    </Button>
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <p>No hay items agregados</p>
            )}
          </ListGroup>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Cerrar</Button>
        <Button onClick={ongotoOrder}>Pagar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CartSidebar;
