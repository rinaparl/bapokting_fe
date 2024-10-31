import React, { useState } from "react";
import { Dropdown, DropdownButton, Form } from "react-bootstrap";

function KomoditiFilter({ options = [], selectedKomoditi, onChange }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const checked = event.target.checked;

    if (onChange) {
      onChange(event);
    }
  };

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <Dropdown show={showDropdown} onClick={toggleDropdown}>
      <DropdownButton
        variant="outline-secondary"
        title="Filter Komoditi"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        {options.map((option, index) => (
          <Dropdown.Item key={index} as="div">
            <Form.Check
              type="checkbox"
              id={`komoditi-${index}`}
              label={option.label}
              value={option.value}
              checked={selectedKomoditi.includes(option.value)}
              onChange={handleCheckboxChange}
            />
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </Dropdown>
  );
}

export default KomoditiFilter;
