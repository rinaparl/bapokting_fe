import React from 'react';
import { Container, Row, Col, Nav, NavItem, NavLink } from 'bootstrap';

function Footer () {
  return (
    <footer className='footer'>
      <Row>
        <Col>
          <div>
            @ {new Date().getFullYear()}{" "}
            DISKOMINFO GARUT
          </div>
        </Col>
      </Row>
    </footer>
  );
}

export default Footer;
