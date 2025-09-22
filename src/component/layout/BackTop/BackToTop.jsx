import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const BackToTop = () => {
  const [show, setShow] = useState(false);

  // Show button after scrolling 300px
  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      onClick={scrollToTop}
      style={{
        position: "fixed",
        bottom: "70px",
        right: "40px",
        display: show ? "block" : "none",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        padding: 0,
        zIndex: 1000,
        backgroundColor: "#ff6347",
        border: "none",
      }}
    >
      ↑
    </Button>
  );
};

export default BackToTop;
