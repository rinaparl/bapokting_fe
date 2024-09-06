import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

function SearchBar({ keyword, keywordChange }) {
  return (
    <InputGroup>
      <Form.Control
        type="text"
        placeholder="Cari Komoditi ..."
        value={keyword}
        onChange={(e) => keywordChange(e.target.value)}
      />
      <InputGroup.Text>
        <FaSearch />
      </InputGroup.Text>
    </InputGroup>
  );
}

export default SearchBar;
