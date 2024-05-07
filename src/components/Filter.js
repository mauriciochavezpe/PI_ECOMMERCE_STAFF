import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col, ListGroup, Form, Container, Button } from "react-bootstrap";
import { listProducts } from "../actions/productActions";

import { Modal } from "./Modal";
import TodoModal  from "./TodoModal";

const FilterHome = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList); //sacado del store.js

  var {loadingModal} = useSelector((state) => state.product);
  console.log("newReduxtools", loadingModal);

  const [filter, setFilter] = useState({
    name: "",
    brand: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    let arr = Object.keys(filter);
    let obj = {};
    arr.map((e) => {
      if (filter[e] != "") {
        obj[e] = filter[e];
      }
    });

    //añadimos un filtro como obj
    dispatch(listProducts(obj));
  };
  return (
    <>
      <h2>Filtros</h2>
      <Form onSubmit={handleSubmit1}>
        <Row className="dFalign">
          <Col>
            <Form.Group controlId="categoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                as="select"
                name="category"
                onChange={handleInputChange}
              >
                {/* Opciones de categoría */}
                {/* {categoryList.categories.map((e, i) => { */}
                {[
                  {
                    categoria: "",
                  },
                  {
                    categoria: "ACCESORIOS COMPUTACIÓN",
                  },
                  {
                    categoria: "IMPRESORAS",
                  },
                ].map((e, i) => {
                  return (
                    <option key={i} value={e.categoria}>
                      {e.categoria}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="brand">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                as="select"
                name="brand"
                onChange={handleInputChange}
              >
                {/* Opciones de categoría */}
                {/* {categoryList.brands.map((e, i) => { */}

                {[
                  {
                    categoria: "",
                  },
                  {
                    categoria: "ACCESORIOS COMPUTACIÓN",
                  },
                  {
                    categoria: "IMPRESORAS",
                  },
                ].map((e, i) => {
                  return (
                    <option key={i} value={e.brand}>
                      {e.brand}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="name">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={filter.name}
                name="name"
                onChange={handleInputChange}
                placeholder="Nombre"
                defaultValue={filter.name}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="price">
              <Form.Label>Precio</Form.Label>
              <div className="d">
                <Form.Control
                  className="w-10"
                  type="number"
                  name="minPrice"
                  placeholder="min"
                  value={filter.minPrice}
                  onChange={handleInputChange}
                />
                -
                <Form.Control
                  className="w-10"
                  type="number"
                  name="maxPrice"
                  placeholder="max"
                  value={filter.maxPrice}
                  onChange={handleInputChange}
                />
              </div>
            </Form.Group>
          </Col>
          <Col className="h100">
            <Button className="bheight" variant="primary" type="submit">
              Aplicar
            </Button>
            {/* <Button className="bheight" variant="success" onClick={onTestRedux}>
              Aplicar2
            </Button> */}
          </Col>
        </Row>
      </Form>
      {!!loadingModal && 
        <Modal>
          <TodoModal/>
        </Modal>
      }
    </>
  );
};

export default FilterHome;
