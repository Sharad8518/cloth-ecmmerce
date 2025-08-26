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
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardTitle}>{product.title}</div>
            <div className={styles.cardDesc}>{product.description}</div>
            <div className={styles.cardPrice}>₹{product.mrp}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
