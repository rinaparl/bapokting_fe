import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

function SearchBar({ keyword, keywordChange }) {
  return (
    <InputGroup>
      <InputGroup.Text>
        <FaSearch />
      </InputGroup.Text>
      <Form.Control
        type="text"
        placeholder="Cari Komoditi ..."
        value={keyword}
        onChange={(e) => keywordChange(e.target.value)}
      />
    </InputGroup>
  );
}

export default SearchBar;
