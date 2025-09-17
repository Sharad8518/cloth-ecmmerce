import React, { useState } from "react";
import styles from "./Frequently.module.css";

export default function Frequently({ items, onSelectionChange }) {
  const [selected, setSelected] = useState([]); // start empty

  const toggleSelect = (item) => {
    setSelected((prev) => {
      const already = prev.find((s) => s.productId === item.productId);
      let updated;

      if (already) {
        // remove if already selected
        updated = prev.filter((s) => s.productId !== item.productId);
      } else {
        // add full product detail
        updated = [...prev, item];
      }

      // 🔔 Notify parent with full product objects
      onSelectionChange(updated);
      return updated;
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.frequentlyHeaderText}>Complete the Look</h2>
      <br />

      <div className={styles.productList}>
        {items.map((item) => {
          // build the same structure you want stored
          const formatted = {
            productId: item._id,
            title: item.title,
            media: item.media,
            quantity: 1,
            variant: {
              sku: item.sku,
              size: "N/A",
              color: "N/A",
              price: item.saleOn ? item.salePrice : item.mrp,
            },
          };

          const isChecked = selected.some((s) => s.productId === item.id);

          return (
            <div key={item.id} className={styles.productCard}>
              <div className={styles.imageWrapper}>
                <img
                  src={item.media[0].url}
                  alt={item.title}
                  className={styles.productImage}
                />
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleSelect(formatted)}
                  className={styles.checkbox}
                />
              </div>

              {item?.saleOn ? (
                <div className={styles.priceWrapper}>
                  <span className={styles.oldPrice}>₹ {item?.mrp}</span>
                  <span className={styles.salePrice}>₹ {item?.salePrice}</span>
                  {item?.discountType === "percent" && (
                    <span className={styles.discountTag}>
                      ({item?.discountValue}% OFF)
                    </span>
                  )}
                </div>
              ) : (
                <p className={styles.price}>₹ {item?.mrp} /-</p>
              )}

              <p className={styles.productTitle}>{item.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
