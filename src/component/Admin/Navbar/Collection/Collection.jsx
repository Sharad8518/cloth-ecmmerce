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

export default function Collection() {
  const [headers, setHeaders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [collections, setCollections] = useState([]);

  const [selectedHeader, setSelectedHeader] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectCollection,setSelectionCollection] =useState("")
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isloading, setIsLoading] = useState();
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
      console.error("Error saving collection:", err);
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
      setIsLoading(true);
      const queryParams = {
        search: searchTerm || undefined,
        header: category || undefined,
        collections: selectCollection || undefined,
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
}, [searchTerm, category, selectCollection, page, limit]);


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
    <Pagination className="justify-content-center mt-3">
      {items}
    </Pagination>
  );
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
              </tr>
            </thead>
            <tbody>
              {collections.map((h) => (
                <tr key={h._id} onClick={()=>setSelectionCollection(h.name)}>
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <h4>{selectCollection} Collection Product </h4>
        <div style={{ display: "flex", gap: "10px" }}>
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
          return (
            <Col key={product._id} xs={6} sm={3} md={2} lg={2}>
              <Card
                className={`h-100 text-center`}
                style={{ cursor: "pointer" }}
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
    </Container>
  );
}
