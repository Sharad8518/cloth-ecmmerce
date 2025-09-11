import React from 'react';
import styles from './SimilarProducts.module.css';
import ProductGrid from '../../layout/ProductGrid/ProductGrid';
import {Container} from "react-bootstrap"
const SimilarProducts = ({ products }) => {
  return (
    <Container className="my-4">
      <br/>
      <h2 className={styles.heading}>Similar Products</h2>
        <ProductGrid products={products} />
    </Container>
  );
};

export default SimilarProducts;
