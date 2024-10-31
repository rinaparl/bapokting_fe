import React from "react";
import { Form } from "react-bootstrap";

const FilterBar = ({ filterKet, setFilterKet }) => {
  return (
    <Form.Select
      value={filterKet}
      onChange={(e) => setFilterKet(e.target.value)}
      className="mb-3"
    >
      <option value="all">All</option>
      <option value="Naik">Naik</option>
      <option value="Turun">Turun</option>
      <option value="Tetap">Tetap</option>
    </Form.Select>
  );
};

export default FilterBar;
