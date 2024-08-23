import React, { useEffect, useState } from "react";
import axios from "axios";
import "../dist/css/main.css";
import { Table, Spinner, Alert, Row, Col, Container } from "react-bootstrap";
import SearchBar from "../components/Tabel/SearchBar";
import FilterBar from "../components/Tabel/FilterBar";
import DateFilter from "../components/Tabel/DateFilter";

function KomoditiTable() {
  const [hargaData, setHargaData] = useState([]);
  const [tanggalUpdate, setTanggalUpdate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filterKet, setFilterKet] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const getKomoditi = async () => {
      try {
        const response = await axios.get("http://localhost:5000/komoditi/list");
        if (response.data.success && Array.isArray(response.data.result)) {
          setHargaData(response.data.result);
          setTanggalUpdate(response.data.result[0]?.tanggal);
          setFilteredData(response.data.result);
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

  useEffect(() => {
    const filtered = hargaData
      .filter((item) =>
        item.komoditi_name.toLowerCase().includes(keyword.toLowerCase())
      )
      .filter((item) => (filterKet && filterKet !== "all" ? item.keterangan === filterKet : true))
      .filter((item) => (selectedDate ? item.tanggal === selectedDate : true));
    setFilteredData(filtered);
  }, [keyword, filterKet, selectedDate, hargaData]);

  const keywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  if (loading) return <Spinner animation="border" />;
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
      <Row className="mb-3">
        <Col>
          <h4>Harga per tanggal: {formattedTanggalUpdate}</h4>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <SearchBar keyword={keyword} keywordChange={keywordChange} />
        </Col>
        <Col md={4}>
          <FilterBar filterKet={filterKet} setFilterKet={setFilterKet} /> {/* Pastikan setFilterKet dioper dengan benar */}
        </Col>
        <Col md={4}>
          <DateFilter
            selectedDate={selectedDate}
            handleDateChange={setSelectedDate}
          />
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="sticky-column">No</th>
            <th className="sticky-column">Komoditi</th>
            <th className="sticky-column">Satuan</th>
            <th>Pasar Guntur</th>
            <th>Pasar Kadungora</th>
            <th>Pasar Cikajang</th>
            <th>Pasar Pameungpeuk</th>
            <th>Pasar Samarang</th>
            <th>Pasar Malangbong</th>
            <th>Rata-Rata Minggu Ini</th>
            <th>Rata-Rata Minggu Lalu</th>
            <th>Keterangan</th>
            <th>%</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={item.id}>
                <td className="sticky-column">{index + 1}</td>
                <td className="sticky-column">{item.komoditi_name}</td>
                <td className="sticky-column">{item.satuan}</td>
                <td>
                  {parseInt(item.p_guntur)
                    .toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                    .split(",00")
                    .join("")}
                </td>
                <td>
                  {parseInt(item.p_kadungora)
                    .toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                    .split(",00")
                    .join("")}
                </td>
                <td>
                  {parseInt(item.p_cikajang)
                    .toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                    .split(",00")
                    .join("")}
                </td>
                <td>
                  {parseInt(item.p_pameungpeuk)
                    .toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                    .split(",00")
                    .join("")}
                </td>
                <td>
                  {parseInt(item.p_samarang)
                    .toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                    .split(",00")
                    .join("")}
                </td>
                <td>
                  {parseInt(item.p_malangbong)
                    .toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                    .split(",00")
                    .join("")}
                </td>
                <td>
                  {parseInt(item.med_minggu_ini)
                    .toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                    .split(",00")
                    .join("")}
                </td>
                <td>
                  {parseInt(item.med_minggu_lalu)
                    .toLocaleString("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    })
                    .split(",00")
                    .join("")}
                </td>
                <td
                  style={{
                    backgroundColor:
                      item.keterangan === "naik"
                        ? "red"
                        : item.keterangan === "turun"
                        ? "#006400"
                        : item.keterangan === "tetap"
                        ? "#4D96FF"
                        : "transparent",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {item.keterangan}
                </td>
                <td
                  style={{
                    backgroundColor:
                      item.keterangan === "naik"
                        ? "red"
                        : item.keterangan === "turun"
                        ? "#006400"
                        : item.keterangan === "tetap"
                        ? "#4D96FF"
                        : "transparent",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {item.keterangan === "naik" ? (
                    <div>
                      <i className="fas fa-arrow-up"></i>
                      <span className="pl-3">{item.persentase}</span>
                    </div>
                  ) : item.keterangan === "turun" ? (
                    <div>
                      <i className="fas fa-arrow-down"></i>
                      <span className="pl-3">{item.persentase}</span>
                    </div>
                  ) : (
                    <span>{item.persentase}</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={13}>Tidak ada data</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default KomoditiTable;
