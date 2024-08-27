import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/main.css";
import { Spinner, Alert } from "react-bootstrap";
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

  if (loading) return <Spinner animation="border" className="d-flex justify-content-center align-items-center" />;
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
    <>
      <Banner />

      <section className="homepage">
        <h1>Informasi Harga Bahan Pokok Penting Terbaru</h1>
        <p>Sumber Data: DISPERINDAG ESDM KABUPATEN GARUT</p>
        <p>Update per tanggal: {formattedTanggalUpdate}</p>
      </section>

      <section>
        <KomoditiTable filteredData={hargaData} />
      </section>
    </>
  );
}

export default HomePage;
