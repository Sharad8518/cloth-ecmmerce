import React, { useState } from "react";
import "./swiper-vertical.css"; // custom css

export default function VerticalImageSelector({ images, onSelect }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleSelect = (index) => {
    setSelectedIndex(index);
    onSelect(images[index]);
  };

  return (
    <div className="vertical-scroll-container">
      {images.map((img, i) => (
        <div
          key={i}
          className={`image-wrapper ${selectedIndex === i ? "active" : ""}`}
          onClick={() => handleSelect(i)}
        >
          <img src={img} alt={`Image ${i + 1}`} />
        </div>
      ))}
    </div>
  );
}
