import React from 'react'
import styles from "./Frequently.module.css"

export default function Frequently({ items }) {
  return (
      <div className={styles.container}>
  <h2 className={styles.frequentlyHeaderText}>Complete the Look</h2>
  <div className={styles.clickadd}>Click To Add</div>
  <br />
  <div className={styles.productList}>
    {items.map((item) => (
      <div key={item.id} className={styles.productCard}>
        <div className={styles.imageWrapper}>
          <img src={item.media[0].url} alt={item.title} className={styles.productImage} />
          <input
            type="radio"
            name="frequentlyBought"
            value={item.id}
            className={styles.radioButton}
          />
        </div>
        <div className={styles.frequentlyPrice}>Rs {item.mrp}</div>
        <p className={styles.productTitle}>{item.title}</p>
      </div>
    ))}
  </div>
</div>

  )
}
