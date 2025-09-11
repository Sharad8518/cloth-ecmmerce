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
import MobileBackButton from "../layout/BackButton/MobileBackButton";
import { FaQuestion } from "react-icons/fa6";
import "./ProductDetail.css";

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

  {
    /* Utility function for generating size ranges */
  }
  const generateOptions = (start, end, unit = "Inch") => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={`${i} ${unit}`}>
          {i} {unit}
        </option>
      );
    }
    return options;
  };

  {
    /* Utility for generating height options */
  }
  const generateHeightOptions = (minFeet, minInch, maxFeet, maxInch) => {
    const options = [];
    for (let feet = minFeet; feet <= maxFeet; feet++) {
      for (let inch = 0; inch < 12; inch++) {
        if (
          (feet === minFeet && inch < minInch) ||
          (feet === maxFeet && inch > maxInch)
        ) {
          continue;
        }
        options.push(
          <option key={`${feet}-${inch}`} value={`${feet} feet ${inch} Inch`}>
            {feet} feet {inch} Inch
          </option>
        );
      }
    }
    return options;
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
  const generateJewellerySku = (productName) => {
    const namePart = productName
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 5); // first 5 chars
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `${namePart}-${randomNum}`;
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
        <MobileBackButton />

        <Row className={styles.productDetailRow}>
          {/* <Col md={1} className={styles.vericalImage}>
            {product?.media?.length > 0 && ( // ✅ check if media exists
              <VerticalImageSelector
                images={product?.media?.map((m) => m?.url)} // ✅ use product media URLs
                onSelect={handleSelectImage}
                selectedIndex={selectedIndex}
              />
            )}
          </Col> */}
          <Col
            md={6}
            style={{
              height: "100%",
              boxSizing: "border-box",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className={styles.imagevericaldesktop}>
              {product?.media?.length > 0 && ( // ✅ check if media exists
                <VerticalImageSelector
                  images={product?.media?.map((m) => m?.url)} // ✅ use product media URLs
                  onSelect={handleSelectImage}
                  selectedIndex={selectedIndex}
                />
              )}
            </div>
            <div className={styles.imageBigSection}>
              <Slider
                ref={sliderRef}
                dots={true} // show navigation dots
                infinite={true} // loop infinitely
                speed={500} // transition speed
                slidesToShow={1} // show 1 slide at a time
                slidesToScroll={1} // scroll 1 slide at a time
                swipeToSlide={true} // enable swipe
                arrows={false} // hide arrows if you want swipe only
                adaptiveHeight={true}
                afterChange={(current) => setSelectedIndex(current)} // sync selectedIndex
              >
                {product?.media?.map((m, index) => (
                  <div key={index} style={{ height: "100%" }}>
                    <img
                      src={m.url}
                      alt={m.alt || `Product image ${index + 1}`}
                      className={styles.productDetailImg}
                    />
                  </div>
                ))}
              </Slider>
            </div>
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
            {product?.fulfillmentType === "MADE_TO_ORDER" ? (
              <div className={styles.detailMadeToOrderText}>
                <BiCloset size={20} /> Made To Order
              </div>
            ) : (
              <div className={styles.detailMadeToOrderText}>
                <BiCloset size={20} /> Ready To Shipment
              </div>
            )}

            <div className={styles.detailShip}>
              Ship by {getDateAfterDays(product?.estimatedShippingDays)}
            </div>
            {product?.productType !== "Jewellery" && (
              <>
                <div className={styles.detailSizeText}>
                  SELECT YOUR SIZE
                  <div className={styles.detailSizeGuideText}>Size Guide</div>
                </div>
                <div className={styles.container}>
                  {product?.variants?.map((variant) => (
                    <button
                      key={variant?.size}
                      className={`${styles.sizeButton} ${
                        selectedSize?.size === variant?.size
                          ? styles.active
                          : ""
                      }`}
                      onClick={() => setSelectedSize(variant)}
                    >
                      {variant.size}
                    </button>
                  ))}
                </div>
              </>
            )}

            {product?.fulfillmentType === "MADE_TO_ORDER" && (
              <div style={{ display: "flex" }}>
                <span style={{ fontWeight: "700" }}>
                  Additional info for better fit
                </span>

                <div style={{ marginTop: "0px", marginLeft: 10 }}>
                  <Form.Check
                    inline
                    type="checkbox"
                    id="answer-yes"
                    checked={answer === "yes"}
                    onChange={(e) => {
                      if (!selectedSize) {
                        alert("Please select a size");
                        return;
                      }
                      handleSelect(e.target.checked ? "yes" : "");
                    }}
                    className={styles.customcheckbox}
                  />
                </div>
              </div>
            )}

            {/* <button
              className={styles.paddingButton}
              onClick={() => setIsPaddingModalOpen(true)}
            >
              {savedPaddingDetails
                ? "Edit better fit"
                : "Additional info for better fit"}
            </button> */}

            {/* Show saved values */}
            {/* {savedPaddingDetails && (
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
            )} */}
            {savedPaddingDetails && (
              <div style={{ width: 320 }}>
                <Row style={{ fontSize: 14 }}>
                  <Col>Bust Size </Col>
                  <Col> : {savedPaddingDetails.bust}</Col>
                </Row>
                <Row style={{ fontSize: 14 }}>
                  <Col>Waist Size</Col>
                  <Col> : {savedPaddingDetails.waist}</Col>
                </Row>
                <Row style={{ fontSize: 14 }}>
                  <Col>Full Length Size</Col>
                  <Col> : {savedPaddingDetails.length}</Col>
                </Row>
                <Row style={{ fontSize: 14 }}>
                  <Col>Hip Size</Col>
                  <Col> : {savedPaddingDetails.hip}</Col>
                </Row>
                <Row style={{ fontSize: 14 }}>
                  <Col>Height Size</Col>
                  <Col> : {savedPaddingDetails.height}</Col>
                </Row>
                <button
                  style={{
                    marginLeft: 0,
                    color: "red",
                    backgroundColor: "#fff",
                    border: "none",
                  }}
                  onClick={() => setSavedPaddingDetails(null)}
                >
                  Remove
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

                    if (product.productType !== "Jewellery" && !selectedSize) {
                      alert("Please select a size");
                      return;
                    }

                    // Find the variant by size
                    const variant = product.variants.find(
                      (v) => v.size === selectedSize.size
                    );

                    if (product.productType !== "Jewellery" && !variant) {
                      alert("This size is not available");
                      return;
                    }
                    const generatePaddingSku = (baseSku, padding) => {
                      if (!padding) return baseSku;
                      return `${baseSku}-W${padding.waist || "0"}-L${
                        padding.length || "0"
                      }-H${padding.height || "0"}-${padding.unit || "cm"}`;
                    };
                    const sku =
                      product.productType === "Jewellery"
                        ? generateJewellerySku(product.title)
                        : variant.sku;
                    const skuWithPadding = generatePaddingSku(
                      sku,
                      savedPaddingDetails
                    );
                    handleAddToCart({
                      productId: product._id,
                      sku: skuWithPadding,
                      size:
                        product.productType !== "Jewellery"
                          ? selectedSize.size
                          : "N/A",
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

                  if (product.productType !== "Jewellery" && !selectedSize) {
                    alert("Please select a size");
                    return;
                  }

                  const variant = product.variants.find(
                    (v) => v.size === selectedSize.size
                  );

                  if (product.productType !== "Jewellery" && !variant) {
                    alert("This size is not available");
                    return;
                  }
                  const sku =
                    product.productType === "Jewellery"
                      ? generateJewellerySku(product.title)
                      : variant.sku;
                  const skuWithPadding = generatePaddingSku(
                    sku,
                    savedPaddingDetails
                  );
                  const buyNowItem = {
                    productId: product._id,
                    title: product.title,
                    media: product.media,
                    quantity: 1,
                    variant: {
                      sku: skuWithPadding,
                      size:
                        product.productType !== "Jewellery"
                          ? selectedSize.size
                          : "N/A",
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
                  {(product?.packContains ||
                    product?.fabric ||
                    (product?.productType === "Cloths" && product?.dupatta) ||
                    product?.work ||
                    product?.care ||
                    product?.occasion ||
                    product?.Note) && (
                    <>
                      <strong style={{ color: "#0984e3" }}>Other Info</strong>

                      {product?.packContains && (
                        <Row style={{ marginTop: 10 }}>
                          <Col>
                            <strong>Pack Contains</strong>
                          </Col>
                          <Col>: {product.packContains}</Col>
                        </Row>
                      )}

                      {product?.fabric && (
                        <Row style={{ marginTop: 10 }}>
                          <Col>
                            <strong>Fabric</strong>
                          </Col>
                          <Col>: {product.fabric}</Col>
                        </Row>
                      )}

                      {product?.colour && (
                        <Row style={{ marginTop: 10 }}>
                          <Col>
                            <strong>Colour</strong>
                          </Col>
                          <Col>: {product.colour}</Col>
                        </Row>
                      )}

                      {product?.productType === "Cloths" &&
                        product?.dupatta && (
                          <Row style={{ marginTop: 10 }}>
                            <Col>
                              <strong>Dupatta</strong>
                            </Col>
                            <Col>
                              : {product.dupatta.enabled ? "Yes" : "No"}
                            </Col>
                          </Row>
                        )}

                      {product?.work && (
                        <Row style={{ marginTop: 10 }}>
                          <Col>
                            <strong>Work / Craft</strong>
                          </Col>
                          <Col>: {product.work}</Col>
                        </Row>
                      )}

                      {product?.care && (
                        <Row style={{ marginTop: 10 }}>
                          <Col>
                            <strong>Care</strong>
                          </Col>
                          <Col>: {product.care}</Col>
                        </Row>
                      )}

                      {product?.occasion && (
                        <Row style={{ marginTop: 10 }}>
                          <Col>
                            <strong>Occasion</strong>
                          </Col>
                          <Col>: {product.occasion}</Col>
                        </Row>
                      )}

                      {product?.Note && (
                        <Row style={{ marginTop: 10 }}>
                          <Col>
                            <strong>Note</strong>
                          </Col>
                          <Col>: {product.Note}</Col>
                        </Row>
                      )}
                    </>
                  )}
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
                  {product?.styleAndFit && (
                    <p style={{ marginTop: 10 }}>
                      <strong style={{ color: "#0984e3" }}>
                        Style And Fit{" "}
                      </strong>{" "}
                      : {product?.styleAndFit}
                    </p>
                  )}
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
                <Accordion.Body>
                  <strong>{product?.shippingAndReturns?.title}</strong>
                  <br />
                  {product?.shippingAndReturns?.description}
                </Accordion.Body>
              </Accordion.Item>
              {product?.faq?.length > 0 && (
                <Accordion.Item eventKey="4" style={{ border: "none" }}>
                  <Accordion.Header onClick={() => toggleKey("4")}>
                    <FaQuestion
                      size={20}
                      style={{
                        fontWeight: "bold",
                        marginTop: -3,
                        marginRight: 10,
                      }}
                    />
                    <div className={styles.productDetailHeading}>FAQ </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    {product.faq.map((item) => (
                      <div
                        key={item._id}
                        style={{ marginTop: 5, paddingLeft: 10 }}
                      >
                        <p style={{ marginBottom: 2 }}>
                          <strong>Q:</strong> {item.question}
                        </p>
                        <p style={{ marginBottom: 5 }}>
                          <strong>A:</strong> {item.answer}
                        </p>
                      </div>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              )}
            </Accordion>
          </Col>
        </Row>
      </Container>
      {product?.frequentlyBoughtTogether.length > 0 && (
        <Frequently items={product?.frequentlyBoughtTogether} />
      )}
      <br />
      {product?.similarProducts.length > 0 && (
        <div style={{ backgroundColor: "#f9f9f9" }}>
          <SimilarProducts products={product?.similarProducts} />
        </div>
      )}
      <br />
      <div className={styles.customerHeading}>Customer Review</div>
      <CustomerReviews reviews={reviews} />
      <Footer />
      {isPaddingModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Enter Your Measurements</h3>
            <p
              style={{
                fontSize: "0.9rem",
                color: "#555",
                textAlign: "center",
                marginTop: -7,
              }}
            >
              Provide proper info for better Fit
            </p>
            <p
              style={{
                padding: 10,
                background: "#ff6f61",
                color: "#fff",
                fontWeight: "800",
                fontSize: 19,
              }}
            >
              Your Standard Size : {selectedSize?.size}{" "}
            </p>
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
                {generateOptions(28, 44)}
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
                {generateOptions(22, 40)}
              </Form.Select>
            </Form.Group>

            {/* Hip */}
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
                {generateOptions(30, 50)}
              </Form.Select>
            </Form.Group>

            {/* Full Length */}
            <Form.Group className="mb-3">
              <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                Full Length
              </Form.Label>
              <Form.Select
                style={{ fontSize: 14 }}
                value={paddingDetails.length || ""}
                onChange={(e) => handleSelectChange("length", e.target.value)}
              >
                <option value="">Select Length</option>
                {generateOptions(45, 62)}
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
                {generateHeightOptions(4, 5, 6, 4)}
              </Form.Select>
            </Form.Group>
            {/* Hip Size */}
            {/* <div style={{ margin: "5px 0" }}>
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
            </div> */}

            <div className={styles.modalActions}>
              <div>
                <button
                  style={{
                    backgroundColor: "#e9e8e8ff",
                    color: "#0e0e0eff",
                    border: "none",
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
              <div style={{ display: "flex" }}>
                <button onClick={() => setIsPaddingModalOpen(false)}>
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setSavedPaddingDetails(paddingDetails);
                    setIsPaddingModalOpen(false);
                  }}
                  style={{ marginLeft: 10 }}
                >
                  Save
                </button>
              </div>
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
