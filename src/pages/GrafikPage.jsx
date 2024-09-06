import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/main.css";
import { Container, Row, Col } from "react-bootstrap";
import MarketFilter from "../components/Grafik/MarketFilter";
import KomoditiFilter from "../components/Grafik/KomoditiFilter";
import DateFilter from "../components/Grafik/DateFilter";
import BarChart from "../components/BarChart";

function Grafik() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [komoditiOptions, setKomoditiOptions] = useState([]);
  const [selectedMarket, setSelectedMarket] = useState("");
  const [selectedKomoditi, setSelectedKomoditi] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const marketMapping = {
    p_guntur: "Pasar Guntur",
    p_kadungora: "Pasar Kadungora",
    p_cikajang: "Pasar Cikajang",
    p_pameungpeuk: "Pasar Pameungpeuk",
    p_samarang: "Pasar Samarang",
    p_malangbong: "Pasar Malangbong",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/komoditi/list");
        if (response.data.success) {
          setData(response.data.result);

          const uniqueMarkets = [...new Set(Object.values(marketMapping))];
          setMarkets(uniqueMarkets);

          const komoditiOptions = response.data.result.map((item) => ({
            label: item.komoditi_name,
            value: item.komoditi_name,
          }));
          setKomoditiOptions(komoditiOptions);
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getLastNDays = (days) => {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - days + 1);
      return { startDate: start.toISOString().split('T')[0], endDate: end.toISOString().split('T')[0] };
    };

    const { startDate: last3DaysStart, endDate: last3DaysEnd } = getLastNDays(3);

    let filtered = data;

    // Filter by market
    if (selectedMarket) {
      const marketKey = Object.keys(marketMapping).find(
        (key) => marketMapping[key] === selectedMarket
      );
      filtered = filtered.filter((item) => item[marketKey]);
    }

    // Filter by commodity
    if (selectedKomoditi) {
      filtered = filtered.filter(
        (item) => item.komoditi_name === selectedKomoditi
      );
    } 
    // else {
    //   filtered = filtered.filter((item) => {
    //     const itemDate = new Date(item.tanggal);
    //     return itemDate >= new Date(last3DaysStart) && itemDate <= new Date(last3DaysEnd);
    //   });
    // }

    // Filter by date range
    if (startDate && endDate) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.tanggal);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
      });
    }

    setFilteredData(filtered);
  }, [selectedMarket, selectedKomoditi, startDate, endDate, data]);

  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
  ];

  const chartData = {
    labels: filteredData.map((item) => item.tanggal),
    datasets: filteredData.map((item, index) => {
      const marketKey = Object.keys(marketMapping).find(
        (key) => marketMapping[key] === selectedMarket
      );
      return {
        label: item.komoditi_name,
        data: [item[marketKey]],
        backgroundColor: colors[index % colors.length],
        borderColor: colors[index % colors.length],
        borderWidth: 1,
      };
    }),
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 20,
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const itemIndex = context.dataIndex;
            const item = filteredData[itemIndex];
            const marketKey = Object.keys(marketMapping).find(
              (key) => marketMapping[key] === selectedMarket
            );
            const price = item[marketKey];
            return `${selectedMarket}, ${item.komoditi_name} : Rp. ${price}`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <>
      <Container  className="custom-container">
        <section className="homepage">
          <h1>Visualisasi Harga Bahan Pokok dan Kebutuhan Penting</h1>
        </section>
        <div className="custom-card">
        <Row className="g-3 mb-4">
          <Col md={4} className="d-flex align-items-center mb-3 custom-margin">
            <MarketFilter
              markets={markets}
              selectedMarket={selectedMarket}
              onMarketChange={setSelectedMarket}
            />
          </Col>
          <Col md={4} className="d-flex align-items-center mb-3">
            <KomoditiFilter
              komoditiOptions={komoditiOptions}
              selectedKomoditi={selectedKomoditi}
              onKomoditiChange={setSelectedKomoditi}
            />
          </Col>
          <Col md={4} className="d-flex align-items-center mb-3">
            <DateFilter
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col xs={12} sm={12} md={10} lg={8}>
            <div className="chart-container">
              <BarChart chartData={chartData} chartOptions={chartOptions} />
            </div>
          </Col>
        </Row>
        </div>
        
      </Container>
    </>
  );
}

export default Grafik;
