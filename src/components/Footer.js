import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logo from "../images/logo.png";

 const Footer = () => {
  return (
    <footer className="bg-light py-5">
      <Container>
        <Row>
          <Col md={3}>
            <a href="/" className="d-flex align-items-center text-dark mb-4">
              <img src={logo} alt="logo" className="logo-img " />
            </a>
            <p>
              We are creating High-Quality Resources and tools to Aid developers during the
              development of their projects.
            </p>
            <div className="d-flex">
              <a href="/" className="text-dark me-3">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="/" className="text-dark me-3">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="/" className="text-dark">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </Col>
          <Col md={3}>
            <h5 className="mb-4 font-weight-bold">Devwares</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/">Resources</a>
              </li>
              <li>
                <a href="/">About Us</a>
              </li>
              <li>
                <a href="/">Contact</a>
              </li>
              <li>
                <a href="/">Blog</a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 className="mb-4 font-weight-bold">Help</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/">Support</a>
              </li>
              <li>
                <a href="/">Sign Up</a>
              </li>
              <li>
                <a href="/">Sign In</a>
              </li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 className="mb-4 font-weight-bold">Products</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/">Windframe</a>
              </li>
              <li>
                <a href="/">Loop</a>
              </li>
              <li>
                <a href="/">Contrast</a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-4">
            <small className="text-muted">&copy; Devwares, 2023. All rights reserved.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default Footer;
