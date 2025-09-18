// components/ImageMagnifier.js
import React, { useRef, useState } from "react";
import "./ImageMagnifier.css";

const ImageMagnifier = ({ src, zoom = 2, lensSize = 150, alt }) => {
  const imgRef = useRef(null);
  const [lensStyle, setLensStyle] = useState({ display: "none" });

  const handleMouseMove = (e) => {
    const img = imgRef.current;
    const rect = img.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      setLensStyle({ display: "none" });
      return;
    }

    setLensStyle({
      display: "block",
      left: `${x - lensSize / 2}px`,
      top: `${y - lensSize / 2}px`,
      width: `${lensSize}px`,
      height: `${lensSize}px`,
      backgroundImage: `url(${src})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: `${rect.width * zoom}px ${rect.height * zoom}px`,
      backgroundPosition: `-${x * zoom - lensSize / 2}px -${y * zoom - lensSize / 2}px`,
    });
  };

  return (
    <div
      className="magnifier-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setLensStyle({ display: "none" })}
    >
      <img ref={imgRef} src={src} alt={alt} className="magnifier-image" />
      <div className="magnifier-lens" style={lensStyle}></div>
    </div>
  );
};

export default ImageMagnifier;
