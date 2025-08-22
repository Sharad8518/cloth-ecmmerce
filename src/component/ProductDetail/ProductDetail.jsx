import React, { useState, useEffect } from "react";
import { Container, Row, Col, Accordion, Navbar } from "react-bootstrap";
import styles from "./ProductDetail.module.css";
import VerticalImageSelector from "../layout/VerticalImageSelector/VerticalImageSelector";
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

const images = [
  "https://img.theloom.in/pwa/catalog/product/cache/e442fb943037550e0d70cca304324ade/v/j/vj304fs25-01kpfuchsiavj30_7_.jpg?tr=c-at_max,w-800,h-1066",
  "https://img.theloom.in/pwa/catalog/product/cache/e442fb943037550e0d70cca304324ade/v/j/vj304fs25-01kpfuchsiavj30_2_.jpg?tr=c-at_max,w-800,h-1066",
  "https://img.theloom.in/pwa/catalog/product/cache/e442fb943037550e0d70cca304324ade/v/j/vj304fs25-01kpfuchsiavj30_8_.jpg?tr=c-at_max,w-800,h-1066",
  "https://img.theloom.in/pwa/catalog/product/cache/e442fb943037550e0d70cca304324ade/v/j/vj304fs25-01kpfuchsiavj30_3_.jpg?tr=c-at_max,w-800,h-1066",
  "https://img.theloom.in/pwa/catalog/product/cache/e442fb943037550e0d70cca304324ade/v/j/vj304fs25-01kpfuchsiavj30_4_.jpg?tr=c-at_max,w-800,h-1066",
];

export default function ProductDetail() {
  const [selectedImage, setSelectedImage] = useState("");
  const { cart, handleAddToCart, buyNow } = useCart();
  const navigate = useNavigate();
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

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeKeys, setActiveKeys] = useState([]);

  const { id } = useParams(); // ✅ get product id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  console.log("product", product?.inventoryBySize);

  const toggleKey = (key) => {
    setActiveKeys(
      (prev) =>
        prev.includes(key)
          ? prev.filter((k) => k !== key) // close
          : [...prev, key] // open
    );
  };
  const token = localStorage.getItem("token");
  console.log("selectedSize", selectedImage);
  if (loading) {
    return <div>Loading...</div>; // or a spinner component
  }
  return (
    <>
      <NavbarMenu />
      <br /> <br />
      <br />
      <Container className={styles.ProductDetailContainer}>
        <Row style={{ height: "100%" }}>
          <Col md={1} className={styles.vericalImage}>
            {product?.media?.length > 0 && ( // ✅ check if media exists
              <VerticalImageSelector
                images={product?.media?.map((m) => m?.url)} // ✅ use product media URLs
                onSelect={setSelectedImage}
              />
            )}
          </Col>
          <Col md={5} style={{ height: "100%" }}>
            <img src={selectedImage} className={styles.productDetailImg} />
          </Col>
          <Col md={6} className={styles.productContentBox}>
            <h3 className={styles.detailProductTitle}>{product?.title} </h3>
            <div className={styles.detailProductDiscreaption}>
              {product?.description}
            </div>
            <div className={styles.detailPrize}>Rs. {product?.salePrice}</div>
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
              {product?.inventoryBySize?.map((size) => (
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

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                marginTop: 20,
                flexWrap: "wrap",
              }}
            >
              {(cart?.items || []).some((item) => {
                const attrs = item.variant?.attributes || [];
                return (
                  item.product?._id === product?._id &&
                  attrs.every((attr) => {
                    if (attr.name === "Color" && selectedColor)
                      return attr.value === selectedColor;
                    if (attr.name === "Size" && selectedSize)
                      return attr.value === selectedSize;
                    return true;
                  })
                );
              }) ? (
                <button
                  className={styles.detailAddCartButton}
                  onClick={() => navigate("/cart")}
                >
                  Process to Checkout
                </button>
              ) : (
                <button
                  className={styles.detailAddCartButton}
                  onClick={() => {
                    if (!token) {
                      alert("Please login to add items to cart");
                      navigate("/login"); // redirect to login page
                      return;
                    }

                    if (!selectedSize) {
                      alert("Please select a size");
                      return;
                    }

                    const variant = product.variants.find((v) =>
                      v.attributes.some(
                        (attr) =>
                          attr.name.toLowerCase() === "size" &&
                          attr.value === selectedSize
                        // (attr.name.toLowerCase() === "color" &&
                        //   attr.value === selectedColor
                        // )
                      )
                    );

                    handleAddToCart({
                      productId: product._id,
                      sku: product.variants?.[0]?.sku || product._id, // fallback to product ID
                      size: selectedSize || "N/A",
                      color: selectedColor || "N/A",
                      quantity: 1,
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
                    alert("Please login to buy this product");
                    navigate("/login");
                    return;
                  }

                  if (!selectedSize) {
                    alert("Please select a size");
                    return;
                  }

                  // Make sure variants exist
                 

                  // Find the selected variant safely
                
                  // Generate SKU safely
                  const slugify = (text) =>
                    text
                      ?.toString()
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^\w\-]+/g, "")
                      .replace(/\-\-+/g, "-")
                      .replace(/^-+/, "")
                      .replace(/-+$/, "") || "unknown";

                  const sku = `${slugify(product.title)}-${selectedSize}`;

                  const buyNowItem = {
                    productId: product._id,
                    title: product.title,
                    media: product.media,
                    quantity: 1,
                    variant: {
                      sku,
                      attributes: [
                        { name: "Size", value: selectedSize },],
                      price: product.salePrice ,
                    },
                  };

                  // Save to localStorage for checkout
                  // localStorage.setItem(
                  //   "buyNowItem",
                  //   JSON.stringify(buyNowItem)
                  // );

                  navigate("/checkout",{ state: { buyNowItem } });
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
                  <p>
                    <strong>Item Number:</strong> {product?.itemNumber}
                  </p>
                  <p>
                    <strong>Colour:</strong> {product?.colour}
                  </p>
                  <p>
                    <strong>Description:</strong> {product?.description}
                  </p>
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
                    Know your product{" "}
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
      <div className={styles.customerHeading}>Customer Review</div>
      <CustomerReviews reviews={reviews} />
      <Frequently items={frequentlyBought} />
      <br />
      <div style={{ padding: "2rem", backgroundColor: "#f9f9f9" }}>
        <SimilarProducts products={similarProduct} />
      </div>
      <Footer />
    </>
  );
}
