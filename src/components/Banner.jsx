import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Banner1 from '../assets/img/banner1.png';
import Banner2 from '../assets/img/banner2.png';
import Banner3 from '../assets/img/banner3.png';

function Banner() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img src={Banner1} alt="Banner" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={Banner2} alt="Banner" />
      </Carousel.Item>
      <Carousel.Item>
        <img src={Banner3} alt="Banner" />
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;