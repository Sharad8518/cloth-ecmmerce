import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./ProductGrid.css"; // Custom CSS
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useNavigate, useNavigation } from "react-router-dom";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useFavorites } from "../../hooks/useFavorites";

const ProductGrid = ({ products }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavorites();
  console.log("favorites", favorites);
  const handleAddToCart = (product) => {
    console.log("Added to cart:", product.title);
  };

  const handleBuyNow = (product) => {
    console.log("Buying now:", product.title);
  };

  return (
    <Container className="my-1">
      <Row>
        {products.map((product, index) => (
          <Col
            key={index}
            xs={6}
            sm={6}
            md={4}
            lg={3}
            className="mb-4"
            onClick={() => navigate(`/detail/${product?._id}`)}
          >
            <div className="custom-card">
              <div style={{ position: "relative" }}>
                <img
                  src={product?.media[0]?.url}
                  alt={product.title}
                  className="custom-card-img"
                  onClick={() => navigate(`/detail/${product._id}`)}
                />
                <div
                  style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    cursor: "pointer",
                    fontSize: "1.5rem",
                    color: favorites.includes(product._id) ? "red" : "white",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product._id);
                  }}
                >
                  {favorites.includes(product._id) ? (
                    <AiFillHeart />
                  ) : (
                    <AiOutlineHeart />
                  )}
                </div>
                {product?.saleOn && (
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      background: "linear-gradient(135deg, #ff4e50, #f9d423)", // gradient for modern look
                      color: "#fff",
                      padding: "4px 10px",
                      borderRadius: "50px", // pill shape
                      fontSize: "0.75rem",
                      fontWeight: "600",
                      letterSpacing: "0.5px",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      textTransform: "uppercase",
                    }}
                  >
                    {product?.discountType === "percent"
                      ? `${product?.discountValue}% OFF`
                      : "Sale"}
                  </div>
                )}
              </div>
              <div className="custom-card-body">
                <h5 className="custom-card-title">{product?.title}</h5>
                <p className="custom-card-desc">{product?.description}</p>
                {/* ✅ Show sale price if saleOn is true */}
                {product?.saleOn ? (
                  <div className="custom-card-price">
                    <span
                      style={{ textDecoration: "line-through", color: "gray" }}
                    >
                      ₹ {product?.mrp}
                    </span>{" "}
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      ₹ {product?.salePrice}
                    </span>{" "}
                    {product?.discountType === "percent" && (
                      <span style={{ color: "green", fontSize: "0.9rem" }}>
                        ({product?.discountValue}% OFF)
                      </span>
                    )}
                  </div>
                ) : (
                  <p className="custom-card-price">₹ {product?.mrp} /-</p>
                )}

                {/* <div className="custom-card-actions">
                  <Button variant="outline-primary" size="sm" style={{border:"1px solid #000"}} onClick={() => handleAddToCart(product)}>
                    <HiOutlineShoppingBag size={25} style={{color:"#000"}}/>
                  </Button>
                  <Button variant="primary" size="sm" style={{color:"#000"}} onClick={() => handleBuyNow(product)}>
                    Buy Now
                  </Button>
                </div> */}
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductGrid;
