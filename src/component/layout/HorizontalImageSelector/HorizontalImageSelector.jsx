import React from "react";

export default function HorizontalImageSelector({ images, onSelect,selectedIndex }) {

    const handleSelect = (index) => {
    onSelect(index); // send index to parent
  };

  return (
    <div style={{ display: "flex", gap: "5px", overflowX: "auto" }}>
  {images.map((img, idx) => (
    <img
      key={idx}
      src={img}
      alt={`thumbnail-${idx}`}
      onClick={() => handleSelect(idx)}
      style={{
        width: "70px",
        height: "100px",
        objectFit: "cover",     // ✅ fill the div and crop if needed
        objectPosition: "top", // ✅ center the image
        backgroundColor: "#f8f8f8",
        cursor: "pointer",
        borderRadius: "8px",
        border: selectedIndex === idx ? "2px solid #000" : "2px solid transparent",
      }}
    />
  ))}
</div>
  );
}
