import React from 'react';
import { Form } from 'react-bootstrap';

const KomoditiFilter = ({ selectedKomoditi, setSelectedKomoditi, komoditiList }) => {
  return (
    <Form.Select value={selectedKomoditi} onChange={(e) => setSelectedKomoditi(e.target.value)} className="mb-3">
      <option value="">Select Komoditi</option>
      {komoditiList.map((komoditi, index) => (
        <option key={index} value={komoditi}>
          {komoditi}
        </option>
      ))}
    </Form.Select>
  );
};

export default KomoditiFilter;
