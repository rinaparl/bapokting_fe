import React from "react";
import { Form } from "react-bootstrap";

function SearchBar({ keyword, keywordChange }) {
  return (
    <Form.Control 
      type="text" 
      placeholder="Cari Berdasarkan Komoditi..." 
      value={keyword} 
      onChange={keywordChange} 
    />
  );
}

export default SearchBar;
