import React, { useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import "./NavbarMenu.css";
import { RiMenu2Fill } from "react-icons/ri";
import { Container, Row, Col } from "react-bootstrap";
import logo from "../../assets/logo.jpeg"
const collectionMenu = [
  {
    title: "CO-ORDS SET",
    subcategories: ["All Co-ords Set"],
  },
  {
    title: "Sarees",
    subcategories: [
      "Silk Saree",
      "Cotton Saree",
      "Chiffon/Georgette Saree",
      "Banarasi Saree",
      "Kanjeevaram Saree",
      "Bandhani Saree",
      "Linen Saree",
      "Embroidered Saree",
      "Half & Half Saree",
    ],
  },
  {
    title: "Kurtis & Kurtas",
    subcategories: [
      "Anarkali",
      "Straight Cut",
      "High-low",
      "Asymmetric",
      "Short Kurti",
      "Long Kurti",
      "Angrakha Style",
    ],
  },
  {
    title: "Salwar Suits",
    subcategories: [
      "Patiala Suit",
      "Churidar Suit",
      "Palazzo Suit",
      "Sharara Suit",
      "Pakistani Suit",
      "Straight Suit",
      "Anarkali Suit",
    ],
  },
  {
    title: "Lehengas",
    subcategories: [
      "Bridal Lehenga",
      "Party Wear Lehenga",
      "Crop Top Lehenga",
      "Jacket Lehenga",
      "Circular / Flared Lehenga",
      "A-Line Lehenga",
    ],
  },
  {
    title: "Fusion Wear",
    subcategories: [
      "Kurti with Jeans",
      "Indo-Western Dresses",
      "Dhoti Pants with Tops",
      "Saree Gowns",
    ],
  },
];

export default function NavbarMenu() {
  const cartItemCount = 3; // Replace with dynamic value from state/store
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <nav className="navbar" >
        <div className="navbar-left">
          {/* <h2 className="logo">ShopMate</h2> */}
          <img src={logo} style={{width:60}} />
        </div>

        <div className="navbar-center">
          <ul className="nav-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li
              onMouseEnter={() => setShowModal(true)}
              onMouseLeave={() => setShowModal(false)}
            >
              <a href="/collections">Clothing</a>
            </li>
            <li
             onMouseEnter={() => setShowModal(true)}
              onMouseLeave={() => setShowModal(false)}
            >
              <a href="/collections">Womenswear</a>
            </li>
            <li
             onMouseEnter={() => setShowModal(true)}
              onMouseLeave={() => setShowModal(false)}
            >
              <a href="/collections">Menswear</a>
            </li>
            <li
             onMouseEnter={() => setShowModal(true)}
              onMouseLeave={() => setShowModal(false)}
            >
              <a href="/collections">Bestsellers</a>
            </li>
            <li
             onMouseEnter={() => setShowModal(true)}
              onMouseLeave={() => setShowModal(false)}
            >
              <a href="/collections">Saree</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        <div className="navbar-right">
          {/* ✅ Cart Icon with Badge */}
          <div className="cart-icon">
            <HiOutlineShoppingBag className="icon" />
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </div>
          <FaRegUser className="icon" />
        </div>
      </nav>

      <nav className="navbar-mobile">
        <RiMenu2Fill size={25} style={{ marginLeft: "10px" }} />

        <h2 className="logo-mobile">ShopMate</h2>
        <div style={{ marginRight: 10, display: "flex" }}>
          {/* ✅ Cart Icon with Badge */}
          <div className="cart-icon" style={{ marginRight: 12 }}>
            <HiOutlineShoppingBag className="icon" />
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </div>
          {/* <FaRegUser className="icon"  style={{left:10}} /> */}
        </div>
      </nav>

      {showModal && (
        <div className="submenu-model">
          <div
            className="submenu-container-modal mx-auto d-block"
            onMouseEnter={() => setShowModal(true)}
            onMouseLeave={() => setShowModal(false)}
          >
            <Container>
            <Row>
  {collectionMenu.map((category, idx) => (
    <Col
      key={idx}
      style={{
        background: idx % 2 === 0 ? "#fff" : "#f5f6fa", // white for even (0,2,4...), gray for odd (1,3,5...)
        marginLeft: 10
      }}
    >
      <h6 className="submenu-item-header" style={{marginTop:20}}>{category.title}</h6>
      <ul>
        {category.subcategories.map((item, subIdx) => (
          <li key={subIdx}>
            <a href="">{item}</a>
          </li>
        ))}
      </ul>
    </Col>
  ))}
</Row>
            </Container>
          </div>
        </div>
      )}
    </>
  );
}
