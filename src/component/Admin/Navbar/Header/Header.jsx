import { useEffect, useState } from "react";
import { Container, Card, Button, Modal, Form, Table } from "react-bootstrap";
import {
  getHeaders,
  createHeader,
  updateHeader,
  deleteHeader,
} from "../../../api/admin/hierarchyManagerApi";
import { FiEdit3 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import styles from "./Header.module.css";

export default function Header() {
  const [headers, setHeaders] = useState([]);
  const [modal, setModal] = useState({ show: false, data: {} });

  useEffect(() => {
    fetchHeaders();
  }, []);

  const fetchHeaders = async () => {
    const res = await getHeaders();
    setHeaders(res);
  };

  // Save or update header
  const saveEntity = async () => {
    const { data } = modal;
    console.log('data',data)
    if (data._id) {
      await updateHeader(data._id, data);
    } else {
      await createHeader(data);
    }
    fetchHeaders();
    setModal({ show: false, data: {} });
  };

  // Delete header
  const deleteEntity = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await deleteHeader(id);
    fetchHeaders();
  };

  // Generic toggle handler
  const handleToggle = async (headerId, field) => {
    const header = headers.find((h) => h._id === headerId);
    if (!header) return;

    let newValue;
    if (field === "status") {
      newValue = header.status === "Active" ? "Inactive" : "Active";
    } else if (field === "showNavbar" || field === "addCategory") {
      newValue = header[field] === "Yes" ? "No" : "Yes";
    } else {
      return;
    }

    // Optimistic UI update
    setHeaders((prev) =>
      prev.map((h) => (h._id === headerId ? { ...h, [field]: newValue } : h))
    );

    try {
      await updateHeader(headerId, { [field]: newValue });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container fluid className="p-4">
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <strong>Headers</strong>
          <Button
            className={styles.addButton}
            onClick={() => setModal({ show: true, data: {} })}
          >
            + Add
          </Button>
        </Card.Header>

        <Card.Body>
          <Table
            bordered
            hover
            responsive
            className="align-middle"
            style={{ fontSize: 13 }}
          >
            <thead className="table-light">
              <tr>
                <th style={{ width: "25%" }}>Name</th>
                <th>Edit</th>
                <th>Status</th>
                <th>Show in Navbar</th>
                <th>Add Category</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {headers.map((h) => (
                <tr key={h._id}>
                  <td style={{ fontWeight: "bold" }}>{h.title}</td>
                  <td>
                    <Button
                      size="sm"
                      className={`${styles.actionButton} ${styles.editButton}`}
                      onClick={() => setModal({ show: true, data: h })}
                    >
                      <FiEdit3 />
                    </Button>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      className={styles.actionButton}
                      style={{
                        background: h.status === "Active" ? "green" : "red",
                      }}
                      onClick={() => handleToggle(h._id, "status")}
                    >
                      {h.status}
                    </Button>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      className={styles.actionButton}
                      style={{
                        background: h.showNavbar === "Yes" ? "green" : "red",
                      }}
                      onClick={() => handleToggle(h._id, "showNavbar")}
                    >
                      {h.showNavbar}
                    </Button>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      className={styles.actionButton}
                      style={{
                        background: h.addCategory === "Yes" ? "green" : "red",
                      }}
                      onClick={() => handleToggle(h._id, "addCategory")}
                    >
                      {h.addCategory}
                    </Button>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      className={`${styles.actionButton} ${styles.deleteButton}`}
                      onClick={() => deleteEntity(h._id)}
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

      {/* Modal for Add/Edit */}
      <Modal
        show={modal.show}
        onHide={() => setModal({ show: false, data: {} })}
      >
        <Modal.Header closeButton>
          <Modal.Title>{modal.data._id ? "Edit" : "Add"} Header</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={modal.data.title || ""}
                onChange={(e) =>
                  setModal({
                    ...modal,
                    data: { ...modal.data, title: e.target.value },
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Image</Form.Label>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  if (file && file.type.startsWith("image/")) {
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
                  border: "2px dashed #aaa",
                  borderRadius: "10px",
                  padding: "20px",
                  textAlign: "center",
                  cursor: "pointer",
                  background: "#f9f9f9",
                }}
              >
                <input
                  id="fileInput"
                  type="file"
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
                  <div>
                    <img
                      src={modal.data.imagePreview}
                      alt="Preview"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "150px",
                        borderRadius: "6px",
                        marginBottom: "10px",
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-sm btn-outline-danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModal((prev) => ({
                          ...prev,
                          data: {
                            ...prev.data,
                            imageFile: null,
                            imagePreview: null,
                          },
                        }));
                      }}
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <p className="text-muted mb-0">
                    Drag & drop an image here, or click to select
                  </p>
                )}
              </div>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setModal({ show: false, data: {} })}
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
