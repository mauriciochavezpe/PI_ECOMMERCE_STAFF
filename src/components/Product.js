import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Rating from "./Rating";
import AddToCartBtn from "./AddToCartBtn";
import { listProductDetails } from "../actions/productActions";
import { Modal } from "./Modal";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  console.log("productDetails", productDetails);
  const { loading, products } = productDetails;

  var test1 = async (id) => {
    console.log("dasdasd " + id);

    //dispatch(listProductDetails(id));
    // llamar al modulo create-portal ("modals")

  };

  /* useEffect(() => {
    test1()
  }, []);*/

  return (
    <>
      <Card style={{ width: "18rem" }} className="mb-4">
        {/* <Link to={`/product/${product.id}`}> */}
        <Card.Img
          onClick={() => {
            test1(product.id);
          }}
          variant="top"
          style={{ height: "18rem", cursor: "pointer" }}
          src={product.image}
          alt={product.name}
        />
        {/* </Link> */}
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>
            {product.description.length > 30
              ? `${product.description.slice(0, 30)}...`
              : `${product.description}`}
          </Card.Text>
          <Card.Text as="h5" className="mb-3">
            Precio: S/. {product.price}
          </Card.Text>
          <Rating count={2} />
          <AddToCartBtn disabled={product.countInStock === 0} id={product.id} />
        </Card.Body>
      </Card>
      {!loading && (
        <Modal>
          <div> test </div>
        </Modal>
      )}
    </>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Product;
