import React from "react";
import { Form } from "react-bootstrap";

function DateFilter({ startDate, endDate, onStartDateChange, onEndDateChange }) {
  return (
    <>
      <Form.Group>
        <Form.Label>Pilih Tanggal Mulai</Form.Label>
        <Form.Control
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Pilih Tanggal Akhir</Form.Label>
        <Form.Control
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
        />
      </Form.Group>
    </>
  );
}

export default DateFilter;
