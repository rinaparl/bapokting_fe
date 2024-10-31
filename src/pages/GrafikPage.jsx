import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/main.css";
import { Container, Row, Col } from "react-bootstrap";
import KomoditiFilter from "../components/Grafik/KomoditiFilter";
import DateFilter from "../components/Grafik/DateFilter";
import LineChart from "../components/Grafik/LineChart";

function Grafik() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [komoditiOptions, setKomoditiOptions] = useState([]);
  const [selectedKomoditi, setSelectedKomoditi] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [dateShow, setDateShow] = useState("");

  const colors = [
    "#2F59CC",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#E7E9ED",
    "#9ACD32",
    "#8B008B",
    "#FFD700",
    "#20B2AA",
    "#DC143C",
    "#7FFF00",
    "#FF4500",
    "#4682B4",
    "#32CD32",
    "#8A2BE2",
    "#DAA520",
    "#FF6347",
    "#40E0D0",
    "#BA55D3",
    "#FFDAB9",
    "#6B8E23",
    "#FFA07A",
    "#8B0000",
    "#6495ED",
    "#FF1493",
    "#A0522D",
    "#48D1CC",
    "#D2691E",
    "#ADD8E6",
    "#FFB6C1",
    "#2E8B57",
    "#CD5C5C",
    "#5F9EA0",
    "#7B68EE",
    "#DB7093",
    "#4682B4",
  ];

  const formatDateToIndonesian = (dateString) => {
    if (!dateString || typeof dateString !== "string")
      return "Tanggal tidak tersedia";

    const [year, month, day] = dateString.split("-");

    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const formattedDate = selectedDate
          ? formatDateToIndonesian(selectedDate)
          : "";
        const response = await axios.get(
          `http://localhost:5000/komoditi/list${
            formattedDate ? "?tanggal=" + formattedDate : ""
          }`
        );

        if (response.data.success) {
          setData(response.data.result);
          if (response.data.result.length > 0) {
            setDateShow(response.data.result[0].tanggal);
          }

          const uniqueKomoditi = [
            ...new Set(response.data.result.map((item) => item.komoditi_name)),
          ];
          const komoditiOptions = uniqueKomoditi.map((name) => ({
            label: name,
            value: name,
          }));
          setKomoditiOptions(komoditiOptions);
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchData();
  }, [selectedDate]);

  useEffect(() => {
    let filtered = data;

    if (selectedKomoditi) {
      filtered = data.filter((item) => item.komoditi_name === selectedKomoditi);
    }
    setFilteredData(filtered);
  }, [selectedKomoditi, data]);

  const marketNames = {
    p_guntur: "Pasar Guntur",
    p_kadungora: "Pasar Kadungora",
    p_cikajang: "Pasar Cikajang",
    p_pameungpeuk: "Pasar Pameungpeuk",
    p_samarang: "Pasar Wanaraja",
    p_malangbong: "Pasar Malangbong",
  };

  const chartData =
    filteredData.length > 0
      ? {
          labels: Object.values(marketNames),
          datasets: filteredData.map((item, index) => ({
            label: item.komoditi_name,
            data: Object.keys(marketNames).map(
              (marketKey) => parseInt(item[marketKey]) || 0
            ),
            borderColor: colors[index % colors.length],
            backgroundColor: `${colors[index % colors.length]}98`,
            borderWidth: 2,
            tooltipData: {
              komoditiName: item.komoditi_name,
              averageCurrent: item.med_minggu_ini,
              averageLast: item.med_minggu_lalu,
              keterangan: item.keterangan,
              persentase: item.persentase,
            },
          })),
        }
      : null;

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 10,
          padding: 15,
          font: {
            size: 12,
            color: "black",
          },
          color: "black",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const dataset = context.dataset;
            const komoditiName = dataset.tooltipData.komoditiName || "";

            return [
              `Komoditi: ${komoditiName}`,
              `Harga: Rp. ${context.raw.toLocaleString()}`,
              `Rata-rata Harga Minggu Ini: Rp. ${dataset.tooltipData.averageCurrent}`,
              `Rata-rata Harga Minggu Lalu: Rp. ${dataset.tooltipData.averageLast}`,
              `Keterangan: ${dataset.tooltipData.keterangan}`,
              `Persentase: ${dataset.tooltipData.persentase}%`,
            ];
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Pasar",
          font: { size: 16 },
          color: "black",
        },
        ticks: {
          font: { size: 14, weight: "bold" },
          color: "black",
        },
      },

      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Harga (Rp)",
          font: { size: 16 },
          color: "black",
        },
        ticks: {
          font: { size: 14, weight: "bold" },
          color: "black",
        },
      },
    },
  };

  return (
    <Container className="custom-container">
      <section className="homepage">
        <h3>Grafik Harga Bahan Pokok dan Kebutuhan Penting</h3>
        <h6>
          Sumber Data : Dinas Perindustrian, Perdagangan, Energi dan Sumber Daya
          Mineral Kabupaten Garut
        </h6>
      </section>
      <div className="custom-card">
        <Row className="g-2 mb-4 justify-content-center">
          <Col
            md={5}
            className="d-flex align-items-center justify-content-center"
          >
            <KomoditiFilter
              komoditiOptions={komoditiOptions}
              selectedKomoditi={selectedKomoditi}
              onKomoditiChange={setSelectedKomoditi}
            />
          </Col>
          <Col
            md={5}
            className="d-flex align-items-center justify-content-center"
          >
            <DateFilter
              startDate={selectedDate}
              onStartDateChange={setSelectedDate}
            />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center align-items-center">
          <Col xs={12} sm={12} md={10} lg={8}>
            <div
              className="chart-container"
              style={{ height: "700px", overflowX: "auto" }}
            >
              {chartData ? (
                <LineChart chartData={chartData} chartOptions={chartOptions} />
              ) : (
                <div style={{ textAlign: "center" }}>Data tidak tersedia</div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Grafik;
