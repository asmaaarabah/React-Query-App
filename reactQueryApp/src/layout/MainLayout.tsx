import { NavLink } from "react-router-dom";

import { Outlet } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";

const MainLayout = () => {
  return (
    <Container>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">React-Query-App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/create">
                New Post
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="mt-5">
        <Outlet />
      </div>
    </Container>
  );
};

export default MainLayout;
