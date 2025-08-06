import React from 'react';
import styles from './CustomerReviews.module.css';

const CustomerReviews = ({ reviews }) => {
  return (
    <section className={styles.container}>
      {/* <h2 className={styles.heading}>Customer Reviews</h2> */}
    <div className={styles.scrollContainer}>
  {reviews.map((review) => (
    <div key={review.id} className={styles.card}>
      <div className={styles.userInfo}>
        <img src={review.image} alt={review.name} className={styles.avatar} />
        <div>
          <h4 className={styles.name}>{review.name}</h4>
          <p className={styles.date}>{review.date}</p>
        </div>
      </div>
      <div className={styles.stars}>
        {'★'.repeat(review.rating)}
        {'☆'.repeat(5 - review.rating)}
      </div>
      <p className={styles.comment}>"{review.comment}"</p>
    </div>
  ))}
</div>
    </section>
  );
};

export default CustomerReviews;
