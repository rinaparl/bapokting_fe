import React from "react";
import { Form } from "react-bootstrap";

function MarketFilter({ markets, selectedMarket, onMarketChange }) {
  return (
    <Form.Group>
      <Form.Label>Pilih Pasar</Form.Label>
      <Form.Control
        as="select"
        value={selectedMarket}
        onChange={(e) => onMarketChange(e.target.value)}
      >
        <option value="">Semua Pasar</option>
        {markets.map((market) => (
          <option key={market} value={market}>
            {market}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
}

export default MarketFilter;
