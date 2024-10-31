import React, { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import DateFilter from "./DateFilter";
import KomoditiFilter from "./KomoditiFilter";
import "../../styles/main.css";

const TableAction = ({
  keyword,
  setKeyword,
  komoditi,
  setKomoditi,
  selectedDate,
  setSelectedDate,
  filterKet,
  setFilterKet,
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
          keyword: keyword,
          komoditi: komoditi,
          keterangan: filterKet !== "all" ? filterKet : undefined,
        },
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate, keyword, komoditi, filterKet]);

  return (
    <>
      <Row>
        <Col xs={12} md={3} className="mb-3">
          <SearchBar keyword={keyword} keywordChange={setKeyword} />
        </Col>
        <Col xs={12} md={3} className="mb-3">
          <KomoditiFilter
            options={komoditiOptions}
            selectedKomoditi={komoditi}
            onChange={handleKomoditiChange}
          />
        </Col>
        <Col xs={12} md={3}>
          <DateFilter
            selectedDate={selectedDate}
            handleDateChange={setSelectedDate}
          />
        </Col>
        <Col xs={12} md={3}>
          <FilterBar filterKet={filterKet} setFilterKet={setFilterKet} />
        </Col>
      </Row>
    </>
  );
};

export default TableAction;
