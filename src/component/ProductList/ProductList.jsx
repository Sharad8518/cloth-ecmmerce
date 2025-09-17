import React from "react";
import styles from "./ProductList.module.css";
import { useFavorites } from "../hooks/useFavorites";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useNavigate, useNavigation } from "react-router-dom";

export default function ProductList({ products }) {
  const navigate = useNavigate();

  console.log("products", products);
  const { favorites, toggleFavorite } = useFavorites();
  return (
    <div className={styles.cardGrid}>
      {products.map((product) => (
        <div className={styles.card} key={product.id}>
          <div style={{ position: "relative" }}>
            <img
              src={product.media[0].url}
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
          <div className={styles.cardContent}>
            <div className={styles.cardTitle}>{product.title}</div>
            <div className={styles.cardDesc}>{product.description}</div>
            {product?.saleOn ? (
              <div className="custom-card-price">
                <span style={{ textDecoration: "line-through", color: "gray" }}>
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
              <p className={styles.cardPrice}>₹ {product?.mrp} /-</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
