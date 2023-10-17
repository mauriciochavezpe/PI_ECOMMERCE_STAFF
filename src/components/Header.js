import { useSelector, useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import logo from "../images/logo.png";
import CartToast from "./CartToast";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  //const cart = useSelector((state) => state.cart);

  const userLogin = useSelector((state) => state.userLogin);
  const logoutHandler = () => {
    dispatch(logout());
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
              <Nav.Link href="home">Home</Nav.Link>
              <Nav.Link href="Contacto">Contacto</Nav.Link>
              <NavDropdown title="Guest" id="basic-nav-dropdown">
                <NavDropdown.Item href="/admin/orders">Perfil</NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  Salir
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
