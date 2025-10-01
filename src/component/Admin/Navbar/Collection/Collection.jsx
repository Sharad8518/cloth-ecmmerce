import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  ListGroup,
  Table,
} from "react-bootstrap";
import {
  getHeaders,
  createHeader,
  updateHeader,
  deleteHeader,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection,
} from "../../../api/admin/hierarchyManagerApi";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "./Collection.module.css";
import { getProducts } from "../../../api/user/Productapi";
import Pagination from "react-bootstrap/Pagination";
import { addCollectionToProducts } from "../../../api/admin/productApi";

export default function Collection() {
  const [headers, setHeaders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [collections, setCollections] = useState([]);

  const [selectedHeader, setSelectedHeader] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectCollection, setSelectionCollection] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isloading, setIsLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [limit] = useState(12); //
  const [modal, setModal] = useState({ show: false, entity: "", data: {} });

  useEffect(() => {
    fetchCollects();
  }, []);

  const fetchHeaders = async () => {
    const res = await getHeaders();
    setHeaders(res);
  };

  const fetchCollects = async () => {
    const res = await getCollections();
    setCollections(res);
  };

  const loadCollections = async (subCategoryId) => {
    if (!subCategoryId) {
      setCollections([]); // Clear collections if no subcategory selected
      setSelectedSubCategory(null);
      return;
    }

    setSelectedSubCategory(subCategoryId);
    const res = await getCollections();

    // Filter safely
    const filtered = res.filter((c) => c.subcategory?._id === subCategoryId);
    setCollections(filtered);
  };

  // Save entity
  // Open modal for add/edit collection
  const openCollectionModal = (collection = {}) => {
    setModal({ show: true, entity: "collections", data: collection });
  };

  // Save collection (add or update)
  const saveCollectionEntity = async () => {
    const { data } = modal;

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("slug", data.slug);
      formData.append("description", data.description || "");

      // Append image file if uploaded
      if (data.imageFile) {
        formData.append("image", data.imageFile);
      } else if (data.image) {
        formData.append("image", data.image); // fallback if URL entered
      }

      if (data._id) {
        await updateCollection(data._id, formData); // Update existing
      } else {
        await createCollection(formData); // Create new
      }

      // Refresh collections
      loadCollections(selectedSubCategory);

      // Close modal
      setModal({ show: false, entity: "", data: {} });
    } catch (err) {
      alert(err.response?.data?.error || "Failed to save collection");
    }
  };

  // Delete collection
  const deleteCollectionEntity = async (id) => {
    if (!window.confirm("Are you sure you want to delete this collection?"))
      return;

    const openCollectionModal = (collection = {}) => {
      setModal({ show: true, entity: "collections", data: collection });
    };
    try {
      await deleteCollection(id);
      loadCollections(selectedSubCategory);
    } catch (err) {
      console.error("Error deleting collection:", err);
    }
  };

  // Open modal
  const openModal = (entity, data = {}) => {
    setModal({ show: true, entity, data });
  };

  // Toggle Active / Inactive
  const toggleActive = (headerId) => {
    setHeaders((prev) =>
      prev.map((h) =>
        h._id === headerId ? { ...h, isActive: !h.isActive } : h
      )
    );
  };

  // Toggle Show in Navbar (Yes/No)
  const toggleNavbar = (headerId) => {
    setHeaders((prev) =>
      prev.map((h) =>
        h._id === headerId ? { ...h, showInNavbar: !h.showInNavbar } : h
      )
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = {
          search: searchTerm || undefined,
          header: category || undefined,
          page,
          limit,
        };
        const response = await getProducts(queryParams);

        setAllProducts(response.products);
        setPages(response.pages); // total pages from backend
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [searchTerm, category, page, limit]);

  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= pages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => setPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    return (
      <Pagination className="justify-content-center mt-3">{items}</Pagination>
    );
  };
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [collectionProducts, setCollectionProducts] = useState([]);
  const [selectedCollectionName, setSelectedCollectionName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const fetchProductsByCollection = async (collectionName) => {
    try {
      const response = await getProducts({
        collections: collectionName,
        page: 1,
        limit: 50, // adjust as needed
      });
      setCollectionProducts(response.products || []);
      setSelectedCollectionName(collectionName);
    } catch (error) {
      console.error("Failed to fetch collection products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = (id) =>
    setSelectedProducts(selectedProducts.filter((pid) => pid !== id));
  const handleViewFullImage = (url) => window.open(url, "_blank");
  const toggleSelectProduct = (id) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };
  const handleSubmitSimilar = async () => {
    try {
      // await addSimilarToProduct(productId, selectedProducts );
      await addCollectionToProducts(selectCollection, selectedProducts);
      alert("Collections products added successfully ✅");
      setSelectedProducts([]);
      handleCloseModal();
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to add similar products ❌");
    }
  };

  if (isloading) {
    return <div>Loading</div>;
  }

  return (
    <Container fluid className="p-4">
      {/* Headers */}
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <strong>Collection</strong>
        </Card.Header>

        <Card.Body>
          <Table bordered hover responsive className="align-middle">
            <thead className="table-light">
              <tr>
                <th style={{ width: "15%" }}>Image</th>{" "}
                {/* New column for image */}
                <th style={{ width: "25%" }}>Name</th>
                <th>Edit</th>
                <th>Active/Inactive</th>
                <th>Show in Navbar</th>
                <th>Delete</th>
                {/* <th>
                  <center>Collection Product</center>
                </th> */}
              </tr>
            </thead>
            <tbody>
              {collections?.map((h) => (
                <tr
                  key={h._id}
                  onClick={() => {
                    setSelectionCollection(h.name);
                    fetchProductsByCollection(h.name);
                  }}
                  style={{
                    backgroundColor:
                      selectCollection === h.name ? "green" : "transaparent",
                  }}
                >
                  {/* Image Column */}
                  <td>
                    {h.image ? (
                      <img
                        src={h.image}
                        alt={h.name}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          borderRadius: "4px",
                        }}
                      />
                    ) : (
                      <span>No Image</span>
                    )}
                  </td>

                  {/* Name Column */}
                  <td
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                    className={
                      selectedHeader === h._id
                        ? styles.listGroupItemActiveCustom
                        : ""
                    }
                  >
                    {h.name}
                  </td>

                  {/* Edit */}
                  <td>
                    <Button
                      size="sm"
                      className={`${styles.actionButton} ${styles.editButton}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        openCollectionModal(h);
                      }}
                    >
                      <FiEdit3 />
                    </Button>
                  </td>

                  {/* Active/Inactive */}
                  <td>
                    <Button
                      size="sm"
                      className={`${styles.actionButton}`}
                      style={{ background: "orange", border: "none" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleActive("headers", h._id);
                      }}
                    >
                      {h.active ? "Active" : "Inactive"}
                    </Button>
                  </td>

                  {/* Show in Navbar */}
                  <td>
                    <Button
                      size="sm"
                      className={`${styles.actionButton}`}
                      style={{ background: "orange", border: "none" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleNavbar("headers", h._id);
                      }}
                    >
                      {h.showInNavbar ? "Yes" : "No"}
                    </Button>
                  </td>

                  {/* Delete */}
                  <td>
                    <Button
                      size="sm"
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteCollectionEntity(h._id);
                      }}
                    >
                      <AiOutlineDelete />
                    </Button>
                  </td>

                  {/* <td>
                    <center>
                      <Button
                        size="sm"
                        style={{ width: "100px", height: 30 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          fetchProductsByCollection(h.name);
                        }}
                      >
                        Show
                      </Button>
                    </center>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
          <Button
            className={styles.addButton}
            onClick={() => openCollectionModal()}
          >
            + Add
          </Button>
        </Card.Body>
      </Card>

      <h4>{selectCollection}</h4>
      {collectionProducts.length > 0 ? (
        <Row className="g-2">
          {collectionProducts.map((product) => {
            //  const isSelected = selectedProducts?.includes(product._id);
            return (
              <Col key={product._id} xs={6} sm={3} md={2} lg={2}>
                <Card
                  className={`h-100 text-center`}
                  style={{ cursor: "pointer" }}
                  onClick={() => toggleSelectProduct(product._id)}
                >
                  <Card.Img
                    variant="top"
                    src={product.media?.[0]?.url}
                    alt={product.title}
                    className={styles.smallProductImage}
                  />
                  <Card.Body className="p-2 d-flex flex-column">
                    <Card.Title
                      className=" mb-1 text-truncate"
                      style={{ maxWidth: "200px", fontSize: 14 }}
                    >
                      {product.title}
                    </Card.Title>
                    <Card.Text
                      className="text-muted small mb-2 text-truncate"
                      style={{ flexGrow: 1, maxWidth: "200px" }}
                    >
                      {product.description}
                    </Card.Text>
                    {/* <Form.Check
                    type="checkbox"
                    label="Select"
                    checked={isSelected}
                    onChange={(e) =>
                      e.stopPropagation() || toggleSelectProduct(product._id)
                    }
                    className="small"
                  /> */}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <p>No products found in this collection.</p>
      )}

      <br />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        <div style={{ display: "flex", gap: "10px" }}>
          {selectedProducts?.length > 0 && (
            <Button variant="primary" onClick={handleOpenModal}>
              Show Selected ({selectedProducts.length})
            </Button>
          )}
          {/* Search Input */}
          <Form.Control
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 300 }}
          />

          {/* Category Select */}
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: 200 }}
          >
            <option value="">Select Category</option>
            <option value="Designer Suit">Designer Suit</option>
            <option value="Indo Western">Indo Western</option>
            <option value="Kurta Set">Kurta Set</option>
            <option value="Jwellery">Jwellery</option>
            <option value="Mens">Mens</option>
          </Form.Select>
        </div>

        {/* Show Selected Button */}
      </div>
      <hr />

      <Row className="g-2">
        {allProducts?.map((product) => {
          const isSelected = selectedProducts?.includes(product._id);
          return (
            <Col key={product._id} xs={6} sm={3} md={2} lg={2}>
              <Card
                className={`h-100 text-center`}
                style={{ cursor: "pointer" }}
                onClick={() => toggleSelectProduct(product._id)}
              >
                <Card.Img
                  variant="top"
                  src={product.media?.[0]?.url}
                  alt={product.title}
                  className={styles.smallProductImage}
                />
                <Card.Body className="p-2 d-flex flex-column">
                  <Card.Title
                    className=" mb-1 text-truncate"
                    style={{ maxWidth: "200px", fontSize: 14 }}
                  >
                    {product.title}
                  </Card.Title>
                  <Card.Text
                    className="text-muted small mb-2 text-truncate"
                    style={{ flexGrow: 1, maxWidth: "200px" }}
                  >
                    {product.description}
                  </Card.Text>
                  <Form.Check
                    type="checkbox"
                    label="Select"
                    checked={isSelected}
                    onChange={(e) =>
                      e.stopPropagation() || toggleSelectProduct(product._id)
                    }
                    className="small"
                  />
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      {renderPagination()}
      <Modal
        show={modal.show && modal.entity === "collections"}
        onHide={() => setModal({ show: false, entity: "", data: {} })}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modal.data._id ? "Edit Collection" : "Add Collection"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            {/* Name */}
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter collection name"
                value={modal.data.name || ""}
                onChange={(e) =>
                  setModal({
                    ...modal,
                    data: { ...modal.data, name: e.target.value },
                  })
                }
              />
            </Form.Group>

            {/* Slug */}
            <Form.Group className="mb-3">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter slug"
                value={modal.data.slug || ""}
                onChange={(e) =>
                  setModal({
                    ...modal,
                    data: { ...modal.data, slug: e.target.value },
                  })
                }
              />
            </Form.Group>

            {/* Image */}
            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>

              <div
                onDragEnter={(e) => e.preventDefault()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    setModal((prev) => ({
                      ...prev,
                      data: {
                        ...prev.data,
                        imageFile: file,
                        imagePreview: URL.createObjectURL(file),
                      },
                    }));
                  }
                }}
                onClick={() => document.getElementById("fileInput").click()}
                style={{
                  border: "2px dashed #ccc",
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setModal((prev) => ({
                        ...prev,
                        data: {
                          ...prev.data,
                          imageFile: file,
                          imagePreview: URL.createObjectURL(file),
                        },
                      }));
                    }
                  }}
                />

                {modal.data.imagePreview ? (
                  <img
                    src={modal.data.imagePreview}
                    alt="Preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "150px",
                      marginTop: "10px",
                      borderRadius: "4px",
                    }}
                  />
                ) : (
                  <p>Drag & drop an image here, or click to select</p>
                )}
              </div>
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={modal.data.description || ""}
                onChange={(e) =>
                  setModal({
                    ...modal,
                    data: { ...modal.data, description: e.target.value },
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setModal({ show: false, entity: "", data: {} })}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={saveCollectionEntity}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showProductModal}
        onHide={() => setShowProductModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{selectedCollectionName} - Products</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {collectionProducts.length > 0 ? (
            <Row className="g-2">
              {collectionProducts.map((product) => (
                <Col key={product._id} xs={6} sm={4} md={3}>
                  <Card className="h-100 text-center">
                    <Card.Img
                      variant="top"
                      src={product.media?.[0]?.url}
                      alt={product.title}
                      style={{
                        // height: "120px",
                        objectFit: "cover",
                      }}
                    />
                    <Card.Body className="p-2">
                      <Card.Title
                        className="mb-1 text-truncate"
                        style={{ fontSize: 14 }}
                      >
                        {product.title}
                      </Card.Title>
                      <Card.Text
                        className="text-muted small mb-0 text-truncate"
                        style={{ fontSize: 12 }}
                      >
                        {product.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>No products found in this collection.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowProductModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Selected Products</Modal.Title>
        </Modal.Header>
        <h5
          style={{
            marginTop: 0,
            background: "#dfe6e9",
            padding: 10,
            textAlign: "center",
            fontSize: 15,
          }}
        >
          {selectCollection}
        </h5>
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
          <Button
            variant="primary"
            onClick={handleSubmitSimilar}
            disabled={!selectCollection}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
