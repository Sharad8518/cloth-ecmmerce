import React from 'react'
import Slider from "react-slick";
import { Container, Row, Col, Button } from "react-bootstrap"
import "./ContentWithSlider.css"
export default function ContentWithSlider() {
 const settings = {
dots: true,
infinite: true,
speed: 500,
slidesToShow: 1,
slidesToScroll: 1,
autoplay: true,
autoplaySpeed: 3000,
arrows: false,
};


return (
<Container className="py-5">
  <Row className="align-items-center" style={{backgroundColor: "#dfe6e9",  height: "80vh",   minHeight: "60vh",borderRadius: "15px", overflow: "hidden"}}>
    {/* Left Content */}
    <Col
      md={6}
      className="d-flex flex-column justify-content-center align-items-center text-center text-black"
     
    >
      <h2 className="fw-bold mb-3">Discover Women’s Fashion</h2>
      <p className="mb-4">
        Explore our latest collection of stylish and comfortable women’s clothing.
        From casual wear to elegant outfits, our designs bring together modern
        trends with timeless classics.
      </p>
      <Button
        variant="light"
        size="lg"
        className="rounded-pill shadow"
        style={{ fontSize: 13 }}
      >
        Shop the Collection
      </Button>
    </Col>

    {/* Right Image Slider */}
    <Col md={6} className="mt-4 mt-md-0" style={{padding:"0px"}}>
      <Slider {...settings} style={{ borderRadius: "15px", overflow: "hidden",height: "80vh", minHeight: "60vh",width:"100%" }}>
        <div>
          <img
            src="https://media.istockphoto.com/id/1266816335/photo/beautiful-indian-woman-in-sari.jpg?s=612x612&w=0&k=20&c=_sqQ1VViaSM7q9Un3r36MinMwlhsw0uokC8pJftBSos="
            alt="Slide 1"
            className="img-fluid rounded shadow"
          />
        </div>
        <div>
          <img
            src="https://media.istockphoto.com/id/1279930099/photo/indian-woman-measuring-dress-size-on-mannequin.jpg?s=612x612&w=0&k=20&c=sZlmMfdUXuk3TkDMhrMUW382x_pzN73r7P-ja53MWEc="
            alt="Slide 2"
            className="img-fluid rounded shadow"
          />
        </div>
        <div>
          <img
            src="https://media.istockphoto.com/id/1312051741/photo/shot-of-a-young-women-as-a-fashion-designer-stock-photo.jpg?s=612x612&w=0&k=20&c=CwNvWSSfLim0yYIBhCchWLHiOMDZ6qB7t9oIpebzKS0="
            alt="Slide 3"
            className="img-fluid rounded shadow"
          />
        </div>
      </Slider>
    </Col>
  </Row>
</Container>

);
}