import React from "react";
import { Form } from "react-bootstrap";

function DateFilter({ startDate, onStartDateChange }) {
  const formatDateToIndonesian = (dateString) => {
    if (!dateString) return "";

    const date = new Date(dateString);
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

    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handleDateChange = (value) => {
    onStartDateChange(value);
    console.log("Tanggal untuk backend:", formatDateToIndonesian(value));
  };

  return (
    <Form.Group>
      <Form.Label>Pilih Tanggal</Form.Label>
      <Form.Control
        type="date"
        value={startDate}
        onChange={(e) => handleDateChange(e.target.value)}
        max={new Date().toISOString().split("T")[0]}
      />
    </Form.Group>
  );
}

export default DateFilter;
