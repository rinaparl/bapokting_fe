import React from 'react';
import { Form } from 'react-bootstrap';

const DateFilter = ({ selectedDate, handleDateChange }) => {
  return (
    <Form.Group controlId="dateSelect">
      <Form.Control
        type="date"
        value={selectedDate || ""}
        onChange={(e) => handleDateChange(e.target.value)}
        className="mb-3"
      />
    </Form.Group>
  );
};

export default DateFilter;
