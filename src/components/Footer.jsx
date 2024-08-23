import React from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink } from 'react-bootstrap';

function Footer () {
  return (
    <footer className='footer'>
      <Row>
        <Col>
          <div>
            &copy; {new Date().getFullYear()}{" "}
            Bahan Pokok Garut. DISKOMINFO GARUT
          </div>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
