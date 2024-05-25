import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import logo from "../images/logo.png";
// import { logout } from "../actions/userActions";
import { oauth2, authorizateCode, logout } from "../util/oAuth";
import { FaShoppingCart } from "react-icons/fa";
import CartSidebar from "./CartSidebar";
import { persistor } from "../store/";

const Header = () => {
  const { isLogin } = useSelector((state) => state.userLogin);
  useEffect(() => {}, [isLogin]);
  const [show, setShow] = useState(false);

  const logoutHandler = (oEvent) => {
    let txt = oEvent.target.text;
    if (txt == "Ingresar") {
      authorizateCode();
    } else {
      logout();
      persistor.purge();
    }
  };

  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/" className="mr-n4">
            <img src={logo} alt="logo" className="logo-img" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/Contacto">Contacto</Nav.Link>
              {/* {!isLogin ? ( */}
              {/* <Nav.Link eventKey="3" href=""> */}
              {/* Ingresar */}
              {/* </Nav.Link> */}
              {/* ) : ( */}
              <NavDropdown title="Ingresar" id="basic-nav-dropdown">
                {isLogin && (
                  <>
                    <NavDropdown.Item href="/user/myprofile">
                      Perfil
                    </NavDropdown.Item>

                    <NavDropdown.Item href="/order/myorders">
                      Mis Ordenes
                    </NavDropdown.Item>

                    <NavDropdown.Item href="/order/createOrder">
                      Crear orden
                    </NavDropdown.Item>
                  </>
                )}

                <NavDropdown.Item onClick={logoutHandler}>
                  {!isLogin ? "Ingresar" : "Salir"}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  {!isLogin ? "Usuario admininistrador" : "Salir"}
                </NavDropdown.Item>
              </NavDropdown>
              {/* )} */}
            </Nav>
            <Button variant="outline-primary" onClick={() => setShow(!show)}>
              <FaShoppingCart />
            </Button>
          </Navbar.Collapse>
          {show && <CartSidebar show={show} onHide={() => setShow(!show)} />}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
