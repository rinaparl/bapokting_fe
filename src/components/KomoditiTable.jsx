import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Alert, Spinner } from "react-bootstrap";
import TableAction from "../components/Tabel/TableAction";
import "../styles/main.css";

function KomoditiTable() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [komoditiOptions, setKomoditiOptions] = useState([]);
  const [komoditi, setKomoditi] = useState([]);
  const [filterKet, setFilterKet] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);

  const formatDate = (date) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(date).toLocaleDateString("id-ID", options);
  };

  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  useEffect(() => {
    const fetchKomoditi = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:5000/komoditi/list${
            selectedDate ? "?tanggal=" + selectedDate : ""
          }`
        );

        if (
          response.status === 200 &&
          response.data.success &&
          Array.isArray(response.data.result)
        ) {
          const komoditiOptions = response.data.result.map((item) => ({
            label: item.komoditi_name,
            value: item.komoditi_name,
          }));

          setData(response.data.result);
          setFilteredData(response.data.result);
          setKomoditiOptions(komoditiOptions);
        } else {
          setError("Data yang diterima tidak sesuai");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Gagal mengambil data dari server");
      } finally {
        setLoading(false);
      }
    };

    fetchKomoditi();
    const interval = setInterval(fetchKomoditi, 7200000);
    return () => clearInterval(interval);
  }, [selectedDate]);

  //filtered
  useEffect(() => {
    let filtered = [...data];

    if (keyword) {
      filtered = filtered.filter((item) =>
        item.komoditi_name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (komoditi && komoditi.length > 0) {
      filtered = filtered.filter((item) =>
        komoditi.includes(item.komoditi_name)
      );
    }

    if (selectedDate) {
      filtered = filtered.filter((item) => item.tanggal === selectedDate);
    }

    if (filterKet && filterKet !== "all") {
      filtered = filtered.filter((item) => item.keterangan === filterKet);
    }

    setFilteredData(filtered);
  }, [keyword, komoditi, selectedDate, filterKet, data]);

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
      <div className="table-responsive">
        <h4>Update Pertanggal : {selectedDate}</h4>
        <p className="mb-4">
          Data diambil setiap tanggal hari ini. Jika data tidak ada silahkan
          pilih tanggal untuk melihat data{" "}
        </p>
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
              <th>Pasar Wanaraja</th>
              <th>Pasar Malangbong</th>
              <th>Rata-Rata Minggu Ini</th>
              <th>Rata-Rata Minggu Lalu</th>
              <th>Keterangan</th>
              <th>Persentase</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={item.id}
                  onClick={() => handleRowClick(index)}
                  className={
                    selectedRow === index ? "selected-row" : "deselected-row"
                  }
                >
                  <td className="sticky-column">{index + 1}</td>
                  <td className="sticky-column">{item.komoditi_name}</td>
                  <td className="sticky-column">{item.satuan}</td>
                  {[
                    "p_guntur",
                    "p_kadungora",
                    "p_cikajang",
                    "p_pameungpeuk",
                    "p_samarang",
                    "p_malangbong",
                  ].map((market) => (
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
                    {item.keterangan === "Naik" ? (
                      <div>
                        <i
                          className="fas fa-arrow-up"
                          style={{ marginRight: "8px" }}
                        ></i>
                        <span className="pl-3">
                          {item.persentase.toFixed(2)}%
                        </span>
                      </div>
                    ) : item.keterangan === "Turun" ? (
                      <div>
                        <i
                          className="fas fa-arrow-down"
                          style={{ marginRight: "8px" }}
                        ></i>
                        <span className="pl-3">
                          {item.persentase.toFixed(2)}%
                        </span>
                      </div>
                    ) : (
                      <div>
                        <i
                          className="fas fa-equals"
                          style={{ marginRight: "8px" }}
                        ></i>{" "}
                        <span className="pl-3">
                          {item.persentase.toFixed(2)}%
                        </span>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={13} style={{ textAlign: "center" }}>
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default KomoditiTable;