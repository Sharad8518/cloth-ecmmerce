import React from 'react';
import { Container, Row, Col,Button } from 'react-bootstrap';
import './ProductGrid.css'; // Custom CSS
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useNavigate, useNavigation } from 'react-router-dom';

const ProductGrid = ({ products }) => {
  const navigate =   useNavigate()
     const handleAddToCart = (product) => {
    console.log('Added to cart:', product.title);
  };

  const handleBuyNow = (product) => {
    console.log('Buying now:', product.title);
  };

  return (
    <Container className="my-2">
      <Row>
        {products.map((product, index) => (
          <Col key={index} xs={6} sm={6} md={4} lg={3} className="mb-4" onClick={()=>navigate('/detail')}>
            <div className="custom-card">
              <img src={product.image} alt={product.title} className="custom-card-img" />
              <div className="custom-card-body">
                <h5 className="custom-card-title">{product.title}</h5>
                <p className="custom-card-desc">{product.description}</p>
                <p className="custom-card-price">{product.price}</p>
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
