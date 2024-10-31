import React, { useState } from "react";
import { Dropdown, Form } from "react-bootstrap";

const FilterKet = ({ filterKet, setFilterKet }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    Naik: false,
    Turun: false,
    Tetap: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));

    const selectedKeys = Object.keys({
      ...selectedOptions,
      [name]: checked,
    }).filter((key) => selectedOptions[key] || (key === name && checked));

    setFilterKet(selectedKeys.length > 0 ? selectedKeys : "all");
  };

  return (
    <Dropdown className="mb-3">
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Filter Keterangan
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as="div">
          <Form.Check
            type="checkbox"
            label="Naik"
            name="Naik"
            checked={selectedOptions.Naik}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            type="checkbox"
            label="Turun"
            name="Turun"
            checked={selectedOptions.Turun}
            onChange={handleCheckboxChange}
          />
          <Form.Check
            type="checkbox"
            label="Tetap"
            name="Tetap"
            checked={selectedOptions.Tetap}
            onChange={handleCheckboxChange}
          />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilterKet;
