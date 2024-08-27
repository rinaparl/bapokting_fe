import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link as RouterLink } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import logo from "../assets/img/LogoBAPOKGarut.png";

const HeaderNav = () => {
  return (
    <div className="sticky-top">
      <Navbar expand="lg">
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
              <Nav.Link as={RouterLink} to="/grafik">Grafik</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link as={RouterLink} to="/login" className="d-flex align-items-center">
                <FaSignInAlt className="icon-login" />
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
