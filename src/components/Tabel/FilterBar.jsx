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
      <option value="naik">Naik</option>
      <option value="turun">Turun</option>
      <option value="tetap">Tetap</option>
    </Form.Select>
  );
};

export default FilterBar;
