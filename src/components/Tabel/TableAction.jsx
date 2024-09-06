import React from "react";
import { Row, Col } from "react-bootstrap";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import DateFilter from "./DateFilter";
import KomoditiFilter from "./KomoditiFilter";
import '../../styles/main.css';

const TableAction = ({
  keyword,
  setKeyword,
  komoditi,
  setKomoditi,
  selectedDate,
  setSelectedDate,
  filterKet,
  setFilterKet,
  komoditiOptions
}) => {
  // console.log("Received Komoditi Options:", komoditiOptions);

  const handleKomoditiChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setKomoditi([...komoditi, value]);
    } else {
      setKomoditi(komoditi.filter(item => item !== value));
    }
  };

  return (
    <>
      <Row className="mb-3">
      <Col md={3}>
        <SearchBar
          keyword={keyword}
          keywordChange={setKeyword}
        />
      </Col>
      <Col md={3} className="table-action">
        <KomoditiFilter
          options={komoditiOptions}
          selectedKomoditi={komoditi}
          onChange={handleKomoditiChange}
        />
      </Col>
      <Col md={3}>
        <DateFilter
          selectedDate={selectedDate}
          handleDateChange={setSelectedDate}
        />
      </Col>
      <Col md={3}>
        <FilterBar
          filterKet={filterKet}
          setFilterKet={setFilterKet}
        />
      </Col>
    </Row>
    </>
  );
};

export default TableAction;
