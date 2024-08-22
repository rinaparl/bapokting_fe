import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Container, Spinner, Alert, Form } from "react-bootstrap";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function KomoditiGraph() {
  const [hargaData, setHargaData] = useState([]);
  const [selectedKomoditi, setSelectedKomoditi] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getKomoditi = async () => {
      try {
        const response = await axios.get("http://localhost:5000/komoditi/list");
        if (response.data.success && Array.isArray(response.data.result)) {
          setHargaData(response.data.result);
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

  const filteredData = hargaData.filter(item => 
    (selectedKomoditi ? item.komoditi_name === selectedKomoditi : true) &&
    (selectedDate ? item.tanggal === selectedDate : true)
  );

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  const data = {
    labels: ["Pasar Guntur", "Pasar Kadungora", "Pasar Cikajang", "Pasar Pameungpeuk", "Pasar Samarang", "Pasar Malangbong"],
    datasets: filteredData.map(item => ({
      label: `${item.komoditi_name} (${item.satuan})`,
      data: [
        item.p_guntur,
        item.p_kadungora,
        item.p_cikajang,
        item.p_pameungpeuk,
        item.p_samarang,
        item.p_malangbong
      ],
      fill: false,
      backgroundColor: "rgba(75,192,192,0.6)",
      borderColor: "rgba(75,192,192,1)"
    })),
  };

  return (
    <Container>
      <Form>
        <Form.Group controlId="komoditiSelect">
          <Form.Label>Pilih Komoditi</Form.Label>
          <Form.Control 
            as="select" 
            value={selectedKomoditi} 
            onChange={(e) => setSelectedKomoditi(e.target.value)}
          >
            <option value="">Semua Komoditi</option>
            {[...new Set(hargaData.map(item => item.komoditi_name))].map(komoditi => (
              <option key={komoditi} value={komoditi}>{komoditi}</option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="dateSelect">
          <Form.Label>Pilih Tanggal</Form.Label>
          <Form.Control 
            type="date" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </Form.Group>
      </Form>

      <Line data={data} />
    </Container>
  );
}

export default KomoditiGraph;
