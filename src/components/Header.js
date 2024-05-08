import { useSelector, useDispatch } from "react-redux";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import logo from "../images/logo.png";
import { logout } from "../actions/userActions";
import { oauth2, authorizateCode } from "../util/oAuth";

const Header = () => {
  const dispatch = useDispatch();
  const { isLogin,userData } = useSelector((state) => state.userLogin);
  console.log("isLogin", isLogin);
  console.log("userData", userData);
  //Cargamos las variables

  const handleSelect = (oEvent) => {
    console.log(oEvent);
    if (oEvent == 3) {
      authorizateCode();
    }
    if (oEvent == 4) {
      oauth2();
    }
  };
  const onUpdateMyUser=()=>{

  }
  const onLogout=()=>{

  }

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
              {!isLogin ? (
                <Nav.Link eventKey="3" href="">
                  Ingresar
                </Nav.Link>
                
              ) : (
                <NavDropdown title="Ingresar" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/admin/orders">
                    Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Salir
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              <NavDropdown title="" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={onUpdateMyUser}>
                    Perfil
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={onLogout}>
                    Salir
                  </NavDropdown.Item>
                </NavDropdown>

              {/* <Nav.Link eventKey="4" href="">
                TEST oAuth2
              </Nav.Link> */}

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
