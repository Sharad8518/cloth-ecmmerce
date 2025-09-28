import React from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import img from "../../assets/Ziba.jpg"
import { usePalette } from "react-palette";

export default function SuspensionPage() {
  const { data } = usePalette(img);
  return (
   <Container
  fluid
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to bottom, #faded0, #f6c3a8, #ffb88c)",
    padding: "2rem",
  }}
>
  <div
    style={{
      background: "rgba(255, 255, 255, 0.2)", // subtle glass effect
      backdropFilter: "blur(10px)",
      borderRadius: "20px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
      padding: "1.5rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <img
      src={img}
      alt="preview"
      style={{
        objectFit: "contain",
        width: "300px",
        height: "450px",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.25)", // adds depth
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.3)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.25)";
      }}
    />
  </div>
</Container>
  );
}
