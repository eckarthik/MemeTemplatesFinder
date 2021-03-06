import { Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
const MainHeader = () => {
  const authContext = useContext(AuthContext);
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="px-4"
    >
      <Navbar.Brand href="/">Meme Finder</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/top">
            Top Templates
          </Nav.Link>
          <Nav.Link eventKey={2} as={Link} to="/dank">
            Dank memes
          </Nav.Link>
        </Nav>
        {!authContext.isLoggedIn && (
          <Nav>
            <Nav.Link as={Link} to="/login">
              <Button variant="outline-info">Login</Button>
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              <Button variant="outline-danger">Sign Up</Button>
            </Nav.Link>
          </Nav>
        )}
        {authContext.isLoggedIn && authContext.firstName && (
          <Nav>
            <Navbar.Text style={{color:"white",paddingTop:"15px"}}>
              Hello {authContext.firstName + " " + authContext.lastName}
            </Navbar.Text>
            <Nav.Link as={Link} to="/signup">
              <Button variant="outline-danger" onClick={() => authContext.logout()}>Logout</Button>
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainHeader;
