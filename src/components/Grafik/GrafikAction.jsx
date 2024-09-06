import React from 'react';
import {Row, Col} from 'react-bootstrap';
import DateFilter from '../Tabel/DateFilter';
import KomoditiFilter from '../Tabel/KomoditiFilter';

const GrafikAction = () => {
  return (
    <>
      <Row className="mb-4">
      <Col md={4}>
        <KomoditiFilter komoditi={keyword} setKomoditi={keywordChange} />
      </Col>
      <Col md={4}>
        <DateFilter
          selectedDate={selectedDate}
          handleDateChange={setSelectedDate}
        />
      </Col>
    </Row>
    </>
  )
}

export default GrafikAction
