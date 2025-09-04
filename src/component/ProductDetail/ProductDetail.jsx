import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Accordion,
  Navbar,
  Button,
  Form,
} from "react-bootstrap";
import styles from "./ProductDetail.module.css";
import VerticalImageSelector from "../layout/VerticalImageSelector/VerticalImageSelector";
import HorizontalImageSelector from "../layout/HorizontalImageSelector/HorizontalImageSelector";
import { BiCloset } from "react-icons/bi";
import { BsClipboard } from "react-icons/bs";
import { FaRegClipboard } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { FaExclamation } from "react-icons/fa";
import { BsPatchExclamation } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { LuArrowRightLeft } from "react-icons/lu";
import NavbarMenu from "../Navbar/NavbarMenu";
import Frequently from "../Frequently&Similar/Frequently/Frequently";
import Footer from "../Footer/Footer";
import SimilarProducts from "../AllProduct/SimilarProduct/SimilarProducts";
import CustomerReviews from "../CustomerReview/CustomerReviews";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { getProductById } from "../api/user/Productapi";
import { useCart } from "../Context/CartProvider";
import Lottie from "lottie-react";
import loadingAnimation from "../../assets/Anim/loading.json";
import CartOffcanvas from "../Cart/CartOffcanvas/CartOffcanvas";
import MobileLoginOTP from "../User/Auth/MobileLoginOTP";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const images = [
  "https://img.theloom.in/pwa/catalog/product/cache/e442fb943037550e0d70cca304324ade/v/j/vj304fs25-01kpfuchsiavj30_7_.jpg?tr=c-at_max,w-800,h-1066",
  "https://img.theloom.in/pwa/catalog/product/cache/e442fb943037550e0d70cca304324ade/v/j/vj304fs25-01kpfuchsiavj30_2_.jpg?tr=c-at_max,w-800,h-1066",
  "https://img.theloom.in/pwa/catalog/product/cache/e442fb943037550e0d70cca304324ade/v/j/vj304fs25-01kpfuchsiavj30_8_.jpg?tr=c-at_max,w-800,h-1066",
  "https://img.theloom.in/pwa/catalog/product/cache/e442fb943037550e0d70cca304324ade/v/j/vj304fs25-01kpfuchsiavj30_3_.jpg?tr=c-at_max,w-800,h-1066",
  "https://img.theloom.in/pwa/catalog/product/cache/e442fb943037550e0d70cca304324ade/v/j/vj304fs25-01kpfuchsiavj30_4_.jpg?tr=c-at_max,w-800,h-1066",
];

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const {
    cart,
    handleAddToCart,
    buyNow,
    addToCart,
    handleIncrease,
    handleDecrease,
    handleRemove,
  } = useCart();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const handleCloseCart = () => setCartOpen(false);
  const handleOpenCart = () => setCartOpen(true);
  const sliderRef = useRef(null);
  const handleSelectImage = (index) => {
    setSelectedIndex(index);
    sliderRef.current?.slickGoTo(index); // ✅ correct usage
  };

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
      image:
        "https://i.pinimg.com/236x/e3/85/0b/e3850b4b4541f34d9050394a157b28de.jpg",
      price: "4500",
      title: "Wireless Headphones",
    },
    {
      id: 2,
      image:
        "https://i.pinimg.com/236x/e3/85/0b/e3850b4b4541f34d9050394a157b28de.jpg",
      price: "4500",
      title: "Phone Case",
    },
    {
      id: 3,
      image:
        "https://i.pinimg.com/236x/e3/85/0b/e3850b4b4541f34d9050394a157b28de.jpg",
      price: "4500",
      title: "Charging Cable",
    },
    {
      id: 4,
      image:
        "https://i.pinimg.com/236x/e3/85/0b/e3850b4b4541f34d9050394a157b28de.jpg",
      price: "450",
      title: "Charging Cable",
    },

    {
      id: 5,
      image:
        "https://i.pinimg.com/236x/e3/85/0b/e3850b4b4541f34d9050394a157b28de.jpg",
      price: "480",
      title: "Charging Cable",
    },

    {
      id: 5,
      image:
        "https://i.pinimg.com/236x/e3/85/0b/e3850b4b4541f34d9050394a157b28de.jpg",
      price: "850",
      title: "Charging Cable",
    },

    {
      id: 6,
      image:
        "https://i.pinimg.com/236x/e3/85/0b/e3850b4b4541f34d9050394a157b28de.jpg",
      price: "400",
      title: "Charging Cable",
    },

    {
      id: 7,
      image:
        "https://i.pinimg.com/236x/e3/85/0b/e3850b4b4541f34d9050394a157b28de.jpg",
      price: "400",
      title: "Charging Cable",
    },
  ];

  const similarProduct = [
    {
      id: 1,
      title: "Embroidered Kurti",
      description: "Elegant full-sleeve cotton kurti with fine threadwork.",
      image:
        "https://www.lavanyathelabel.com/cdn/shop/files/1_b92e1b57-fca7-4d01-9a81-284b4b69234b_1200x.jpg?v=1753948664",
      price: 1299,
    },
    {
      id: 2,
      title: "Floral Saree",
      description: "Chiffon saree with pastel floral prints.",
      image:
        "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2024/AUGUST/26/o3koKWHF_97d3912bdd2a4e2fa29356d5aaf6c21d.jpg",
      price: 1899,
    },
    {
      id: 3,
      title: "Maxi Dress",
      description: "Soft rayon maxi dress, ideal for evening wear.",
      image:
        "https://www.vastranand.in/cdn/shop/files/1_871d6045-82d0-4209-b464-46ce51a4c7f3.jpg?v=1743078107",
      price: 1499,
    },
    {
      id: 4,
      title: "Denim Jacket",
      description: "Cropped denim jacket for casual layering.",
      image:
        "https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/2024/OCTOBER/21/6yluxQL3_d01b23632c1c409ba30c65d6ecb9ca15.jpg",
      price: 999,
    },
  ];

  const reviews = [
    {
      id: 1,
      name: "Ayesha K.",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      comment:
        "Absolutely love the saree! The fabric is soft and delivery was quick.",
      date: "August 1, 2025",
    },
    {
      id: 2,
      name: "Meera P.",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 4,
      comment:
        "Kurti quality is great. Slightly tight on the arms but overall beautiful.",
      date: "July 28, 2025",
    },
    {
      id: 3,
      name: "Nikita R.",
      image: "https://randomuser.me/api/portraits/women/22.jpg",
      rating: 5,
      comment: "Loved the embroidery! Great fit and stylish look.",
      date: "July 20, 2025",
    },
  ];

  const generatePaddingSku = (baseSku, padding) => {
    if (!padding) return baseSku;
    // Combine base SKU + measurements + unit
    return `${baseSku}-W${padding.waist || "0"}-L${padding.length || "0"}-H${
      padding.height || "0"
    }-${padding.unit || "cm"}`;
  };

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeKeys, setActiveKeys] = useState([]);

  const { id } = useParams(); // ✅ get product id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paddingRequired, setPaddingRequired] = useState("No");
  const [isPaddingModalOpen, setIsPaddingModalOpen] = useState(false);
  const [answer, setAnswer] = useState(null);
  const [paddingDetails, setPaddingDetails] = useState({
    bust: "",
    waist: "",
    hip: "",
    length: "",
    height: "",
    unit: "cm",
  });
  const [savedPaddingDetails, setSavedPaddingDetails] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProductById(id); // ✅ API call
        console.log(response);
        setProduct(response?.product); // depends on API structure
        setSelectedImage(response?.product?.media[0].url); // set first image
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleSelectChange = (field, value) => {
    setPaddingDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  console.log("product", product);

  const handleSelect = (value) => {
    setAnswer(value);
    if (value === "yes") {
      setIsPaddingModalOpen(true);
    }
  };

  const toggleKey = (key) => {
    setActiveKeys(
      (prev) =>
        prev.includes(key)
          ? prev.filter((k) => k !== key) // close
          : [...prev, key] // open
    );
  };

  const token = localStorage.getItem("token");
  console.log("selectedSize", selectedSize);
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          background: "#fff", // optional
        }}
      >
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          autoplay={true}
          style={{ width: 200, height: 200 }}
        />
        <p style={{ marginTop: "1rem", fontSize: "18px", color: "#333" }}>
          Please wait, loading...
        </p>
      </div>
    ); // or a spinner component
  }

  function getDateAfterDays(days) {
    const date = new Date();
    date.setDate(date.getDate() + days);

    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <>
      <NavbarMenu />
      <br /> <br />
     
      <Container className={styles.ProductDetailContainer}>
        <Row style={{ height: "100%" }}>
          <Col md={1} className={styles.vericalImage}>
            {product?.media?.length > 0 && ( // ✅ check if media exists
              <VerticalImageSelector
                images={product?.media?.map((m) => m?.url)} // ✅ use product media URLs
                onSelect={handleSelectImage}
                selectedIndex={selectedIndex}
              />
            )}
          </Col>
          <Col md={5}>
            <Slider
              ref={sliderRef}
              dots={true} // show navigation dots
              infinite={true} // loop infinitely
              speed={500} // transition speed
              slidesToShow={1} // show 1 slide at a time
              slidesToScroll={1} // scroll 1 slide at a time
              swipeToSlide={true} // enable swipe
              arrows={false} // hide arrows if you want swipe only
              afterChange={(current) => setSelectedIndex(current)} // sync selectedIndex
            >
              {product?.media?.map((m, index) => (
                <div key={index} style={{ height: 300 }}>
                  <img
                    src={m.url}
                    alt={m.alt || `Product image ${index + 1}`}
                    className={styles.productDetailImg}
                  />
                </div>
              ))}
            </Slider>
          </Col>
          <Col md={6} className={styles.productContentBox}>
            <br />
            <div className={styles.mobileHorizantal}>
              <HorizontalImageSelector
                images={product?.media?.map((m) => m?.url)} // ✅ use product media URLs
                onSelect={handleSelectImage}
                selectedIndex={selectedIndex}
              />
            </div>

            <h3 className={styles.detailProductTitle}>{product?.title} </h3>
            <div className={styles.detailProductDiscreaption}>
              {product?.description}
            </div>
            <div className={styles.detailPrize}>Rs. {product?.mrp} /-</div>
            <div className={styles.detailMRP}>MRP Inclusive of all size</div>
            <hr />

            <div className={styles.detailMadeToOrderText}>
              <BiCloset size={20} /> Made To Order
            </div>
            <div className={styles.detailShip}>
              Ship by {getDateAfterDays(product?.estimatedShippingDays)}
            </div>
            <div className={styles.detailSizeText}>
              SELECT YOUR SIZE
              <div className={styles.detailSizeGuideText}>Size Guide</div>
            </div>
            <div className={styles.container}>
              {product?.variants?.map((variant) => (
                <button
                  key={variant?.size}
                  className={`${styles.sizeButton} ${
                    selectedSize?.size === variant?.size ? styles.active : ""
                  }`}
                  onClick={() => setSelectedSize(variant)}
                >
                  {variant.size}
                </button>
              ))}
            </div>

            <div style={{ display: "flex" }}>
              <span style={{ fontWeight: "700" }}>
                Additional info for better fit
              </span>

              <div style={{ marginTop: "-3px", marginLeft: 10 }}>
                <Button
                  variant={answer === "yes" ? "primary" : "outline-primary"}
                  size="sm"
                  className="me-2"
                  onClick={() => handleSelect("yes")}
                >
                  Yes
                </Button>
                <Button
                  variant={answer === "no" ? "primary" : "outline-primary"}
                  size="sm"
                  onClick={() => handleSelect("no")}
                >
                  No
                </Button>
              </div>
            </div>

            {/* <button
              className={styles.paddingButton}
              onClick={() => setIsPaddingModalOpen(true)}
            >
              {savedPaddingDetails
                ? "Edit better fit"
                : "Additional info for better fit"}
            </button> */}

            {/* Show saved values */}
            {savedPaddingDetails && (
              <div style={{ marginTop: 10 }}>
                <strong>Better fit:</strong> Waist: {savedPaddingDetails.waist}{" "}
                {savedPaddingDetails.unit}, Length: {savedPaddingDetails.length}{" "}
                {savedPaddingDetails.unit}, Height: {savedPaddingDetails.height}{" "}
                {savedPaddingDetails.unit}{" "}
                <button
                  style={{
                    marginLeft: 10,
                    color: "red",
                    backgroundColor: "#fff",
                    border: "none",
                  }}
                  onClick={() => setSavedPaddingDetails(null)}
                >
                  Delete
                </button>
              </div>
            )}

            <div className={styles.detailButtonBar}>
              {(cart?.items || []).some(
                (item) => item.variant?.sku === selectedSize?.sku
              ) ? (
                <button
                  className={styles.detailAddCartButton}
                  onClick={() => handleOpenCart()}
                >
                  Proceed to Checkout
                </button>
              ) : (
                <button
                  className={styles.detailAddCartButton}
                  onClick={() => {
                    if (!token) {
                      openModal();
                      return;
                    }

                    if (!selectedSize) {
                      alert("Please select a size");
                      return;
                    }

                    // Find the variant by size
                    const variant = product.variants.find(
                      (v) => v.size === selectedSize.size
                    );

                    if (!variant) {
                      alert("This size is not available");
                      return;
                    }
                    const generatePaddingSku = (baseSku, padding) => {
                      if (!padding) return baseSku;
                      return `${baseSku}-W${padding.waist || "0"}-L${
                        padding.length || "0"
                      }-H${padding.height || "0"}-${padding.unit || "cm"}`;
                    };

                    const skuWithPadding = generatePaddingSku(
                      variant.sku,
                      savedPaddingDetails
                    );
                    handleAddToCart({
                      productId: product._id,
                      sku: skuWithPadding,
                      size: selectedSize.size || null,
                      color: selectedColor || "N/A",
                      quantity: 1,
                      paddingDetails: savedPaddingDetails,
                    });
                  }}
                >
                  Add To Cart
                </button>
              )}

              <button
                className={styles.detailBuyButton}
                onClick={() => {
                  if (!token) {
                    openModal();
                    return;
                  }

                  if (!selectedSize) {
                    alert("Please select a size");
                    return;
                  }

                  const variant = product.variants.find(
                    (v) => v.size === selectedSize.size
                  );

                  if (!variant) {
                    alert("This size is not available");
                    return;
                  }
                  const skuWithPadding = generatePaddingSku(
                    variant.sku,
                    savedPaddingDetails
                  );
                  const buyNowItem = {
                    productId: product._id,
                    title: product.title,
                    media: product.media,
                    quantity: 1,
                    variant: {
                      sku: skuWithPadding,
                      size: selectedSize.size,
                      color: selectedColor || "N/A",
                      price: product.mrp,
                      paddingDetails: savedPaddingDetails,
                    },
                  };

                  navigate("/checkout", { state: { buyNowItem } });
                }}
              >
                Buy Now
              </button>
            </div>

            <div className={styles.detailProductInfo}>Product Information</div>
            <Accordion
              activeKey={activeKeys}
              style={{ marginTop: 10, border: "none" }}
            >
              <Accordion.Item eventKey="0" style={{ border: "none" }}>
                <Accordion.Header onClick={() => toggleKey("0")}>
                  <BiDetail
                    size={20}
                    style={{
                      fontWeight: "bold",
                      marginTop: -3,
                      marginRight: 10,
                    }}
                  />
                  <div className={styles.productDetailHeading}>
                    {" "}
                    Product Details
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {/* <p>
                    <strong>Colour:</strong> {product?.colour}
                  </p>
                  <p>{product?.description}</p> */}

                  {/* <hr /> */}
                  <p>{product?.shortDescription}</p>
                  <strong style={{ color: "#0984e3" }}>Other Info</strong>
                  <Row style={{ marginTop: 10 }}>
                    <Col>
                      <strong>Pack Contains </strong>
                    </Col>
                    <Col>: {product?.packContains}</Col>
                  </Row>
                  <Row style={{ marginTop: 10 }}>
                    <Col>
                      <strong>Fabric </strong>
                    </Col>
                    <Col> : {product?.fabric}</Col>
                  </Row>
                  <Row style={{ marginTop: 10 }}>
                    <Col>
                      <strong>Dupatta </strong>
                    </Col>
                    <Col>
                      {product?.dupatta.enabled ? (
                        <div>: Yes</div>
                      ) : (
                        <div>: No</div>
                      )}
                    </Col>
                  </Row>

                  <Row style={{ marginTop: 10 }}>
                    <Col>
                      <strong>Work /Craft </strong>
                    </Col>
                    <Col>: {product?.work}</Col>
                  </Row>
                  <Row style={{ marginTop: 10 }}>
                    <Col>
                      <strong>Care </strong>
                    </Col>
                    <Col>: {product?.care}</Col>
                  </Row>

                  <Row style={{ marginTop: 10 }}>
                    <Col>
                      <strong>Occasion </strong>
                    </Col>
                    <Col>: {product?.occasion}</Col>
                  </Row>

                  <Row style={{ marginTop: 10 }}>
                    <Col>
                      <strong>Note </strong>
                    </Col>
                    <Col>:{product?.Note}</Col>
                  </Row>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1" style={{ border: "none" }}>
                <Accordion.Header onClick={() => toggleKey("1")}>
                  <BsPatchExclamation
                    size={20}
                    style={{
                      fontWeight: "bold",
                      marginTop: -3,
                      marginRight: 10,
                    }}
                  />
                  <div className={styles.productDetailHeading}>
                    Product Specialty{" "}
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  {product?.productSpeciality}

                  <p style={{ marginTop: 10 }}>
                    <strong style={{ color: "#0984e3" }}>Style And Fit </strong>{" "}
                    : {product?.styleAndFit}
                  </p>
                </Accordion.Body>
              </Accordion.Item>
              {/* <Accordion.Item eventKey="2" style={{ border: "none" }}>
                <Accordion.Header onClick={() => toggleKey("2")}>
                  <div className={styles.productDetailHeading}>
                    <FaRegUser
                      size={20}
                      style={{
                        fontWeight: "bold",
                        marginTop: -3,
                        marginRight: 10,
                      }}
                    />
                    Vendor details
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item> */}

              <Accordion.Item
                eventKey="3"
                style={{ border: "none" }}
                onClick={() => toggleKey("3")}
              >
                <Accordion.Header>
                  <div className={styles.productDetailHeading}>
                    <LuArrowRightLeft
                      size={20}
                      style={{
                        fontWeight: "bold",
                        marginTop: -3,
                        marginRight: 10,
                      }}
                    />
                    Return and exchanges policy
                  </div>
                </Accordion.Header>
                <Accordion.Body>{product?.shippingAndReturns}</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
      <Frequently items={product?.frequentlyBoughtTogether} />
      <br />
      <div style={{ padding: "2rem", backgroundColor: "#f9f9f9" }}>
        <SimilarProducts products={product?.similarProducts} />
      </div>
      <br />
      <div className={styles.customerHeading}>Customer Review</div>
      <CustomerReviews reviews={reviews} />
      <Footer />
      {isPaddingModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Enter Additional Info Details</h3>
            <p
              style={{ fontSize: "0.9rem", color: "#555", textAlign: "center" }}
            >
              Provide waist, length, height, bust, and hip for a better fit.
            </p>
            <p>Select Your Nearest Size : {selectedSize?.size} </p>
            {/* Bust Size */}
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                Bust Size
              </Form.Label>
              <Form.Select
                style={{ fontSize: 14 }}
                value={paddingDetails.bust || ""}
                onChange={(e) => handleSelectChange("bust", e.target.value)}
              >
                <option value="">Select Bust</option>
                <option value="32 Inch">32 Inch</option>
                <option value="34 Inch">34 Inch</option>
                <option value="36 Inch">36 Inch</option>
                <option value="38 Inch">38 Inch</option>
              </Form.Select>
            </Form.Group>

            {/* Waist */}
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                Waist
              </Form.Label>
              <Form.Select
                style={{ fontSize: 14 }}
                value={paddingDetails.waist || ""}
                onChange={(e) => handleSelectChange("waist", e.target.value)}
              >
                <option value="">Select Waist</option>
                <option value="25 Inch">25 Inch</option>
                <option value="26 Inch">26 Inch</option>
                <option value="27 Inch">27 Inch</option>
                <option value="28 Inch">28 Inch</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                Hip Size
              </Form.Label>
              <Form.Select
                style={{ fontSize: 14 }}
                value={paddingDetails.hip || ""}
                onChange={(e) => handleSelectChange("hip", e.target.value)}
              >
                <option value="">Select Hip</option>
                <option value="34 Inch">34 Inch</option>
                <option value="36 Inch">36 Inch</option>
                <option value="38 Inch">38 Inch</option>
                <option value="40 Inch">40 Inch</option>
              </Form.Select>
            </Form.Group>

            {/* Length */}
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                Length (Waist to Floor including heel)
              </Form.Label>
              <Form.Select
                style={{ fontSize: 14 }}
                value={paddingDetails.length || ""}
                onChange={(e) => handleSelectChange("length", e.target.value)}
              >
                <option value="">Select Length</option>
                <option value="36 Inch (91 cm)">36 Inch (91 cm)</option>
                <option value="38 Inch (96 cm)">38 Inch (96 cm)</option>
                <option value="40 Inch (102 cm)">40 Inch (102 cm)</option>
              </Form.Select>
            </Form.Group>

            {/* Height */}
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                Your Height (Including heel)
              </Form.Label>
              <Form.Select
                style={{ fontSize: 14 }}
                value={paddingDetails.height || ""}
                onChange={(e) => handleSelectChange("height", e.target.value)}
              >
                <option value="">Select Height</option>
                <option value="5 feet 2 Inch">5 feet 2 Inch</option>
                <option value="5 feet 3 Inch">5 feet 3 Inch</option>
                <option value="5 feet 4 Inch">5 feet 4 Inch</option>
                <option value="5 feet 5 Inch">5 feet 5 Inch</option>
              </Form.Select>
            </Form.Group>

            {/* Hip Size */}
            <div style={{ margin: "5px 0" }}>
              <button
                style={{
                  backgroundColor: "#e9e8e8ff",
                  color: "#0e0e0eff",
                  border: "none",
                  height: 40,
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 500,
                }}
                onClick={() => {
                  // Example: Open chat, navigate, or show alert
                  alert("Redirecting to Stylist Chat...");
                  // You can replace this with navigation or modal logic
                }}
              >
                Need Help? Talk to Stylist
              </button>
            </div>

            <div className={styles.modalActions}>
              <button onClick={() => setIsPaddingModalOpen(false)}>
                Cancel
              </button>
              <button
                onClick={() => {
                  setSavedPaddingDetails(paddingDetails);
                  setIsPaddingModalOpen(false);
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
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
