import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/main.css";
import { Spinner, Alert, Container, Card } from "react-bootstrap";
import KomoditiTable from "../components/KomoditiTable";
import Banner from "../components/Banner";

function HomePage() {
  const [hargaData, setHargaData] = useState([]);
  const [tanggalUpdate, setTanggalUpdate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getKomoditi = async () => {
      try {
        const response = await axios.get("http://localhost:5000/komoditi/list");
        if (response.data.success && Array.isArray(response.data.result)) {
          setHargaData(response.data.result);
          setTanggalUpdate(response.data.result[0]?.tanggal);
        } else {
          setError("Data yang diterima tidak sesuai");
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    getKomoditi();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" role="status" />
      </div>
    );
  }
  if (error) return <Alert variant="danger">{error}</Alert>;

  const formattedTanggalUpdate = new Date(tanggalUpdate).toLocaleDateString(
    "id-ID",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <Container>
      <Banner />

      <Container fluid className="custom-container">
        <section className="homepage">
          <h2>Informasi Harga Bahan Pokok dan Barang Penting Terbaru</h2>
          <h6>
            Sumber Data : Dinas Perindustrian, Perdagangan, Energi dan Sumber
            Daya Mineral Kabupaten Garut
          </h6>
        </section>

        <Card className="custom-card">
          <KomoditiTable filteredData={hargaData} />
        </Card>
      </Container>
    </Container>
  );
}

export default HomePage;
