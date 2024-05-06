import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Form, Container, Button } from "react-bootstrap";
import Product from "../components/Product";
//import { listProducts } from "../actions/productActions";
import { getAllProducts } from "../store/slice/product";

import Spinner from "../components/layout/Spinner";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import FilterHome from "../components/Filter";

const HomeScreen = ({ match, history }) => {
  // const keyword = match?.params?.keyword || "";

  // const pageNumber = match?.params?.pagenumber || 1;

  const allStore = useSelector((state) => state.product);
  console.log("allStore", allStore);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  // const allStore = useSelector((state) => state);

  const productList = useSelector((state) => state.product.products);
  // const { loading, error, products, pages, page } = productList;
  const categoryList = useSelector((state) => state.categoryList); //sacado del store.js

  useEffect(() => {
    // dispatch(listProducts());
    dispatch(getAllProducts());
  }, [dispatch]);

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
      ) : error ? (
        <Spinner />
      ) : (
        // <Message variant='danger' dismissible={false}>
        //  pendiente de carga...
        // </Message>
        <>
          <Container>
            <Row>
              {
              productList.length > 0 ? (
                // {products.length > 0 ? (
                // products.map((product) => (
                  productList.map((product) => (
                  <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} />
                  </Col>
                ))
              ) : (
                <>
                  <h3 className="mr-3">
                    <span
                      style={{ color: "#AAAAAA" }}
                      className="link"
                      onClick={() => history.push("/")}
                    ></span>
                  </h3>
                </>
              )}
            </Row>
          </Container>
          {/* <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          /> */}
        </>
      )}
    </>
  );
};

export default HomeScreen;
