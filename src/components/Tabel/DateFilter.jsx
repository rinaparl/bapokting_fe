import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form } from "react-bootstrap";
import { id } from "date-fns/locale";

const DateFilter = ({ selectedDate, handleDateChange }) => {
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      const parsedDate = new Date(selectedDate);

      if (!isNaN(parsedDate.getTime())) {
        setDate(parsedDate);
      } else {
        setDate(null);
      }
    } else {
      setDate(null);
    }
  }, [selectedDate]);

  const onDateChange = (selectedDate) => {
    setDate(selectedDate);
    if (selectedDate) {
      const formattedDateString = formatDateToIndonesian(selectedDate);
      handleDateChange(formattedDateString);
    } else {
      handleDateChange("");
    }
  };

  const formatDateToIndonesian = (date) => {
    if (!date) return "";
    const day = date.getDate();
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <Form.Group controlId="dateSelect">
      <DatePicker
        selected={date}
        onChange={onDateChange}
        dateFormat="d MMMM yyyy"
        className="form-control mb-3"
        isClearable
        showYearDropdown
        showMonthDropdown
        dropdownMode="select"
        locale={id}
        placeholderText="Pilih tanggal..."
      />
    </Form.Group>
  );
};

export default DateFilter;
