import React from 'react';
import Tabel from '../components/KomoditiTable';
import Banner from '../components/Banner';
import { Container } from 'react-bootstrap';


function HomePage() {

    return (
      <Container>
        <section>
          <Banner />
        </section>
        <h1>Informasi Harga Bahan Pokok Penting Terbaru</h1>
        <h3>Sumber Data : DISPERINDAG ESDM KABUPATEN GARUT</h3>
        
          <Tabel />
      </Container>
    );
  }

export default HomePage;
