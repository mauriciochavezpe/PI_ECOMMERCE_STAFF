import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import logo from "../images/logo.png";
import { logout } from "../actions/userActions";
import oauth2 from "../util/oAuth";

const Header = () => {
  const dispatch = useDispatch();
  //const cart = useSelector((state) => state.cart);

  //Cargamos las variables
  const apiKey = process.env.REACT_APP_API_URL;
  const client_id = process.env.REACT_APP_client_id;
  const redirect_uri = process.env.REACT_APP_redirect_uri;
  const response_type = process.env.REACT_APP_response_type;

  const handleSelect = (oEvent) => {
    console.log(oEvent);
    if (oEvent == 3) {
      window.location.href = `https://pi-be-customers-domain.auth.us-east-1.amazoncognito.com/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`;
    }
    if (oEvent == 4) {
      oauth2();
    }
  };

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
            <Nav onSelect={handleSelect}>
              <Nav.Link href="home">Home</Nav.Link>
              <Nav.Link href="Contacto">Contacto</Nav.Link>
              <Nav.Link eventKey="3" href="">
                Ingresar
              </Nav.Link>
              <Nav.Link eventKey="4" href="">
                TEST oAuth2
              </Nav.Link>
              {/* <NavDropdown title="Ingresar" id="basic-nav-dropdown">
                <NavDropdown.Item href="/admin/orders">Perfil</NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  Salir
                </NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
