import React from "react";
import "../styles/main.css";
import { Container, Row, Col, Nav, NavLink } from "react-bootstrap";

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col xs={12} md={4} className="mb-4">
            <h2 className="footer-title">BAPOKTING Garut</h2>
            <p className="footer-description">
              BAPOKTING Garut merupakan website yang berguna untuk memudahkan
              masyarakat melihat Informasi Harga Bahan Kebutuhan Pokok
              Masyarakat dan Barang Penting Lainnya di pasar-pasar yang ada di
              Kabupaten Garut.
            </p>
          </Col>
          <Col xs={12} md={4} className="mb-4">
            <Nav className="flex-column fs-5 footer-links">
              <h4 className="footer-title">Useful Links</h4>
              <NavLink href="/">Home</NavLink>
              <NavLink href="/grafik">Grafik</NavLink>
            </Nav>
          </Col>
          <Col xs={12} md={4} className="mb-4">
            <h4 className="footer-title">Hubungi Kami</h4>
            <p className="footer-description">
              Bidang Penyelenggara Statistik Sektoral
            </p>
            <p className="footer-description">
              Dinas Komunikasi dan Informatika Kabupaten Garut
            </p>
            <p className="footer-description">
              Jalan Pembangunan No.181, Ke. Sukahalih Tarogong Kidul
            </p>
            <p className="footer-description">
              Email: statistik.diskomgrt@gmail.com
            </p>
          </Col>
        </Row>
        <div className="custom-line"></div>

        <Row className="text-center py-3">
          <Col>
            &copy; {new Date().getFullYear()} Bahan Pokok Garut. DISKOMINFO
            GARUT
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
