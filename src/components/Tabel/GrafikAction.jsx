import React from 'react';
import {Row, Col} from 'react-bootstrap';
import DateFilter from './DateFilter';
import KomoditiFilter from './KomoditiFilter';

const GrafikAction = () => {
  return (
    <div>
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
    </div>
  )
}

export default GrafikAction
