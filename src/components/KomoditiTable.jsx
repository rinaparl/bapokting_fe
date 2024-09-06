import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Alert, Spinner } from "react-bootstrap";
import TableAction from "../components/Tabel/TableAction";

function KomoditiTable() {
  const [hargaData, setHargaData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [komoditiOptions, setKomoditiOptions] = useState([]);
  const [komoditi, setKomoditi] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filterKet, setFilterKet] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

console.log(selectedDate);

  useEffect(() => {
    const getKomoditi = async () => {
      try {
        // const response = await axios.get(`http://localhost:5000/komoditi/list/${selectedDate? '?tanggal=' + selectedDate : ''}`);
        // console.log('ini respnya', response);

        let url = `http://localhost:5000/komoditi/list`;
        if (selectedDate) {
          url += `?tanggal=${selectedDate}`;
        }

        const response = await axios.get(url);
        console.log('Response dari backend:', response);

        if (response.data.success && Array.isArray(response.data.result)) {
          const komoditiOptions = response.data.result.map(item => ({
            label: item.komoditi_name,
            value: item.komoditi_name
          }));

          setHargaData(response.data.result);
          setFilteredData(response.data.result);
          setKomoditiOptions(komoditiOptions);
        } else {
          setError("Data yang diterima tidak sesuai");
        }
      } catch (err) {
        setError("Gagal mengambil data dari server");
      } finally {
        setLoading(false);
      }
    };

    getKomoditi();
  }, [selectedDate]);

  useEffect(() => {
    let filtered = hargaData;

    // Filter by keyword
    if (keyword) {
      filtered = filtered.filter(item =>
        item.komoditi_name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    // Filter by selected commodities
    if (komoditi && komoditi.length > 0) {
      filtered = filtered.filter(item => komoditi.includes(item.komoditi_name));
    }

    // Filter by selected date
    if (selectedDate) {
      filtered = filtered.filter(item => item.tanggal === selectedDate);
    }

    // Filter by keterangan
    if (filterKet && filterKet !== "all") {
      filtered = filtered.filter(item => item.keterangan === filterKet);
    }

    setFilteredData(filtered);
  }, [keyword, komoditi, selectedDate, filterKet, hargaData]);
// console.log(filteredData);

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  return (
    <Container fluid>
      <TableAction
        keyword={keyword}
        setKeyword={setKeyword}
        komoditi={komoditi}
        setKomoditi={setKomoditi}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        filterKet={filterKet}
        setFilterKet={setFilterKet}
        komoditiOptions={komoditiOptions}
      />
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
            {/* <th>%</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr
                key={item.id}
                onClick={() => handleRowClick(index)}
                className={selectedRow === index ? "selected-row" : "deselected-row"}
              >
                <td className="sticky-column">{index + 1}</td>
                <td className="sticky-column">{item.komoditi_name}</td>
                <td className="sticky-column">{item.satuan}</td>
                {["p_guntur", "p_kadungora", "p_cikajang", "p_pameungpeuk", "p_samarang", "p_malangbong"].map((market) => (
                  <td key={market}>
                    {parseInt(item[market])
                      .toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })
                      .split(",00")
                      .join("")}
                  </td>
                ))}
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
                      item.keterangan === "Naik"
                        ? "red"
                        : item.keterangan === "Turun"
                        ? "#006400"
                        : item.keterangan === "Tetap"
                        ? "#4D96FF"
                        : "transparent",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  {item.keterangan}
                </td>
                {/* <td
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
                      <span className="pl-3">{item.persentase.toFixed(2)}%</span>
                    </div>
                  ) : item.keterangan === "turun" ? (
                    <div>
                      <i className="fas fa-arrow-down"></i>
                      <span className="pl-3">{item.persentase.toFixed(2)}%</span>
                    </div>
                  ) : (
                    <span>{item.persentase.toFixed(2)}%</span>
                  )}
                </td> */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={13} style={{ textAlign: "center" }}>Tidak ada data</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default KomoditiTable;
