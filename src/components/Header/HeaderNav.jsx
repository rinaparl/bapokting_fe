import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link as RouterLink } from 'react-router-dom';
import logo from '../../assets/img/LogoBAPOKGarut.png';
import "../../dist/css/main.css"

const HeaderNav = () => {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={RouterLink} to="/">
            <img
              src={logo}
              alt="logo"
              width="100"
              height="100"
              className="d-inline-block align-top"
            />
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={RouterLink} to="/">Home</Nav.Link>
              <Nav.Link as={RouterLink} to="/statistik">Statistik</Nav.Link>
            </Nav>

            <Nav>
              <Nav.Link as={RouterLink} to="/login">
                Login
              </Nav.Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default HeaderNav;
