import React, { useState, useRef, useEffect } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaRegHeart } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import "./NavbarMenu.css";
import { RiMenu2Fill } from "react-icons/ri";
import {
  Container,
  Row,
  Col,
  Offcanvas,
  Accordion,
  Carousel,
} from "react-bootstrap";
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
import { getPromotion } from "../api/user/PromotionApi";
import { LuUser } from "react-icons/lu";
import { LuCircleUser } from "react-icons/lu";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useFavorites } from "../hooks/useFavorites";
import { LiaUserCircle } from "react-icons/lia";
import { LuHeart } from "react-icons/lu";
import BannerSlider from "../Banner/BannerSlider";
import { getAllTopCollection } from "../api/user/topCollectionApi";

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
  const [promotions, setPromotions] = useState([]);

  const loadingRef = useRef(null);
  const location = useLocation();

  function isTokenExpired(token) {
    if (!token) return true;
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now(); // exp is in seconds
    } catch (e) {
      return true; // invalid or corrupted token
    }
  }
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCollections = async () => {
    try {
      const res = await getAllTopCollection();
      setCollections(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  useEffect(() => {
    const fetchNavbar = async () => {
      try {
        const res = await axios.get(
          "https://house-of-ziba-new-v2.onrender.com/api/user/navbar"
        );
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



  const handleUserClick = () => {
    const token = localStorage.getItem("token"); // assuming accessToken key
    if (!token || isTokenExpired(token)) {
      // 🚪 No token or expired → open login modal
      openModal();
    } else {
      // ✅ Valid token → go to profile page
      navigate("/profile");
    }
  };
  const handleOpenheart = () => {
    const token = localStorage.getItem("token");
    if (!token || isTokenExpired(token)) {
      openModal();
    } else {
      navigate("/favourites");
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getPromotion();
  
        setPromotions(res.data);
      } catch (error) {
      
      }
    };
    fetch();
  }, []);

  const { favorites } = useFavorites();


  return (
    <>
      <div
        className="nav-and-submenu-wrapper"
        onMouseLeave={() => setShowModal(false)}
      >
        {Array.isArray(promotions) &&
          promotions.length > 0 &&
          promotions.map((promo) => (
            <div
              key={promo._id}
              style={{
                background: "linear-gradient(90deg, #ffd700, #ff8c00)",
                color: "#1a1a1a",
                textAlign: "center",
                padding: "8px 18px",
                fontWeight: 600,
                fontSize: "13px",
                letterSpacing: "0.5px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                position: "sticky",
                top: 0,
                zIndex: 999,
              }}
            >
              {promo.topBannerText}{" "}
              {Array.isArray(promo.promoOffers) &&
                promo.promoOffers.map((offer, index) => (
                  <span key={index}>
                    <span style={{ margin: "0 8px" }}>|</span>
                    {offer.condition} → {offer.reward}
                  </span>
                ))}
            </div>
          ))}
        <nav
          className="navbar"
          style={{
            paddingLeft: 50,
            paddingRight: 50,
            paddingTop: 20,
            paddingBottom: 10,
          }}
        >
          <div className="navbar-left">
            {/* <h2 className="logo">ShopMate</h2> */}
            <Link
              to={`/`}
              style={{
                color: "#460201",
                textDecoration: "none",
                fontSize: 28,
                fontWeight: "600",
                fontFamily: "'Playfair', serif",
              }}
            >
              HOUSE Of ZIBA
            </Link>
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
                  // onMouseLeave={() => {
                  //   setActiveHeader(null);

                  // }}
                  style={{ position: "relative" }}
                >
                  {header?.title === "Home" ? (
                    <Link to={`/`}>{header?.title}</Link>
                  ) : header?.slug === "/new-in" ? (
                    <Link to={`/newIn`}>{header?.title}</Link>
                  ) : header?.slug === "/sale" ? (
                    <Link to={`/sale/${header.title}`}>{header?.title}</Link>
                  ) : (
                    <Link>{header?.title}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="navbar-right">
            {/* ✅ Cart Icon with Badge */}
            <div className="cart-icon">
              <LuHeart className="icon" onClick={() => handleOpenheart()} />
              {cart?.items?.length > 0 && (
                <span className="cart-badge">{favorites?.length || 0}</span>
              )}
            </div>

            <div className="cart-icon">
              <HiOutlineShoppingBag
                className="icon"
                onClick={() => handleOpenCart()}
              />
              {cart?.items?.length > 0 && (
                <span className="cart-badge">{cart?.items?.length || 0}</span>
              )}
            </div>
            <LiaUserCircle
              size={25}
              className="icon"
              onClick={() => handleUserClick()}
            />
          </div>
          <LoadingBar
            color="#460201"
            height={2}
            ref={loadingRef}
            shadow={false}
            style={{
              position: "absolute",
              top: promotions.length > 0 ? 115 : 77,
            }}
          />
        </nav>

        {showModal && activeHeader && (
          <div
            style={{ top: promotions.length > 0 ? 100 : 70 }}
            className="submenu-model"
            onMouseEnter={() => setShowModal(true)}
            onMouseLeave={() => setShowModal(false)}
          >
            <div
              className="submenu-container-modal mx-auto d-block"
              onMouseEnter={() => setShowModal(true)}
              onMouseLeave={() => setShowModal(false)}
            >
              <Container style={{ width: "95%" }}>
                <Row style={{ flexWrap: "nowrap", overflowX: "auto" }}>
                  {activeHeader.categories.map((category, idx) => (
                    <>
                      <Col
                        key={category._id}
                        style={{
                          minWidth: "200px",
                          marginRight: "20px",
                          background: idx % 2 === 0 ? "#fff" : "#f5f6fa",
                          padding: "10px",
                          borderRadius: "4px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
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
                            <li key={sub._id} style={{ marginTop: 6 }}>
                              <Link
                                to={`${activeHeader.slug}/${category.name}/${sub.name}`}
                              >
                                {sub.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </Col>
                      <Col
                        style={{
                          minWidth: "200px",
                          marginRight: "20px",
                          padding: 10,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {category.image && (
                          <img
                            src={category.image} // replace with your image URL
                            onClick={() => {
                              navigate(`${activeHeader.slug}/${category.name}`);
                            }}
                            alt="Promo"
                            style={{
                              maxWidth: "100%",
                              height: "250px",
                              objectFit: "contain",
                              borderRadius: "4px",
                            }}
                          />
                        )}
                      </Col>
                    </>
                  ))}
                </Row>
              </Container>
            </div>
          </div>
        )}
      </div>

      <nav
        className="navbar-mobile"
        style={{
          zIndex: 9,
          backgroundColor: "#fff",
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "60%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <RiMenu2Fill
            size={25}
            style={{ marginLeft: "10px" }}
            onClick={handleShow}
          />

          <Link
            to={`/`}
            style={{
              color: "#460201",
              textDecoration: "none",
              fontSize: 22,
              fontWeight: "600",
              marginLeft: 10,
              fontFamily: "'Playfair', serif",
            }}
          >
            House of Ziba
          </Link>
        </div>
        <div
          style={{
            marginRight: 10,
            display: "flex",
            width: "40%",
            justifyContent: "flex-end",
          }}
        >
          {/* ✅ Cart Icon with Badge */}
          <div className="cart-icon" style={{ marginRight: 10 }}>
            <LuHeart className="icon" onClick={() => handleOpenheart()} />
            {favorites?.length > 0 && (
              <span className="cart-badge">{favorites?.length || 0}</span>
            )}
          </div>

          <div className="cart-icon">
            <HiOutlineShoppingBag
              className="icon"
              onClick={() => handleOpenCart()}
            />
            {cart?.items?.length > 0 && (
              <span className="cart-badge">{cart?.items?.length || 0}</span>
            )}
          </div>
          <LiaUserCircle
            className="icon"
            size={25}
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
          <Offcanvas.Title
            className="text-lg font-semibold text-gray-800"
            style={{
              fontFamily: "'Playfair', serif",
              fontSize: 25,
              color: "#460201",
            }}
          >
            House of Ziba
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Carousel fade interval={4000}>
          {collections?.map((slide) => (
            <Carousel.Item key={slide._id}>
              <img
                className={`d-block w-100`}
                src={slide.image}
                alt={slide.title}
                style={{ height: 150 }}
                onClick={() =>
                  navigate("/collection1", {
                    state: { product: slide.product },
                  })
                }
              />
              {/* <Carousel.Caption className={styles.caption}>
            <h3>{slide.title}</h3>
            <p>{slide.description}</p>
          </Carousel.Caption>  */}
            </Carousel.Item>
          ))}
        </Carousel>

        <Offcanvas.Body className="p-0">
          <Accordion flush alwaysOpen>
            {collectionMenu.map((header) => {
              // Categories that have subcategories
              const availableCategories = header.categories.filter(
                (cat) => cat.subCategories && cat.subCategories.length > 0
              );

              return (
                <>
                  {header?.title === "Home" ? (
                    <div
                      style={{
                        height: 50,
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid rgba(181, 181, 181, 0.5)",
                      }}
                    >
                      <Link
                        to={`/`}
                        style={{
                          textDecoration: "none",
                          marginLeft: 20,
                          color: "black",
                        }}
                      >
                        Home
                      </Link>
                    </div>
                  ) : header?.slug === "/new-in" ? (
                    <div
                      style={{
                        height: 50,
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid rgba(181, 181, 181, 0.5)",
                      }}
                    >
                      <Link
                        to={`/newIn`}
                        style={{
                          textDecoration: "none",
                          marginLeft: 20,
                          color: "black",
                        }}
                      >
                        New In
                      </Link>
                    </div>
                  ) : header?.slug === "/sale" ? (
                    <div
                      style={{
                        height: 50,
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "1px solid rgba(181, 181, 181, 0.5)",
                      }}
                    >
                      <Link
                        to={`/sale/${header.title}`}
                        style={{
                          textDecoration: "none",
                          marginLeft: 20,
                          color: "black",
                        }}
                      >
                        {header.title}
                      </Link>
                    </div>
                  ) : (
                    <Accordion.Item eventKey={header._id} key={header._id}>
                      <Accordion.Header>
                        <span className="font-medium text-gray-700">
                          {header.title}
                        </span>
                      </Accordion.Header>

                      {/* Only show body if categories exist */}
                      {availableCategories.length > 0 && (
                        <Accordion.Body className="bg-gray-50">
                          {availableCategories.map((cat) => (
                            <div key={cat._id} className="mb-4">
                              {/* <p className="text-sm font-semibold text-orange-500 mb-2">
                                {cat.name}
                              </p> */}
                              <ul
                                className="space-y-1"
                                style={{ listStyle: "none" }}
                              >
                                {cat.subCategories.map((sub) => (
                                  <li
                                    key={sub._id}
                                    style={{
                                      marginTop: 10,
                                      borderBottom: "0.5px solid #000",
                                      padding: 5,
                                    }}
                                  >
                                    <Link
                                      to={`${header.slug}/${cat.name}/${sub.name}`}
                                      className="block text-gray-700 hover:text-orange-500 text-sm transition-colors duration-200"
                                      style={{
                                        textDecoration: "none",
                                        color: "#000",
                                      }}
                                    >
                                      {sub.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </Accordion.Body>
                      )}
                    </Accordion.Item>
                  )}
                </>
              );
            })}
          </Accordion>
        </Offcanvas.Body>
        {!token ||
          (isTokenExpired(token) && (
            <div
              style={{
                position: "absolute",
                height: 50,
                backgroundColor: "#eaeaeaff",
                bottom: 0,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                handleUserClick();
                handleClose();
              }}
            >
              <h6 style={{ marginTop: 5 }}>
                <LuCircleUser /> Sign In
              </h6>
            </div>
          ))}
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
