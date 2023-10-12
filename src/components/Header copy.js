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

  const cart = useSelector((state) => state.cart);
  const { cartItems, toast } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="flex">
          <Nav className="me-auto justify-content-between">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
     {/*
 <Navbar expand="lg" collapseOnSelect>
 <Container>
   <Navbar.Brand href="/" className="mr-n4">
     <img src={logo} alt="logo" className="logo-img" />
      
   </Navbar.Brand>
   <Navbar.Toggle aria-controls="basic-navbar-nav" />

   <Navbar.Collapse
     id="basic-navbar-nav"
   >
     <Nav className="me-auto" >
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
</Navbar>*/
     }
     
    </header>
  );
};

export default Header;
