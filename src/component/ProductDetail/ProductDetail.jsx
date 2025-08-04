import React, { useState } from "react";
import { Container, Row, Col,Accordion, Navbar } from "react-bootstrap";
import styles from "./ProductDetail.module.css";
import VerticalImageSelector from "../layout/VerticalImageSelector/VerticalImageSelector";
import { BiCloset } from "react-icons/bi";
import { BsClipboard } from "react-icons/bs";
import { FaRegClipboard } from "react-icons/fa";
import { FaExclamation } from "react-icons/fa"
import { BsPatchExclamation } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { LuArrowRightLeft } from "react-icons/lu";
import NavbarMenu from "../Navbar/NavbarMenu";
import Frequently from "../Frequently&Similar/Frequently/Frequently";
import Footer from "../Footer/Footer";
const images = [
  "https://rangreza.net/cdn/shop/files/Cross-Stitch-0123Rtsprtlwn0208-Arnit-Blush-3Pc-Embroidered-Lawn-Suit-Rangreza-7630.jpg?v=1711008689",
  "https://saraclothes.com/cdn/shop/products/0122RTSEMBCHFENG0307_2_900x_b148d834-06c8-407b-9d5c-2c43afce9cae.jpg?v=1665422628",
  "https://hooraindesignerwear.com/cdn/shop/files/lawn_0001__DSF5232.jpg?v=1746542397",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPX31HYGXcBBlpzXej6EcvoT1LFZOU6r3BHxYS0AsZEgTWKDoE-qi9CH4JtsHi8qASuSE&usqp=CAU",
  "https://saraclothes.com/cdn/shop/products/0122RTSEMBCHFENG0105_2_900x_e469cd45-760c-41ef-a32b-9bdc653d82a5.jpg?v=1643458385",
];

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState(
    "https://rangreza.net/cdn/shop/files/Cross-Stitch-0123Rtsprtlwn0208-Arnit-Blush-3Pc-Embroidered-Lawn-Suit-Rangreza-7630.jpg?v=1711008689"
  );
  console.log("selectedImage", selectedImage);
  const sizes = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "3XL",
    "Speak To A Stylelist",
  ];

  const frequentlyBought = [
  {
    id: 1,
    image: 'https://i.pinimg.com/236x/e3/85/0b/e3850b4b4541f34d9050394a157b28de.jpg',
    price:'4500',
    title: 'Wireless Headphones'
  },
  {
    id: 2,
    image: 'https://i.pinimg.com/236x/e3/85/0b/e3850b4b4541f34d9050394a157b28de.jpg',
     price:'4500',
    title: 'Phone Case'
  },
  {
    id: 3,
    image: 'https://i.pinimg.com/236x/e3/85/0b/e3850b4b4541f34d9050394a157b28de.jpg',
     price:'4500',
    title: 'Charging Cable'
  },
   {
    id: 4,
    image: 'https://i.pinimg.com/236x/e3/85/0b/e3850b4b4541f34d9050394a157b28de.jpg',
     price:'450',
    title: 'Charging Cable'
  },

   {
    id: 5,
    image: 'https://i.pinimg.com/236x/e3/85/0b/e3850b4b4541f34d9050394a157b28de.jpg',
     price:'480',
    title: 'Charging Cable'
  },

   {
    id: 5,
    image: 'https://i.pinimg.com/236x/e3/85/0b/e3850b4b4541f34d9050394a157b28de.jpg',
     price:'850',
    title: 'Charging Cable'
  },

    {
    id: 6,
    image: 'https://i.pinimg.com/236x/e3/85/0b/e3850b4b4541f34d9050394a157b28de.jpg',
     price:'400',
    title: 'Charging Cable'
  },

   {
    id: 7,
    image: 'https://i.pinimg.com/236x/e3/85/0b/e3850b4b4541f34d9050394a157b28de.jpg',
     price:'400',
    title: 'Charging Cable'
  }
];

  const [selectedSize, setSelectedSize] = useState(null);
   const [activeKeys, setActiveKeys] = useState([]);

  const toggleKey = (key) => {
    setActiveKeys((prev) =>
      prev.includes(key)
        ? prev.filter((k) => k !== key) // close
        : [...prev, key]                // open
    );
  };
  return (
    <>
   <NavbarMenu/>
    <Container className={styles.ProductDetailContainer} fluid>
      <Row style={{ height: "100%" }}>
        <Col
          md={1}
          style={{ display: "flex", alignItems: "center", height: "100%" }}
        >
          <VerticalImageSelector images={images} onSelect={setSelectedImage} />
        </Col>
        <Col md={5} style={{ height: "100%" }}>
          <img src={selectedImage} className={styles.productDetailImg} />
        </Col>
        <Col md={5}  className={styles.productContentBox}>
          <h3 className={styles.detailProductTitle}> Animaka Khana</h3>
          <div className={styles.detailProductDiscreaption}>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout
          </div>
          <div className={styles.detailPrize}>Rs. 785.45</div>
          <div className={styles.detailMRP}>MRP Inclusive of all size</div>
          <hr />
          <div className={styles.detailSizeText}>
            SELECT YOUR SIZE
            <div className={styles.detailSizeGuideText}>Size Guide</div>
          </div>
          <div className={styles.detailMadeToOrderText}>
            <BiCloset size={20} /> Made To Order
          </div>
          <div className={styles.detailShip}>Ship by 11th November 2025</div>
          <div className={styles.container}>
            {sizes.map((size) => (
              <button
                key={size}
                className={`${styles.sizeButton} ${
                  selectedSize === size ? styles.active : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <div style={{display:"flex",justifyContent:"space-between",width:"100%",marginTop:20,flexWrap:"wrap"}}>
           <button className={styles.detailAddCartButton}>
            Add To Cart
           </button>
            <button  className={styles.detailBuyButton}>
            Buy Now
           </button>
          </div>
          <div className={styles.detailProductInfo}>Product Information</div>
           <Accordion activeKey={activeKeys} style={{marginTop:10,border:"none"}}>
      <Accordion.Item eventKey="0" style={{border:"none"}}>
        <Accordion.Header onClick={() => toggleKey("0")} >
          <BiDetail size={20} style={{fontWeight:"bold",marginTop:-3,marginRight:10}} />
          <div className={styles.productDetailHeading}>     Product Details</div>
        </Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1"style={{border:"none"}}>
        <Accordion.Header onClick={() => toggleKey("1")}>
          <BsPatchExclamation  size={20} style={{fontWeight:"bold",marginTop:-3,marginRight:10}} />
            <div className={styles.productDetailHeading}>
          Know your product </div></Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2"style={{border:"none"}}>
        <Accordion.Header onClick={() => toggleKey("2")}>
          <div className={styles.productDetailHeading}>
               <FaRegUser  size={20} style={{fontWeight:"bold",marginTop:-3,marginRight:10}} />
          Vendor details
          </div>
          </Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>

        <Accordion.Item eventKey="3"style={{border:"none"}} onClick={() => toggleKey("3")}>
        <Accordion.Header>
          <div className={styles.productDetailHeading}>
              <LuArrowRightLeft   size={20} style={{fontWeight:"bold",marginTop:-3,marginRight:10}} />
          Return and exchanges policy
          </div>
          </Accordion.Header>
        <Accordion.Body>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
        </Col>
       <Col md={1}>
       </Col>
      </Row>
    </Container>
    <Frequently items={frequentlyBought}/>
    <Footer/>
    </>
  );
}
