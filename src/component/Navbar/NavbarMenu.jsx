import React, { useState, useRef, useEffect } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import "./NavbarMenu.css";
import { RiMenu2Fill } from "react-icons/ri";
import { Container, Row, Col, Offcanvas, Accordion } from "react-bootstrap";
import logo from "../../assets/logo.jpeg";
import LoadingBar from "react-top-loading-bar";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useCart } from "../Context/CartProvider";
import CartOffcanvas from "../Cart/CartOffcanvas/CartOffcanvas";
import MobileLoginOTP from "../User/Auth/MobileLoginOTP";
import CompleteProfile from "../User/CompleteProfile";
import axios from "axios";

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
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const { getCartCount } = useCart();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [cartOpen, setCartOpen] = useState(false);
  const handleOpenCart = () => setCartOpen(true);
  const [activeHeader, setActiveHeader] = useState(null);
  const handleCloseCart = () => setCartOpen(false);
  const [collectionMenu, setCollectionMenu] = useState([]);

  const loadingRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        const res = await axios.get("https://houseofziba-nodejs.onrender.com/api/user/navbar");
        const menu = res.data.map((header) => ({
          ...header,
          categories: header?.categories?.map((cat) => ({
            ...cat,
            subCategories: cat?.subCategories?.map((sub) => ({ ...sub })),
          })),
        }));
        setCollectionMenu(menu);
      } catch (err) {
        console.error("Failed to fetch navbar data:", err);
      }
    };
    fetchNavbar();
  }, []);

  useEffect(() => {
    // Start loading when route changes
    loadingRef.current.continuousStart();
    // Simulate a short load time before completing
    const timer = setTimeout(() => {
      loadingRef.current.complete();
    }, 500);

    return () => clearTimeout(timer);
  }, [location]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const navigate = useNavigate();

  const { cart, addToCart, handleIncrease, handleDecrease, handleRemove } =
    useCart();
  const token = localStorage.getItem("token");

  console.log("Cart items:", cart.items || []);

  const handleUserClick = () => {
    if (!token) {
      // 🚪 No token → open login modal
      openModal();
    } else {
      // ✅ User logged in → go to profile page
      navigate("/profile");
    }
  };

  console.log("activeHeader", activeHeader);

  return (
    <>
      <div
        className="nav-and-submenu-wrapper"
        onMouseLeave={() => setShowModal(false)}
      >
        <div
          style={{
            background: "linear-gradient(90deg, #ffd700, #ff8c00)", // golden gradient
            color: "#1a1a1a",
            textAlign: "center",
            padding: "8px 18px",
            fontWeight: "600",
            fontSize: "13px",
            letterSpacing: "0.5px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            position: "sticky",
            top: 0,
            zIndex: 999,
          }}
        >
          Buy 3, Get Rs.3000 Cashback <span style={{ margin: "0 8px" }}>|</span>{" "}
          Buy 5, Get Rs.5000 Cashback
        </div>
        <nav
          className="navbar"
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 20,
            paddingBottom: 10,
          }}
        >
          <div className="navbar-left">
            {/* <h2 className="logo">ShopMate</h2> */}
            <h5 style={{ color: "#460201" }}>HOUSE Of ZIBA</h5>
          </div>

          <div className="navbar-center">
            <ul className="nav-links" style={{ marginTop: 10 }}>
              {collectionMenu.map((header) => (
                <li
                  key={header._id}
                  onMouseEnter={() => {
                    setActiveHeader(header);
                    setShowModal(header.categories.length > 0); // show submenu only if categories exist
                  }}
                  onMouseLeave={() => {
                    setActiveHeader(null);
                    setShowModal(false);
                  }}
                  style={{ position: "relative" }}
                >
                  <Link to={`/categoryProduct`}>{header.title}</Link>

                  {/* Submenu for categories & subcategories */}
                  {/* {activeHeader === header && header.categories.length > 0 && (
                  <div className="submenu" style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    background: "#fff",
                    padding: "10px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                    zIndex: 1000,
                  }}>
                    <Row>
                      {header.categories.map((cat) => (
                        <Col key={cat._id} style={{ minWidth: "200px", marginRight: "20px" }}>
                          <strong>{cat.name}</strong>
                          {cat.subCategories.length > 0 && (
                            <ul style={{ paddingLeft: 0, listStyle: "none" }}>
                              {cat.subCategories.map((sub) => (
                                <li key={sub._id}>
                                  <Link to={`/${sub.slug}`}>{sub.name} f</Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </Col>
                      ))}
                    </Row>
                  </div>
                )} */}
                </li>
              ))}

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
              <HiOutlineShoppingBag
                className="icon"
                onClick={() => handleOpenCart()}
              />
              {cart?.items?.length > 0 && (
                <span className="cart-badge">{cart?.items?.length || 0}</span>
              )}
            </div>
            <FaRegUser className="icon" onClick={() => handleUserClick()} />
          </div>
          <LoadingBar
            color="#460201"
            height={2}
            ref={loadingRef}
            shadow={false}
            style={{ position: "absolute", top: 113 }}
          />
        </nav>

        {/* {showModal && (
          <div
            className="submenu-model"
            onMouseEnter={() => setShowModal(true)}
          >
            <div
              className="submenu-container-modal mx-auto d-block"
              onMouseEnter={() => setShowModal(true)}
              onMouseLeave={() => setShowModal(false)}
            >
              <Container>
                <Row>
                  {showModal && activeHeader && (
                    <div className="submenu-model">
                      <div className="submenu-container-modal">
                        <Container>
                          <Row>
                            <Col>
                              <h6>{activeHeader.title}</h6>
                              <ul>
                                {activeHeader.subcategories.map((sub, idx) => (
                                  <li key={idx}>
                                    <Link to={`/categoryProduct/${sub}`}>
                                      {sub}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </Col>
                          </Row>
                        </Container>
                      </div>
                    </div>
                  )}
                </Row>
              </Container>
            </div>
          </div>
        )} */}

        {showModal && activeHeader && (
          <div
            className="submenu-model"
            onMouseEnter={() => setShowModal(true)}
            onMouseLeave={() => setShowModal(false)}
          >
            <div
              className="submenu-container-modal mx-auto d-block"
              onMouseEnter={() => setShowModal(true)}
              onMouseLeave={() => setShowModal(false)}
            >
              <Container style={{ width: "70%" }}>
                <Row style={{ flexWrap: "nowrap", overflowX: "auto" }}>
                  {activeHeader.categories.map((category, idx) => (
                    <Col
                      key={category._id}
                      style={{
                        minWidth: "200px",
                        marginRight: "20px",
                        background: idx % 2 === 0 ? "#fff" : "#f5f6fa",
                        padding: "10px",
                        borderRadius: "4px",
                      }}
                    >
                      <h6 className="submenu-item-header">{category.name}</h6>
                      <ul
                        style={{
                          listStyle: "none",
                          paddingLeft: 0,
                          marginTop: "10px",
                        }}
                      >
                        {category.subCategories.map((sub) => (
                          <li key={sub._id}>
                            <Link to={`/${sub.slug}`}>{sub.name}</Link>
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
      </div>

      <nav
        className="navbar-mobile"
        style={{ backgroundColor: "#fff", zIndex: 9 }}
      >
        <RiMenu2Fill
          size={25}
          style={{ marginLeft: "10px" }}
          onClick={handleShow}
        />

        <h2 className="logo-mobile">ShopMate</h2>
        <div style={{ marginRight: 10, display: "flex" }}>
          {/* ✅ Cart Icon with Badge */}
          <div className="cart-icon">
            <HiOutlineShoppingBag
              className="icon"
              onClick={() => handleOpenCart()}
            />
            {cart?.items?.length > 0 && (
              <span className="cart-badge">{cart?.items?.length || 0}</span>
            )}
          </div>
          <FaRegUser
            className="icon"
            onClick={() => handleUserClick()}
            style={{ marginLeft: 10 }}
          />
        </div>
      </nav>

     <Offcanvas
      show={show}
      onHide={handleClose}
      placement="start"
      className="custom-offcanvas shadow-lg"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="text-lg font-semibold text-gray-800">
          Collections
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="p-0">
        <Accordion flush alwaysOpen>
          {collectionMenu.map((header) => (
            <Accordion.Item eventKey={header._id} key={header._id}>
              <Accordion.Header>
                <span className="font-medium text-gray-700">{header.title}</span>
              </Accordion.Header>
              <Accordion.Body className="bg-gray-50">
                {header.categories.map((cat) => (
                  <div key={cat._id} className="mb-4" style={{color:""}}>
                    <p className="text-sm font-semibold text-orange-500 mb-2">
                      {cat.name}
                    </p>
                    {cat.subCategories.length > 0 && (
                      <ul className="space-y-1" style={{listStyle:"none"}}>
                        {cat.subCategories.map((sub) => (
                          <li key={sub._id}>
                            <Link
                              to={`/categoryProduct`}
                              className="block text-gray-700 hover:text-orange-500 text-sm transition-colors duration-200"
                              style={{textDecoration:"none",color:"#000"}}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Offcanvas.Body>
    </Offcanvas>
      <CartOffcanvas
        show={cartOpen}
        cart={cart}
        handleClose={handleCloseCart}
        addToCart={addToCart}
        increaseQty={handleIncrease}
        decreaseQty={handleDecrease}
        removeFromCart={handleRemove}
      />
      <MobileLoginOTP isOpen={isOpen} closeModal={closeModal} />
    </>
  );
}
