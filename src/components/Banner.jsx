import React, { useState } from "react";
import { Carousel, Button } from "react-bootstrap";
import Banner1 from "../assets/img/1.png";
import Banner2 from "../assets/img/2.png";
import Banner3 from "../assets/img/3.png";

function Banner() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const scrollToTable = () => {
    const tableSection = document.getElementById("table-section");
    if (tableSection) {
      tableSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img src={Banner1} alt="Selamat Datang" height={50} />
      </Carousel.Item>
      <Carousel.Item>
        <img src={Banner2} alt="Harga Bahan Pokok" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={Banner3} alt="Selengkapnya" />
        {/* <Carousel.Caption>
          <Button variant="primary" onClick={scrollToTable}>
            Cek Selengkapnya
          </Button>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;
