import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut }) => {
  const userId = user ? user._id : null;

  return (
    <Navbar expand="false">
      <Container>
        <Navbar.Brand as={Link} to="/movies">
          <h1>MovieMate</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login">
                    Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                    Signup
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/movies">
                    Movies
                </Nav.Link>
                <Nav.Link as={Link} to={`/users/${userId}`}>
                    Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>
                    Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
