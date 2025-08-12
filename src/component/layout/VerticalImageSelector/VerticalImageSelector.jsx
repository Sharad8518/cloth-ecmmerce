import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "./swiper-vertical.css"; // custom styling

export default function VerticalImageSelector({ images, onSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    onSelect(images[index]);
  };

  return (
    <div className="vertical-swiper-container">
      <Swiper
        direction="vertical"
         slidesPerView={4}
  spaceBetween={0}
        freeMode={true}
        modules={[FreeMode]}
        className="vertical-swiper"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i} className="slide-wrapper">
            <img
              src={img}
              alt={`Image ${i + 1}`}
              onClick={() => handleSelect(i)}
              className={`swipe-image ${selectedIndex === i ? "selected" : ""}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
