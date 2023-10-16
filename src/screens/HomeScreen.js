import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Button, Container } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Spinner from "../components/layout/Spinner";
// import Message from '../components/Message'
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomeScreen = ({ match, history }) => {
  const keyword = match?.params?.keyword || "";
  console.log("12321321");

  const pageNumber = match?.params?.pagenumber || 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const allStore = useSelector((state) => state);
  console.log("allStore",allStore)
  const { toast } = cart;

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  console.log(products);

  useEffect(() => {
    dispatch(listProducts());

    if (toast) {
      window.scrollTo(0, 0);
    }
  }, [dispatch, keyword, pageNumber, toast]);

  return (
    <>
      {!keyword && (
        <>
          <ListGroup>
            <ProductCarousel />
          </ListGroup>
        </>
      )}
      {loading ? (
        <Spinner />
      ) : error ? (
        <Spinner />
      ) : (
        // <Message variant='danger' dismissible={false}>
        //  pendiente de carga...
        // </Message>
        <>
          {keyword && products.length > 0 && (
            <>
             
            </>
          )}

          <Container>
          <Row>
            {products.length > 0 ? (
              products
                // .filter((product) => product.published)
                .map((product) => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product={product} 
                    />
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
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
