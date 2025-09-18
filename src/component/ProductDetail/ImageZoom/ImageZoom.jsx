import { useState } from "react";
import { GrAdd, GrSubtract } from "react-icons/gr";

export default function ImageZoom({ selectedImage }) {
  const [zoom, setZoom] = useState(1); // 1 = normal size

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 3));   // max 3x
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5)); // min 0.5x

  return (
    <div className="rightImageFullSection">
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={selectedImage}
          style={{
            transform: `scale(${zoom})`,
            transition: "transform 0.3s ease",
            objectFit: "cover",
            width: "100%",
          }}
        />
      </div>

      {/* Fixed bottom controls */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "60px",
            marginBottom: 10,
          }}
        >
          <button
            onClick={zoomIn}
            style={{
              marginLeft: 10,
              width: 50,
              height: 50,
              borderRadius: 100,
              border: "none",
              cursor: "pointer",
            }}
          >
            <GrAdd />
          </button>
          <button
            onClick={zoomOut}
            style={{
              marginLeft: 10,
              width: 50,
              height: 50,
              borderRadius: 100,
              border: "none",
              cursor: "pointer",
            }}
          >
            <GrSubtract />
          </button>
        </div>
      </div>
    </div>
  );
}
