import React from 'react';
import { Form } from 'react-bootstrap';

const DateFilter = ({ selectedDate, setSelectedDate }) => {
  return (
    <Form.Control
      type="date"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
      className="mb-3"
    />
  );
};

export default DateFilter;
