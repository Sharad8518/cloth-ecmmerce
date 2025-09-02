import React from "react";

export default function HorizontalImageSelector({ images, onSelect }) {
  return (
    <div style={{ display: "flex", gap: "5px", overflowX: "auto" }}>
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`thumbnail-${idx}`}
          onClick={() => onSelect(img)}
          style={{
            width: "80px",
            height: "80px",
            objectFit: "contain", // ✅ show full image
            backgroundColor: "#f8f8f8", // ✅ adds background padding if aspect ratio differs
            cursor: "pointer",
            borderRadius: "8px",
          }}
        />
      ))}
    </div>
  );
}
