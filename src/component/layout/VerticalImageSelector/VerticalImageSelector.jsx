import React, { useState } from "react";
import "./swiper-vertical.css"; // custom css

export default function VerticalImageSelector({
  images,
  onSelect,
  selectedIndex,
}) {
  const handleSelect = (index) => {
    onSelect(index); // send index to parent
  };

  return (
    <div className="vertical-scroll-container">
      {images.map((img, i) => (
        <div
          key={i}
          className={`image-wrapper ${selectedIndex === i ? "active" : ""}`} // highlight active
          onClick={() => handleSelect(i)}
        >
          <img src={img} alt={`Image ${i + 1}`} />
        </div>
      ))}
    </div>
  );
}
