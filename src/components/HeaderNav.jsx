import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link as RouterLink } from "react-router-dom";
import logo from "../assets/img/LogoBAPOKTINGGarut.png";

const HeaderNav = () => {
  return (
    <div className="sticky-top">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={RouterLink} to="/">
            <img
              src={logo}
              alt="logo"
              width="200"
              height="200"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link
                as={RouterLink}
                to="/"
                className="d-flex align-items-center"
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={RouterLink}
                to="/grafik"
                className="d-flex align-items-center"
              >
                Grafik
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default HeaderNav;
