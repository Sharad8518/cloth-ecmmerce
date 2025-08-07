import React from "react";
import styles from "./ProductList.module.css";


export default function ProductList({ products }) {
  return (
    <div className={styles.cardGrid}>
      {products.map((product) => (
        <div className={styles.card} key={product.id}>
          <div className={styles.imageWrapper}>
            <img src={product.image} alt={product.title} />
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardTitle}>{product.title}</div>
            <div className={styles.cardDesc}>{product.description}</div>
            <div className={styles.cardPrice}>₹{product.price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
