import React from 'react';
import styles from './SimilarProducts.module.css';

const SimilarProducts = ({ products }) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Similar Products</h2>
      <div className={styles.grid}>
        {products.map((product) => (
          <div className={styles.card} key={product.id}>
            <div className={styles.imageWrapper}>
              <img src={product.media[0].url} alt={product.title} className={styles.image} />
              <span className={styles.badge}>65% OFF</span>
            </div>
            <div className={styles.info}>
              <h3 className={styles.title}>{product.title}</h3>
              <p className={styles.description}>{product.description}</p>
              <p className={styles.price}>₹{product.salePrice}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;
