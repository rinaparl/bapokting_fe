import React from "react";
import { Form } from "react-bootstrap";

function KomoditiFilter({
  komoditiOptions,
  selectedKomoditi,
  onKomoditiChange,
}) {
  return (
    <Form.Group>
      <Form.Label>Pilih Komoditi</Form.Label>
      <Form.Control
        as="select"
        value={selectedKomoditi}
        onChange={(e) => onKomoditiChange(e.target.value)}
      >
        <option value="">Semua Komoditi</option>
        {komoditiOptions.map((komoditi, index) => (
          <option key={`${komoditi.value}-${index}`} value={komoditi.value}>
            {komoditi.label}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}

export default KomoditiFilter;
