import React, { useState, useEffect } from "react";
import { Button, Row, Col, Card, Form, Modal } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { getProducts,addSimilarToProduct } from "../../../api/admin/productApi";

import styles from "./SimilarProduct.module.css";

export default function SimilarProduct() {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId, productDetails } = location.state || {};

  const [allProducts, setAllProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isloading,setIsLoading] =useState(true)

  // Fetch all products on mount
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await getProducts();

      // response.products contains the array
      const otherProducts = response.products.filter(
        (p) => String(p._id) !== String(productId)
      );

      setAllProducts(otherProducts);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setIsLoading(false);
    }
  };

  fetchProducts();
}, [productId]);

console.log('allProducts',allProducts)

  const toggleSelectProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const removeProduct = (id) =>
    setSelectedProducts(selectedProducts.filter((pid) => pid !== id));

  const handleViewFullImage = (url) => window.open(url, "_blank");

  const handleSubmitSimilar = async () => {
    try {
      await addSimilarToProduct(productId, selectedProducts );
      alert("Similar products added successfully ✅");
      setSelectedProducts([]);
      handleCloseModal();
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to add similar products ❌");
    }
  };

  // Filter products by search term
  // const filteredProducts = allProducts.filter(
  //   (p) =>
  //     p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     p.description.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  if(isloading){
    return<div>Loading</div>
  }

  return (
    <div className="p-4">
      <Button variant="light" className="mb-4" onClick={() => navigate(-1)}>
        &#8592; Back
      </Button>

      <h2 className="mb-4">Similar Products</h2>

      {/* Current Product */}
     {productDetails && (
  <Card className="mb-4 p-2" style={{ maxWidth: 600, display: "flex", flexDirection: "row", alignItems: "center" }}>
    <div style={{ flex: 1, paddingRight: 10 }}>
      <Card.Body style={{ padding: 0 }}>
        <Card.Title>{productDetails.title}</Card.Title>
        <Card.Text className="text-muted">{productDetails.description}</Card.Text>
      </Card.Body>
    </div>
    <div style={{ width: 120, flexShrink: 0 }}>
      <Card.Img
        src={productDetails.media?.[0]?.url}
        alt={productDetails.title}
        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }}
      />
    </div>
  </Card>
)}
      {/* Search & Show Selected */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <Form.Control
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: 300 }}
        />
        {selectedProducts.length > 0 && (
          <Button variant="primary" onClick={handleOpenModal}>
            Show Selected ({selectedProducts.length})
          </Button>
        )}
      </div>

      {/* Product Grid */}
      <Row className="g-2">
        {allProducts?.map((product) => {
          const isSelected = selectedProducts.includes(product._id);
          return (
            <Col key={product._id} xs={6} sm={3} md={2} lg={2}>
              <Card
                className={`${styles.smallProductCard} h-100 text-center ${
                  isSelected ? styles.selectedCard : ""
                }`}
                onClick={() => toggleSelectProduct(product._id)}
                style={{ cursor: "pointer" }}
              >
                <Card.Img
                  variant="top"
                  src={product.media?.[0]?.url}
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
                    onChange={(e) => e.stopPropagation() || toggleSelectProduct(product._id)}
                    className="small"
                  />
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Selected Products Modal */}
     <Modal show={showModal} onHide={handleCloseModal} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Selected Products</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    {selectedProducts.length === 0 ? (
      <p>No products selected.</p>
    ) : (
      <div
        style={{
          display: "flex",
          overflowX: "auto",
          gap: "12px",
          padding: "8px 0",
        }}
      >
        {selectedProducts.map((id) => {
          const product = allProducts.find((p) => p._id === id);
          if (!product) return null;

          return (
            <div
              key={product._id}
              style={{
                minWidth: 140,
                maxWidth: 140,
                flex: "0 0 auto",
                border: "1px solid #ddd",
                borderRadius: 8,
                overflow: "hidden",
                position: "relative",
                background: "#fff",
              }}
            >
              <img
                src={product.media?.[0]?.url}
                alt={product.title}
                style={{
                  width: "100%",
                  height: 100,
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() =>
                  handleViewFullImage(product.media?.[0]?.url)
                }
              />
              <Button
                variant="danger"
                size="sm"
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  borderRadius: "50%",
                  padding: "2px 8px",
                  lineHeight: 1,
                }}
                onClick={() => removeProduct(product._id)}
              >
                ×
              </Button>
              <div style={{ padding: 6 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    marginBottom: 2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.title}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#666",
                    height: 32,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {product.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseModal}>
      Close
    </Button>
    <Button variant="primary" onClick={handleSubmitSimilar}>
      Submit
    </Button>
  </Modal.Footer>
</Modal>
    </div>
  );
}
