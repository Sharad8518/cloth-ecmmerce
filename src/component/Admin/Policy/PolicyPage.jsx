import React, { useEffect, useState } from "react";
import {
  getPolicies,
  addPolicy,
  editPolicy,
  deletePolicy,
} from "../../api/admin/policyApi";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";

export default function PolicyPage() {
const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editId, setEditId] = useState(null);
  const [show, setShow] = useState(false);

  const fetchPolicies = async () => {
    try {
      const data = await getPolicies();
      setPolicies(data.data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleSubmit = async () => {
    try {
      if (editId) {
        await editPolicy(editId, form);
      } else {
        await addPolicy(form);
      }
      setForm({ title: "", description: "" });
      setEditId(null);
      setShow(false);
      fetchPolicies();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePolicy(id);
      fetchPolicies();
    } catch (err) {
      alert(err.message);
    }
  };

  console.log('policies',policies)

  return (
    <Container className="mt-5">
      <Row className="mb-3">
        <Col>
          <h2> Exchange & Retrun Policy Management</h2>
        </Col>
        <Col className="text-end">
          <Button onClick={() => setShow(true)}>+ Add Policy</Button>
        </Col>
      </Row>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th style={{ width: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {policies?.map((p) => (
              <tr key={p._id}>
                <td>{p?.title}</td>
                <td>{p?.description}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setForm({ title: p.title, description: p.description });
                      setEditId(p._id);
                      setShow(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal for Add/Edit */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Policy" : "Add Policy"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter policy title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editId ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}