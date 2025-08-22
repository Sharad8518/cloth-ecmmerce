import React, { useState } from "react";
import { Card, Row, Col, Form ,Button,Modal} from "react-bootstrap";
import styles from "./FrequentlyBought.module.css"; // CSS Module import
import { useNavigate } from "react-router-dom";
const products = [
  {
    id: 1,
    title: "Product A",
    description: "This is a great product A.",
    image: "https://valintaformens.com/cdn/shop/products/photo_2023-03-27_02-27-21.jpg?v=1681723151",
  },
  {
    id: 2,
    title: "Product B",
    description: "This is a great product B.",
    image: "https://www.vedshree.in/cdn/shop/files/BLUE.jpg?v=1727342158",
  },
  {
    id: 3,
    title: "Product C",
    description: "This is a great product C.",
    image: "https://www.vedshree.in/cdn/shop/files/RED.jpg?v=1727341867",
  },
];


export default function FrequentlyBought() {
const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const toggleSelectProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Filter products by search term
  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Count selected products per store/state
  const countByStore = selectedProducts.reduce((acc, productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      acc[product.store] = (acc[product.store] || 0) + 1;
    }
    return acc;
  }, {});

    const removeProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter(id => id !== productId));
  };

  // Function to view full image (can be a new modal or browser popup)
  const handleViewFullImage = (imageUrl) => {
    window.open(imageUrl, "_blank"); // Opens the image in a new tab
  };

  return (
   <div className="p-4">
      <Button
        variant="light"
        className="mb-4 d-flex align-items-center"
        onClick={() => navigate(-1)}
      >
        &#8592; Back
      </Button>

      <h2 className="mb-4">Frequently Bought Products</h2>

    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
         <Form.Group className="mb-4" controlId="searchProducts">
           <Form.Control
             type="text"
             placeholder="Search products..."
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             style={{ width: "300px",  }}
           />
         </Form.Group>
   
           {selectedProducts.length > 0 && (
           <Button variant="primary" onClick={handleOpenModal} style={{height: "40px", padding: "0 20px"}}>
             Show Selected ({selectedProducts.length})
           </Button>
         )}
   
         </div>
   
       <Row className="g-2">
     {filteredProducts.map((product) => {
       const isSelected = selectedProducts.includes(product.id);
   
       const handleToggle = () => {
         toggleSelectProduct(product.id);
       };
   
       return (
         <Col key={product.id} xs={6} sm={3} md={2} lg={2} className="mb-3">
           <Card
             className={`${styles.smallProductCard} h-100 text-center ${
               isSelected ? styles.selectedCard : ""
             }`}
             onClick={handleToggle} // clicking the card toggles selection
             style={{ cursor: "pointer" }}
           >
             <Card.Img
               variant="top"
               src={product.image}
               alt={product.title}
               className={styles.smallProductImage}
             />
             <Card.Body className="p-2 d-flex flex-column">
               <Card.Title className="small mb-1">{product.title}</Card.Title>
               <Card.Text className="text-muted small mb-2" style={{ flexGrow: 1 }}>
                 {product.description}
               </Card.Text>
               <Form.Check
                 type="checkbox"
                 label="Select"
                 checked={isSelected}
                 onChange={(e) => e.stopPropagation() || handleToggle()} // prevent card click duplication
                 className="small"
               />
             </Card.Body>
           </Card>
         </Col>
       );
     })}
   </Row>
       
         {/* Modal */}
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
     <Modal.Header closeButton>
       <Modal.Title>Selected Products</Modal.Title>
     </Modal.Header>
     <Modal.Body>
       {selectedProducts.length === 0 ? (
         <p>No products selected.</p>
       ) : (
         <div className={styles.horizontalScroll}>
           {selectedProducts.map((productId) => {
             const product = products.find((p) => p.id === productId);
             if (!product) return null;
             return (
               <Card key={product.id} className={styles.smallCard}>
                 <div className={styles.cardImageWrapper}>
                   <Card.Img
                     src={product.image}
                     alt={product.title}
                     className={styles.cardImage}
                     onClick={() => handleViewFullImage(product.image)}
                   />
                   <Button
                     variant="danger"
                     size="sm"
                     className={styles.deleteButton}
                     onClick={() => removeProduct(product.id)}
                   >
                     ×
                   </Button>
                 </div>
                 <Card.Body className={styles.cardBody}>
                   <Card.Title className={styles.cardTitle}>{product.title}</Card.Title>
                   <Card.Text className={styles.cardText}>{product.description}</Card.Text>
                 </Card.Body>
               </Card>
             );
           })}
         </div>
       )}
     </Modal.Body>
   <Modal.Footer>
     <Button variant="secondary" onClick={handleCloseModal}>
       Close
     </Button>
     <Button 
       variant="primary" 
       onClick={() => {
         // Handle submit action here
         console.log("Selected products submitted:", selectedProducts);
         handleCloseModal(); // Optional: close modal after submit
       }}
     >
       Submit
     </Button>
   </Modal.Footer>
   </Modal>
       </div>
     );
   }