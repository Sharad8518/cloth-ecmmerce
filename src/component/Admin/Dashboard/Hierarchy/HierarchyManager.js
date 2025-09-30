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
import styles from "./HierarchyManager.module.css";

export default function HierarchyManager() {
  const [headers, setHeaders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [collections, setCollections] = useState([]);

  const [selectedHeader, setSelectedHeader] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const [modal, setModal] = useState({ show: false, entity: "", data: {} });

  useEffect(() => {
    fetchHeaders();
  }, []);

  const fetchHeaders = async () => {
    const res = await getHeaders();
    setHeaders(res);
  };

  const fetchCategory = async () => {
    const res = await getCategories();
    setCategories(res);
  };

  const fetchSubCategory = async () => {
    const res = await getSubCategories();
    setSubCategories(res);
  };

  const fetchCollects = async () => {
    const res = await getCollections();
    setCollections(res);
  };

  const loadCategories = async (headerId) => {
    setSelectedHeader(headerId);
    const res = await getCategories();
    setCategories(res.filter((c) => c.header._id === headerId));

    setSubCategories([]);
    setCollections([]);
  };

  const loadSubCategories = async (categoryId) => {
    setSelectedCategory(categoryId);
    const res = await getSubCategories();
    setSubCategories(res.filter((s) => s.category._id === categoryId));
    setCollections([]);
  };

  const loadCollections = async (subCategoryId) => {
    setSelectedSubCategory(subCategoryId);
    const res = await getCollections();
    setCollections(res.filter((c) => c.subcategory._id === subCategoryId));
  };

  // Save entity
  const saveEntity = async () => {
    const { entity, data } = modal;

    if (entity === "headers") {
      data._id ? await updateHeader(data._id, data) : await createHeader(data);
      fetchHeaders();
    }

    if (entity === "categorys") {
      data._id
        ? await updateCategory(data._id, data)
        : await createCategory(data);
      loadCategories(selectedHeader);
    }

    if (entity === "subcategorys") {
      data._id
        ? await updateSubCategory(data._id, data)
        : await createSubCategory(data);
      loadSubCategories(selectedCategory);
    }

    if (entity === "collections") {
      data._id
        ? await updateCollection(data._id, data)
        : await createCollection(data);
      loadCollections(selectedSubCategory);
    }

    setModal({ show: false, entity: "", data: {} });
  };

  // Delete entity
  const deleteEntity = async (entity, id) => {
    if (!window.confirm("Are you sure?")) return;

    if (entity === "headers") {
      await deleteHeader(id);
      fetchHeaders();
    }

    if (entity === "categorys") {
      await deleteCategory(id);
      loadCategories(selectedHeader);
    }

    if (entity === "subcategorys") {
      await deleteSubCategory(id);
      loadSubCategories(selectedCategory);
    }

    if (entity === "collections") {
      await deleteCollection(id);
      loadCollections(selectedSubCategory);
    }
  };

  // Open modal
  const openModal = (entity, data = {}) => {
    setModal({ show: true, entity, data });
  };

  return (
    <Container fluid className="p-4">
      
   <Card>
  <Card.Header className="d-flex justify-content-between align-items-center">
    <strong>Headers</strong>
    <Button
      className={styles.addButton}
      onClick={() => openModal("headers")}
    >
      + Add
    </Button>
  </Card.Header>

  {/* Horizontal scrollable list */}
  <div
    style={{
      display: "flex",
      overflowX: "auto",
      whiteSpace: "nowrap",
      padding: "10px",
      gap: "10px",
    }}
  >
    {headers.map((h) => (
      <div
        key={h._id}
        onClick={() => loadCategories(h._id)}
        style={{
          cursor: "pointer",
          minWidth: "200px",
          flex: "0 0 auto",
        }}
        className={`p-2 rounded border d-flex justify-content-between align-items-center 
          ${styles.textHeading} 
          ${selectedHeader === h._id ? styles.listGroupItemActiveCustom : ""}`}
      >
        <span>{h.title}</span>
        <div className="d-flex gap-2">
          <Button
            size="sm"
            className={`${styles.actionButton} ${styles.editButton}`}
            onClick={(e) => {
              e.stopPropagation();
              openModal("headers", h);
            }}
          >
            <FiEdit3 />
          </Button>
          <Button
            size="sm"
            className={`${styles.actionButton} ${styles.deleteButton}`}
            onClick={(e) => {
              e.stopPropagation();
              deleteEntity("headers", h._id);
            }}
          >
            <AiOutlineDelete />
          </Button>
        </div>
      </div>
    ))}
  </div>
</Card>
      <Row>
        {/* Headers */}
     

        {/* Categories */}
        <Col md={4}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <strong>Categories</strong>
             
            </Card.Header>
            <ListGroup variant="flush">
              {categories.map((c) => (
                <ListGroup.Item
                  key={c._id}
                  active={selectedCategory === c._id}
                  onClick={() => loadSubCategories(c._id)}
                  style={{ cursor: "pointer" }}
                  className={`d-flex justify-content-between align-items-center ${
                    styles.textHeading
                  } ${
                    selectedCategory === c._id
                      ? styles.listGroupItemActiveCustom
                      : ""
                  }`}
                >
                  {c.name}
                  <div>
                    <Button
                      size="sm"
                       className={`${styles.actionButton} ${styles.editButton}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal("categorys", c);
                      }}
                    >
                      <FiEdit3 />
                    </Button>{" "}
                    <Button
                      size="sm"
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteEntity("categorys", c._id);
                      }}
                    >
                      <AiOutlineDelete />
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
             {selectedHeader && (
                <Button
                  className={styles.addButton}
                  onClick={() =>
                    openModal("categorys", { header: selectedHeader })
                  }
                >
                  + Add
                </Button>
              )}
          </Card>
        </Col>

        {/* SubCategories */}
        <Col md={4}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <strong>SubCategories</strong>
             
            </Card.Header>
            <ListGroup variant="flush">
              {subCategories.map((s) => (
                <ListGroup.Item
                  key={s._id}
                  active={selectedSubCategory === s._id}
                  onClick={() => loadCollections(s._id)}
                  style={{ cursor: "pointer" }}
                  className={`d-flex justify-content-between align-items-center ${
                    styles.textHeading
                  } ${
                    selectedSubCategory === s._id
                      ? styles.listGroupItemActiveCustom
                      : ""
                  }`}
                >
                  {s.name}
                  <div>
                    <Button
                      size="sm"
                      className={`${styles.actionButton} ${styles.editButton}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal("subcategorys", s);
                      }}
                    >
                      <FiEdit3 />
                    </Button>{" "}
                    <Button
                      size="sm"
                       className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteEntity("subcategorys", s._id);
                      }}
                    >
                      <AiOutlineDelete />
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
             {selectedCategory && (
                <Button
                  className={styles.addButton}
                  onClick={() =>
                    openModal("subcategorys", { category: selectedCategory })
                  }
                >
                  + Add
                </Button>
              )}
          </Card>
        </Col>

        {/* Collections */}
        <Col md={4}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <strong>Collections</strong>
             
            </Card.Header>
            <ListGroup variant="flush">
              {collections.map((col) => (
                <ListGroup.Item
                  key={col._id}
                  className="d-flex justify-content-between align-items-center"
                >
                  {col.name}
                  <div>
                    <Button
                      size="sm"
                        className={`${styles.actionButton} ${styles.editButton}`}
                      onClick={() => openModal("collections", col)}
                    >
                      <FiEdit3 />
                    </Button>{" "}
                    <Button
                      size="sm"
                     className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={() => deleteEntity("collections", col._id)}
                    >
                      <AiOutlineDelete />
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
             {selectedSubCategory && (
                <Button
                  className={styles.addButton}
                  onClick={() =>
                    openModal("collections", {
                      subcategory: selectedSubCategory,
                    })
                  }
                >
                  + Add
                </Button>
              )}
          </Card>
        </Col>
      </Row>

      {/* Modal */}
      <Modal
        show={modal.show}
        onHide={() => setModal({ show: false, entity: "", data: {} })}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modal.data._id ? "Edit" : "Add"} {modal.entity.slice(0, -1)}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name / Title</Form.Label>
              <Form.Control
                type="text"
                value={
                  modal.entity === "headers"
                    ? modal.data.title || ""
                    : modal.data.name || ""
                }
                onChange={(e) =>
                  setModal({
                    ...modal,
                    data: {
                      ...modal.data,
                      title:
                        modal.entity === "headers"
                          ? e.target.value
                          : modal.data.title,
                      name:
                        modal.entity !== "headers"
                          ? e.target.value
                          : modal.data.name,
                    },
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                type="text"
                value={modal.data.slug || ""}
                onChange={(e) =>
                  setModal({
                    ...modal,
                    data: { ...modal.data, slug: e.target.value },
                  })
                }
              />
            </Form.Group>
            {modal.entity === "collections" && (
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={modal.data.description || ""}
                  onChange={(e) =>
                    setModal({
                      ...modal,
                      data: { ...modal.data, description: e.target.value },
                    })
                  }
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setModal({ show: false, entity: "", data: {} })}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={saveEntity}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
