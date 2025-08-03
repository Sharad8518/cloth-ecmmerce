import React ,{useState}from 'react'
import { Container,Row,Col } from 'react-bootstrap'
import styles from "./ProductDetail.module.css"
import VerticalImageSelector from '../layout/VerticalImageSelector/VerticalImageSelector'

 const images = [
    "https://rangreza.net/cdn/shop/files/Cross-Stitch-0123Rtsprtlwn0208-Arnit-Blush-3Pc-Embroidered-Lawn-Suit-Rangreza-7630.jpg?v=1711008689",
    "https://saraclothes.com/cdn/shop/products/0122RTSEMBCHFENG0307_2_900x_b148d834-06c8-407b-9d5c-2c43afce9cae.jpg?v=1665422628",
    "https://hooraindesignerwear.com/cdn/shop/files/lawn_0001__DSF5232.jpg?v=1746542397",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPX31HYGXcBBlpzXej6EcvoT1LFZOU6r3BHxYS0AsZEgTWKDoE-qi9CH4JtsHi8qASuSE&usqp=CAU",
    "https://saraclothes.com/cdn/shop/products/0122RTSEMBCHFENG0105_2_900x_e469cd45-760c-41ef-a32b-9bdc653d82a5.jpg?v=1643458385",
  ];

export default function ProductDetail() {
     const [selectedImage, setSelectedImage] = useState('https://rangreza.net/cdn/shop/files/Cross-Stitch-0123Rtsprtlwn0208-Arnit-Blush-3Pc-Embroidered-Lawn-Suit-Rangreza-7630.jpg?v=1711008689');
     console.log('selectedImage',selectedImage)
     const sizes = ['XS', 'S', 'M', 'L', 'XL','XXL','3XL','Speak To A Stylelist'];
      const [selectedSize, setSelectedSize] = useState(null);
  return (
    <Container  className={styles.ProductDetailContainer} fluid>
        <Row style={{height:"100%"}}>
            <Col md={1} style={{display:"flex",alignItems:"center",height:"100%"}}>
 <VerticalImageSelector images={images} onSelect={setSelectedImage} />

            </Col>
             <Col md={5} style={{height:"100%"}}>
             <img 
              src={selectedImage}
              className={styles.productDetailImg}
             />
             </Col>
              <Col md={6} >
                <h3 className={styles.detailProductTitle}> Animaka Khana</h3>   
                <div className={styles.detailProductDiscreaption}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout</div>   
                <div className={styles.detailPrize}>Rs. 785.45</div>
                <div className={styles.detailMRP}>MRP Inclusive of all size</div>
                <hr/>
                <div className={styles.detailSizeText}>
                    SELECT YOUR SIZE 
                    <div className={styles.detailSizeGuideText}>Size Guide</div>
                </div>
                <div className={styles.detailMadeToOrderText}>
                    Made To Order
                </div>
                <div className={styles.detailShip}>Ship by 11th November 2025</div>
 <div className={styles.container}>
                  {sizes.map(size => (
        <button
          key={size}
          className={`${styles.sizeButton} ${selectedSize === size ? 'active' : ''}`}
          onClick={() => setSelectedSize(size)}
        >
          {size}
        </button>
      ))}
      </div>
              </Col>
        </Row>
    </Container>
  )
}
