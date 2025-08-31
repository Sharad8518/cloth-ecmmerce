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
import styles from "./Header.module.css";

export default function Header() {
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
    console.log("Categories loaded for header:", res);
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

  // Toggle Active / Inactive
const handleToggle = async (headerId, field) => {
  const header = headers.find((h) => h._id === headerId);
  if (!header) return;

  // Map DB value to boolean
  let newValue;
  if (field === "status") {
    newValue = header.status === "Active" ? "Inactive" : "Active";
  } else if (field === "showNavbar") {
    newValue = header.showNavbar === "Yes" ? "No" : "Yes";
  } else if (field === "addCategory") {
    newValue = header.addCategory === "Yes" ? "No" : "Yes";
  } else {
    return;
  }

  // Update UI optimistically
  setHeaders((prev) =>
    prev.map((h) => (h._id === headerId ? { ...h, [field]: newValue } : h))
  );

  // Update backend
  try {
    await updateHeader(headerId, { [field]: newValue });
  } catch (err) {
    console.error(err);
  }
};

  // Toggle Show in Navbar (Yes/No)
const toggleNavbar = async (headerId) => {
  const header = headers.find((h) => h._id === headerId);
  if (!header) return;

  const newValue = header.showNavbar === "Yes" ? "No" : "Yes";

  // Optimistically update UI
  setHeaders((prev) =>
    prev.map((h) =>
      h._id === headerId ? { ...h, showNavbar: newValue } : h
    )
  );

  // Update backend using generic updateHeader
  try {
    await updateHeader(headerId, { showNavbar: newValue });
  } catch (err) {
    console.error("Failed to toggle showNavbar", err);
  }
};


  const toggleAddCategory = async (entity, id) => {
  try {
    await axios.put(`/api/${entity}/${id}/toggle-add-category`);
    fetchHeaders(); // refresh list
  } catch (err) {
    console.error("Failed to toggle addCategory", err);
  }
};

  return (
    <Container fluid className="p-4">
      {/* Headers */}
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <strong>Headers</strong>
          <Button
            className={styles.addButton}
            onClick={() => openModal("headers")}
          >
            + Add
          </Button>
        </Card.Header>

        <Card.Body>
          <Table bordered hover responsive className="align-middle" style={{fontSize:13}}>
            <thead className="table-light">
              <tr>
                <th style={{ width: "25%" }}>Name</th>
                <th>Edit</th>
                <th>Active/Inactive</th>
                <th>Show in Navbar</th>
                <th>Add Category</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {headers.map((h) => (
                <tr key={h._id} onClick={() => loadCategories(h._id)}>
                  <td
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                    className={
                      selectedHeader === h._id
                        ? styles.listGroupItemActiveCustom
                        : ""
                    }
                  >
                    {h.title}
                  </td>
                  <td>
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
                  </td>
                  <td>
                    <Button
                      size="sm"
                      className={`${styles.actionButton}`}
                      style={{ background:h.status ==="Active"? "green":"red",  }}
                      onClick={(e) => {
                        e.stopPropagation();
                       handleToggle(h._id, "status");
                      }}
                    >
                      {h.status}
                    </Button>
                  </td>
                  <td>
                    <Button
                      size="sm"
                       style={{ background:h.showNavbar ==="Yes"? "green":"red",  }}
                      className={`${styles.actionButton}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggle(h._id,"showNavbar");
                      }}
                    >
                      {h.showNavbar}
                    </Button>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      className={styles.actionButton}
                      style={{ background:h.addCategory ==="Yes"? "green":"red",  }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggle(h._id,"addCategory"); // ⬅️ new function
                      }}
                    >
                      {h.addCategory}
                    </Button>
                  </td>
                  <td>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal stays same */}
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
