import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import DateFilter from "../Tabel/DateFilter";
import KomoditiFilter from "../Tabel/KomoditiFilter";
import "../../styles/main.css";

const GrafikAction = ({
  komoditi,
  setKomoditi,
  selectedDate,
  setSelectedDate,
  komoditiOptions,
}) => {
  const handleKomoditiChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      if (!komoditi.includes(value)) {
        setKomoditi([...komoditi, value]);
      }
    } else {
      setKomoditi(komoditi.filter((item) => item !== value));
    }
  };

  const fetchData = async () => {
    const formattedDate = selectedDate;
    try {
      const response = await axios.get("/komoditi/list", {
        params: {
          tanggal: formattedDate,
          komoditi: komoditi,
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate, komoditi]);

  return (
    <>
      <Row className="mb-4">
        <Col md={4}>
          <KomoditiFilter
            komoditiOptions={komoditiOptions}
            selectedKomoditi={komoditi}
            onKomoditiChange={handleKomoditiChange}
          />
        </Col>
        <Col md={4}>
          <DateFilter
            startDate={selectedDate}
            handleDateChange={setSelectedDate}
          />
        </Col>
      </Row>
    </>
  );
};

export default GrafikAction;
