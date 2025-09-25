import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Container, Row, Col, Button } from "react-bootstrap";
import { getAllLuxe } from "../api/user/Productapi";
import "./ContentWithSlider.css";
import { useNavigate } from "react-router-dom";
export default function ContentWithSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    afterChange: (index) => setCurrentSlide(index),
  };

  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await getAllLuxe();
    setItems(data);
  };

  const navigate = useNavigate()

   const handleClick=(product)=>{
    navigate("/collectionObleLuxe",{state:{product}})
   }

  

  return (
    <Container className="py-5">
      {items.length > 0 && (
        <>
          <div className="luxe-container">
            <Row
              style={{
                backgroundColor: "#dfe6e9",
                height: "80vh",
                minHeight: "60vh",
                overflow: "hidden",
              }}
            >
              <Col
                md={6}
                className="d-flex flex-column justify-content-center align-items-center text-center text-black"
              >
                <br />
                <h2 className="fw-bold mb-3 ">{items[0].title}</h2>
                <div
                  style={{
                    width: "20%",
                    height: 1,
                    backgroundColor: "#000",
                    marginTop: -10,
                  }}
                />
                <p className="mb-4" style={{ marginTop: 10 }}>
                  {items[0].description}
                </p>

                <Button
                  variant="light"
                  size="lg"
                  style={{
                    fontSize: 13,
                    borderRadius: 0,
                    border: "1px solid #000",
                    background: "transparent",
                  }}
                  onClick={()=>handleClick(items[0].product)}
                >
                  SHOP NOW
                </Button>
              </Col>
              <Col md={6} className="mt-4 mt-md-0" style={{ padding: "0px" }}>
                <Slider
                  {...settings}
                  style={{ height: "80vh", minHeight: "60vh", width: "100%" }}
                >
                  {items[0].images.map((src, index) => (
                    <div key={index}>
                      <img
                        src={src.url}
                        alt={`Slide ${index + 1}`}
                        style={{objectFit:"fill",width:"100%"}}
                        className="img-fluid shadow"
                      />
                    </div>
                  ))}
                </Slider>
              </Col>
            </Row>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 15,
              }}
            >
              {items[0].images.map((_, index) => (
                <span
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor:
                      currentSlide === index ? "#ff6347" : "#000",
                    margin: "0 5px",
                    cursor: "pointer",
                    display: "inline-block",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="hero-container">
            <div className="hero-left">
              <h2 className="hero-title fw-bold mb-3">{items[0].title}</h2>
              <div className="hero-divider" />
              <p className="hero-subtitle mb-4">{items[0].description}</p>
              <Button variant="light" size="lg" className="hero-button" onClick={()=>handleClick(items[0].product)}>
                Shop Now
              </Button>
            </div>

            <div className="hero-right">
              <Slider {...settings} className="hero-slider">
                {items[0]?.images.map((src, index) => (
                  <div>
                    <img
                      src={src.url}
                      alt={`Slide ${index + 1}`}
                      className="hero-image"
                      style={{ height: "35vh",objectFit:"fill",width:"100%" }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}
