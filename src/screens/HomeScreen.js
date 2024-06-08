import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Form, Container, Button } from "react-bootstrap";
import Product from "../components/Product";
import { getAllProducts, changeLoadingModal } from "../store/slice/sliceProduct";
import Spinner from "../components/layout/Spinner";
import ProductCarousel from "../components/ProductCarousel";
import FilterHome from "../components/Filter";


const HomeScreen = ({  history }) => {
  const dispatch = useDispatch();
  const { loading, loadingModal, products, error } = useSelector(
    (state) => state.productSlice
  );
 

  const onToggle = (id) => {
    dispatch(changeLoadingModal(id));

  };

  useEffect(() => {
    // dispatch(getAllProducts());
  }, []);

  return (
    <>
      <ListGroup>
        <ProductCarousel />
      </ListGroup>
      <Container>
        <Row>
          <FilterHome></FilterHome>
        </Row>
      </Container>

      {loading ? (
        <Spinner />
      )  : (
        <>
          <Container>
            <p>Panel administrador</p>
          </Container>
       
          
        </>
      )}
    </>
  );
};

export default HomeScreen;
