import React from "react";
import { FaPlay } from "react-icons/fa"; // play icon
import "./swiper-vertical.css";

export default function VerticalImageSelector({
  media,
  onSelect,
  selectedIndex,
}) {
  const handleSelect = (index) => {
    onSelect(index);
  };

  return (
    <div className="vertical-scroll-container">
      {media.map((item, i) => (
        <div
          key={i}
          className={`image-wrapper ${selectedIndex === i ? "active" : ""}`}
          onClick={() => handleSelect(i)}
        >
          {item.kind === "video" ? (
            <div className="video-thumbnail-wrapper">
              {/* Static preview for video */}
              <img
                src={item.thumbnail || "/default-video-thumb.jpg"}
                alt={`Video ${i + 1}`}
                className="video-thumbnail"
              />
              <div className="video-overlay">
                <FaPlay size={18} color="#fff" />
              </div>
            </div>
          ) : (
            <img src={item.url} alt={`Image ${i + 1}`} />
          )}
        </div>
      ))}
    </div>
  );
}
