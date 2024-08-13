import { Container, Nav, Navbar, Button, Form } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut, onSearchMovie }) => {
  const userId = user ? user._id : null;

  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/movies">
          <h1>MovieMate</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
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
                <div className="navbar-search-container">
            <Form className="d-flex search-form" onSubmit={(e) => e.preventDefault()}>
            <Form.Control
              type="search"
              placeholder="Search for Movies"
              className=""
              aria-label="Search"
              onChange={onSearchMovie}
            />
          </Form>
          </div>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
