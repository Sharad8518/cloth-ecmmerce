import React, { useState, useRef, useEffect } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegUser } from "react-icons/fa";
import "./NavbarMenu.css";
import { RiMenu2Fill } from "react-icons/ri";
import { Container, Row, Col, Offcanvas, Accordion } from "react-bootstrap";
import logo from "../../assets/logo.jpeg";
import LoadingBar from "react-top-loading-bar";
import { Link, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { useCart } from "../Context/CartProvider";
import CartOffcanvas from "../Cart/CartOffcanvas/CartOffcanvas";
import MobileLoginOTP from "../User/Auth/MobileLoginOTP";
import CompleteProfile from "../User/CompleteProfile";

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
  const handleCloseCart = () => setCartOpen(false);

  const loadingRef = useRef(null);
  const location = useLocation();

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

  const{ cart ,addToCart, handleIncrease,handleDecrease,handleRemove} = useCart();
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

  return (
    <>
      <div
        className="nav-and-submenu-wrapper"
        onMouseLeave={() => setShowModal(false)}
      >
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
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link
                  to="/categoryProduct"
                  onMouseEnter={() => setShowModal(true)}
                >
                  Clothing
                </Link>
              </li>
              <li
                onMouseEnter={() => setShowModal(true)}
                // onMouseLeave={() => setShowModal(false)}
              >
                <Link
                  to="/categoryProduct"
                  onMouseEnter={() => setShowModal(true)}
                >
                  Womenswear
                </Link>
              </li>
              <li>
                <Link
                  to="/categoryProduct"
                  onMouseEnter={() => setShowModal(true)}
                >
                  Menswear
                </Link>
              </li>
              <li>
                <Link
                  o="/categoryProduct"
                  onMouseEnter={() => setShowModal(true)}
                >
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link
                  o="/categoryProduct"
                  onMouseEnter={() => setShowModal(true)}
                >
                  Saree
                </Link>
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
              <HiOutlineShoppingBag
                className="icon"
                onClick={() => handleOpenCart()}
              />
              {cart?.items?.length > 0 && (
                <span className="cart-badge">{cart?.items?.length||0}</span>
              )}
            </div>
            <FaRegUser className="icon" onClick={()=>handleUserClick()}/>
          </div>
          <LoadingBar
            color="#460201"
            height={3}
            ref={loadingRef}
            shadow={false}
            style={{ position: "absolute", top: 80 }}
          />
        </nav>

        {showModal && (
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
                  {collectionMenu.map((category, idx) => (
                    <Col
                      key={idx}
                      style={{
                        background: idx % 2 === 0 ? "#fff" : "#f5f6fa", // white for even (0,2,4...), gray for odd (1,3,5...)
                        marginLeft: 10,
                      }}
                    >
                      <h6
                        className="submenu-item-header"
                        style={{ marginTop: 20 }}
                      >
                        {category.title}
                      </h6>
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
          <div className="cart-icon" style={{ marginRight: 12 }}>
            <HiOutlineShoppingBag className="icon" />
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </div>
          {/* <FaRegUser className="icon"  style={{left:10}} /> */}
        </div>
      </nav>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="start"
        className="custom-offcanvas"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Collections</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Accordion flush>
            {collectionMenu.map((category, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header>{category.title}</Accordion.Header>
                <Accordion.Body>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {category.subcategories.map((sub, subIndex) => (
                      <li key={subIndex} style={{ padding: "5px 0" }}>
                        {sub}
                      </li>
                    ))}
                  </ul>
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
