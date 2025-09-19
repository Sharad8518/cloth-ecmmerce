import React from "react";
import { FaPlay } from "react-icons/fa"; // play icon

export default function HorizontalImageSelector({ media, onSelect, selectedIndex }) {
  const handleSelect = (index) => {
    onSelect(index);
  };

  return (
    <div style={{ display: "flex", gap: "5px", overflowX: "auto" }}>
      {media.map((item, idx) => (
        <div
          key={idx}
          onClick={() => handleSelect(idx)}
          style={{
            position: "relative",
            width: "70px",
            height: "100px",
            cursor: "pointer",
            borderRadius: "8px",
            overflow: "hidden",
            border: selectedIndex === idx ? "2px solid #000" : "2px solid transparent",
          }}
        >
          {item.kind === "video" ? (
            <>
              <video
                src={item.url || "/default-video-thumb.jpg"} // fallback if no thumbnail
                alt={`video-${idx}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  backgroundColor: "#f8f8f8",
                }}
              />
              {/* Play icon overlay */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "rgba(0,0,0,0.6)",
                  borderRadius: "50%",
                  padding: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaPlay size={14} color="#fff" />
              </div>
            </>
          ) : (
            <img
              src={item.url}
              alt={`image-${idx}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
                backgroundColor: "#f8f8f8",
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
