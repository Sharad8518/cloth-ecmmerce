import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Row, Col } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const NavbarManager = () => {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    label: "",
    url: "",
    icon: "",
    order: 0,
    isActive: true,
    subcategories: [],
  });

  const fetchNavbarItems = async () => {
  

  };

  useEffect(() => {
    fetchNavbarItems();
  }, []);

  const handleChange = (e, index, sub = false) => {
    const { name, value, type, checked } = e.target;

    if (sub) {
      const updatedSubs = [...formData.subcategories];
      updatedSubs[index][name] = value;
      setFormData({ ...formData, subcategories: updatedSubs });
    } else {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    }
  };

  const handleAddSubcategory = () => {
    setFormData({
      ...formData,
      subcategories: [...formData.subcategories, { label: "", url: "", icon: "", order: 0 }],
    });
  };

  const handleRemoveSubcategory = (index) => {
    const updatedSubs = formData.subcategories.filter((_, i) => i !== index);
    setFormData({ ...formData, subcategories: updatedSubs });
  };

  const handleSave = async () => {
    if (editingItem) {
   
    } else {
     
    }
    setShowModal(false);
    setEditingItem(null);
    setFormData({ label: "", url: "", icon: "", order: 0, isActive: true, subcategories: [] });
    fetchNavbarItems();
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
    
    }
  };

  return (
    <div>
      <h3 className="mb-4">Manage Navbar</h3>
      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        Add Navbar Item
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Label</th>
            <th>URL</th>
            <th>Icon</th>
            <th>Order</th>
            <th>Subcategories</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length > 0 ? (
            items.map((item) => (
              <tr key={item._id}>
                <td>{item.label}</td>
                <td>{item.url}</td>
                <td>{item.icon}</td>
                <td>{item.order}</td>
                <td>
                  {item.subcategories?.length
                    ? item.subcategories.map((sub) => sub.label).join(", ")
                    : "None"}
                </td>
                <td>{item.isActive ? "Yes" : "No"}</td>
                <td>
                  <Button size="sm" variant="warning" className="me-2" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(item._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No items found
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => { setShowModal(false); setEditingItem(null); }}>
        <Modal.Header closeButton>
          <Modal.Title>{editingItem ? "Edit Navbar Item" : "Add Navbar Item"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Label</Form.Label>
              <Form.Control type="text" name="label" value={formData.label} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>URL</Form.Label>
              <Form.Control type="text" name="url" value={formData.url} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Icon</Form.Label>
              <Form.Control type="text" name="icon" value={formData.icon} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Order</Form.Label>
              <Form.Control type="number" name="order" value={formData.order} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Check type="checkbox" label="Active" name="isActive" checked={formData.isActive} onChange={handleChange} />
            </Form.Group>

            <hr />
            <h6>Subcategories</h6>
            {formData.subcategories.map((sub, index) => (
              <Row key={index} className="mb-2">
                <Col>
                  <Form.Control type="text" placeholder="Label" name="label" value={sub.label} onChange={(e) => handleChange(e, index, true)} />
                </Col>
                <Col>
                  <Form.Control type="text" placeholder="URL" name="url" value={sub.url} onChange={(e) => handleChange(e, index, true)} />
                </Col>
                <Col>
                  <Form.Control type="text" placeholder="Icon" name="icon" value={sub.icon} onChange={(e) => handleChange(e, index, true)} />
                </Col>
                <Col>
                  <Form.Control type="number" placeholder="Order" name="order" value={sub.order} onChange={(e) => handleChange(e, index, true)} />
                </Col>
                <Col>
                  <Button variant="danger" onClick={() => handleRemoveSubcategory(index)}>Remove</Button>
                </Col>
              </Row>
            ))}
            <Button variant="secondary" onClick={handleAddSubcategory}>Add Subcategory</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>{editingItem ? "Update" : "Add"}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NavbarManager;
