import React from 'react';
import { Select } from '@chakra-ui/react';

function FilterBar({ filterKet, filterKetChange}) {
  return (
    <Select placeholder='filter' mb={4} value={filterKet} onChange={filterKetChange}>
        <option value="Naik">Naik</option>
        <option value="Turun">Turun</option>
        <option value="Tetap">Tetap</option>
    </Select>
  );
}

export default FilterBar
