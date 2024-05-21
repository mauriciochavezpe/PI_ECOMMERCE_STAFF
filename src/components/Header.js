import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import logo from "../images/logo.png";
// import { logout } from "../actions/userActions";
import { oauth2, authorizateCode, logout } from "../util/oAuth";
import { FaShoppingCart } from "react-icons/fa";
import CartSidebar from "./CartSidebar";

const Header = () => {
  const { isLogin, userData } = useSelector((state) => state.userLogin);
  useEffect(() => {}, [isLogin]);
  const [show, setShow] = useState(false);

  const handleSelect = (oEvent) => {
    console.log("asdasdsadads");
    if (oEvent == 3) {
    }
    if (oEvent == 4) {
      // oauth2();
    }
  };

  const onUpdateMyUser = () => {};
  const onLogout = () => {};
  const handleCartClick = () => {};

  const userLogin = useSelector((state) => state.userLogin);
  const logoutHandler2 = (oEvent) => {};
  const logoutHandler = (oEvent) => {
    console.log("hola", oEvent.target.text);
    let txt = oEvent.target.text;
    if (txt == "Ingresar") {
      authorizateCode();
    } else {
      logout();
    }

    // dispatch(login());
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
            <Nav onSelect={handleSelect}>
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/Contacto">Contacto</Nav.Link>
              {isLogin ? (
                <Nav.Link eventKey="3" href="">
                  Ingresar
                </Nav.Link>
              ) : (
                <NavDropdown title="Ingresar" id="basic-nav-dropdown">
                  {isLogin && (
                    <NavDropdown.Item href="/user/myprofile">
                      Perfil
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Item onClick={logoutHandler}>
                    {!isLogin ? "Ingresar" : "Salir"}
                  </NavDropdown.Item>
                  {/* <NavDropdown.Item onClick={logoutHandler2}>
                    Salir                 
                  </NavDropdown.Item> */}
                </NavDropdown>
              )}
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
