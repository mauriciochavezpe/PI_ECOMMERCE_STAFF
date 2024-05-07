import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Modal } from "react-bootstrap";

const TodoModal = ({ onToggle, isOpen }) => {
  const product = useSelector((state) => state.product.product);

  console.log(product);
  return (
    <Modal show={isOpen} onHide={onToggle}>
      <Modal.Header closeButton>
        <Modal.Title>Detalle del Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card.Img
          variant="top"
          style={{ height: "18rem", cursor: "pointer" }}
          src={product.image}
          alt={product.name}
        />
        <p>Categoría: {product.category}</p>
        <p>Marca: {product.brand}</p>
        <p>Nombre: {product.name}</p>
        <p>Precio: S/. {product.price}</p>
        {/* Agrega más detalles del producto aquí si es necesario */}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            onToggle("");
          }}
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

TodoModal.propTypes = {
  onToggle: PropTypes.object.isRequired,
  isOpen: PropTypes.object.isRequired,
};

export default TodoModal;
