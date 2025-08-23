import React, { useState, useEffect,useCallback  } from "react";
import { Card, Row, Col, Form, Button, Modal } from "react-bootstrap";
import styles from "./FrequentlyBought.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { getFBTItems, addFBTItem ,addFBTToProduct} from "../../../api/admin/fbtApi"; // ✅ import API

export default function FrequentlyBought() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
    const location = useLocation();
  const productId = location.state?.productId;

const [newItem, setNewItem] = useState({
  title: "",
  description: "",
  price: "",
  quantity:"",
  status: "ACTIVE",
  media: [], // [{ file: File, preview: string, name: string, size: number }]
});

const onDrop = useCallback((acceptedFiles) => {
  const mapped = acceptedFiles.map((file) => ({
    file,
    preview: URL.createObjectURL(file),
    name: file.name,
    size: file.size,
  }));
  setNewItem((prev) => ({ ...prev, media: [...prev.media, ...mapped] }));
}, []);

const { getRootProps, getInputProps, isDragActive } = useDropzone({
  accept: {
    "image/*": [],    // allow images
    "video/*": [],    // allow videos if you want
  },
  multiple: true,
  onDrop,
});

  // Load FBT items from API
  useEffect(() => {
    const fetchItems = async () => {
      const data = await getFBTItems();
      setProducts(data);
    };
    fetchItems();
  }, []);

  const toggleSelectProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleOpenAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleFileChange = (e) => {
    setNewItem({ ...newItem, media: Array.from(e.target.files).map(file => ({ file })) });
  };

  // const handleAddFBT = async () => {
  //   try {
  //     await addFBTItem(newItem);
  //     const updated = await getFBTItems();
  //     setProducts(updated);
  //     setNewItem({ title: "", media: [] });
  //     handleCloseAddModal();
  //   } catch (err) {
  //     console.error("Error adding FBT item:", err);
  //   }
  // };

  const filteredProducts = products.filter(
    (product) =>
      product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const removeMedia = (idx) => {
  setNewItem((prev) => {
    const copy = [...prev.media];
    // revoke old object URL
    if (copy[idx]?.preview) URL.revokeObjectURL(copy[idx].preview);
    copy.splice(idx, 1);
    return { ...prev, media: copy };
  });
};

// optional: format price input to number
const handlePriceChange = (e) => {
  const val = e.target.value;
  setNewItem((prev) => ({ ...prev, price: val.replace(/[^\d.]/g, "") }));
};

// call your existing addFBTItem API
const handleAddFBT = async () => {
  // basic validation
  if (!newItem.title?.trim()) return alert("Title is required");
  if (!newItem.price) return alert("Price is required");

  try {
    await addFBTItem({
      title: newItem.title.trim(),
      description: newItem.description?.trim() || "",
      price: newItem.price,
      status: newItem.status,
      quantity: newItem.quantity || 1,
       images: newItem.media, // [{file, ...}]
    });

    // reset form
    newItem.media.forEach(m => m.preview && URL.revokeObjectURL(m.preview));
    setNewItem({ title: "", description: "", price: "", status: "ACTIVE", media: [] });
    setShowAddModal(false);

    // refresh list
    const updated = await getFBTItems();
    setProducts(updated);
  } catch (err) {
    console.error(err);
    alert("Failed to add item");
  }
};


const handleSubmitFBT = async () => {
  try {
    await addFBTToProduct(productId, selectedProducts);
    alert("FBT items added successfully ✅");
    setSelectedProducts([]);
    handleCloseModal();
  } catch (err) {
    console.error("Error:", err);
    alert("Failed to add FBT items ❌");
  }
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
            style={{ width: "300px" }}
          />
        </Form.Group>

        <div>
          <Button variant="success" className="me-2" onClick={handleOpenAddModal}>
            + Add FBT Item
          </Button>

          {selectedProducts.length > 0 && (
            <Button variant="primary" onClick={handleOpenModal}>
              Show Selected ({selectedProducts.length})
            </Button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      <Row className="g-2">
        {filteredProducts.map((product) => {
          const isSelected = selectedProducts.includes(product._id);

          return (
            <Col key={product._id} xs={6} sm={3} md={2} lg={2} className="mb-3">
              <Card
                className={`${styles.smallProductCard} h-100 text-center ${
                  isSelected ? styles.selectedCard : ""
                }`}
                onClick={() => toggleSelectProduct(product._id)}
                style={{ cursor: "pointer" }}
              >
                <Card.Img
                  variant="top"
                  src={product.images?.[0]?.url}
                  alt={product.title}
                  className={styles.smallProductImage}
                />
                <Card.Body className="p-2 d-flex flex-column">
                  <Card.Title className="small mb-1">{product.title}</Card.Title>
                  <Card.Text className="text-muted small mb-2">{product.description}</Card.Text>
                  <Card.Text className="fw-bold small mb-1">
      ₹{product.price?.toFixed(2) || "0.00"}
    </Card.Text>

    {/* ✅ Status */}
    <Card.Text
      className={`small mb-2 ${
        product.status === "ACTIVE" ? "text-success" : "text-danger"
      }`}
    >
      {product.status}
    </Card.Text>

                  <Form.Check
                    type="checkbox"
                    label="Select"
                    checked={isSelected}
                    onChange={(e) => e.stopPropagation()}
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
          gap: "15px",
          paddingBottom: "10px",
        }}
      >
        {selectedProducts.map((id) => {
          const product = products.find((p) => p._id === id);
          if (!product) return null;
          return (
            <Card key={id} style={{ minWidth: "220px", flexShrink: 0 }}>
               <Button
                variant="danger"
                size="sm"
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  borderRadius: "50%",
                  padding: "2px 6px",
                }}
                onClick={() =>
                  setSelectedProducts(selectedProducts.filter((pid) => pid !== id))
                }
              >
                ×
              </Button>
              <Card.Img
                src={product.images?.[0]?.url}
                alt={product.title}
                style={{ height: "140px", objectFit: "cover" }}
              />
              <Card.Body className="text-center">
                <Card.Title className="small mb-2">{product.title}</Card.Title>
                <Card.Text className="fw-bold small mb-1">
                  ₹{product.price?.toFixed(2) || "0.00"}
                </Card.Text>
                <Card.Text
                  className={`small ${
                    product.status === "ACTIVE" ? "text-success" : "text-danger"
                  }`}
                >
                  {product.status}
                </Card.Text>
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
        console.log("Submit Selected:", selectedProducts);
        handleSubmitFBT();
        
      }}
    >
      Submit
    </Button>
  </Modal.Footer>
</Modal>


      {/* Add New FBT Item Modal */}
   <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
  <Modal.Header closeButton>
    <Modal.Title>Add Frequently Bought Item</Modal.Title>
  </Modal.Header>

  <Modal.Body>
    <Form>
      <Row className="g-3">
        <Col md={6}>
          <Form.Group>
            <Form.Label>
              Title <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Gold Necklace"
              value={newItem.title}
              onChange={(e) =>
                setNewItem({ ...newItem, title: e.target.value })
              }
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>
              Price <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              inputMode="decimal"
              placeholder="e.g. 4999"
              value={newItem.price}
              onChange={handlePriceChange}
            />
          </Form.Group>
        </Col>

        {/* ✅ Quantity Field */}
        <Col md={3}>
          <Form.Group>
            <Form.Label>
              Quantity <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              min="1"
              placeholder="e.g. 2"
              value={newItem.quantity}
              onChange={(e) =>
                setNewItem({ ...newItem, quantity: e.target.value })
              }
            />
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select
              value={newItem.status}
              onChange={(e) =>
                setNewItem({ ...newItem, status: e.target.value })
              }
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={12}>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Short description shown under the title…"
              value={newItem.description}
              onChange={(e) =>
                setNewItem({ ...newItem, description: e.target.value })
              }
            />
          </Form.Group>
        </Col>

        {/* ✅ Media Upload Section */}
        <Col md={12}>
          <Form.Label>Media (drag & drop or click to upload)</Form.Label>
          <div
            {...getRootProps()}
            style={{
              border: "2px dashed #ced4da",
              borderRadius: 12,
              padding: 20,
              textAlign: "center",
              cursor: "pointer",
              background: isDragActive ? "#f8f9fa" : "transparent",
            }}
          >
            <input {...getInputProps()} />
            <div>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>
                {isDragActive ? "Drop files here…" : "Drag & drop files here"}
              </div>
              <div className="text-muted">or click to browse</div>
            </div>
          </div>

          {/* Previews */}
          {!!newItem.media.length && (
            <Row className="g-3 mt-2">
              {newItem.media.map((m, idx) => (
                <Col key={idx} xs={6} sm={4} md={3} lg={2}>
                  <div
                    style={{
                      position: "relative",
                      border: "1px solid #eee",
                      borderRadius: 10,
                      overflow: "hidden",
                      background: "#fff",
                    }}
                  >
                    {m.file.type.startsWith("video/") ? (
                      <div
                        style={{
                          padding: 12,
                          height: 120,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <small className="text-muted">Video: {m.name}</small>
                      </div>
                    ) : (
                      <img
                        src={m.preview}
                        alt={m.name}
                        style={{
                          width: "100%",
                          height: 120,
                          objectFit: "cover",
                        }}
                      />
                    )}
                    <Button
                      variant="light"
                      onClick={() => removeMedia(idx)}
                      style={{
                        position: "absolute",
                        top: 6,
                        right: 6,
                        borderRadius: "50%",
                        padding: "2px 8px",
                        lineHeight: 1,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                      }}
                      title="Remove"
                    >
                      ×
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Form>
  </Modal.Body>

  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
      Cancel
    </Button>
    <Button variant="primary" onClick={handleAddFBT}>
      Save
    </Button>
  </Modal.Footer>
</Modal>
    </div>
  );
}
