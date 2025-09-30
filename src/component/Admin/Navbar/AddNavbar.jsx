import React, { useEffect, useState } from "react";
import { Form, Button, Col, Row, Card, Spinner } from "react-bootstrap";
import axios from "axios";

export default function AddNavbar() {

     const [navbarItem, setNavbarItem] = useState({
    label: "",
    url: "",
    icon: "",
    order: 0,
    parent: null,
    isActive: true,
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch existing categories for parent selection
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/navbar");
        setCategories(res.data.data || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNavbarItem({
      ...navbarItem,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/navbar", navbarItem);
      alert("Navbar item created successfully!");
      setNavbarItem({
        label: "",
        url: "",
        icon: "",
        order: 0,
        parent: null,
        isActive: true,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to create navbar item");
    } finally {
      setLoading(false);
    }
  };
  return (
     <Row className="justify-content-center mt-4">
      <Col md={6}>
        <Card className="shadow-sm">
          <Card.Body>
            <h4 className="mb-4 text-primary text-center">Add Navbar Item</h4>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Label</Form.Label>
                <Form.Control
                  type="text"
                  name="label"
                  value={navbarItem.label}
                  onChange={handleChange}
                  placeholder="Enter category or subcategory name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>URL</Form.Label>
                <Form.Control
                  type="text"
                  name="url"
                  value={navbarItem.url}
                  onChange={handleChange}
                  placeholder="/dashboard/products"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Icon (Optional)</Form.Label>
                <Form.Control
                  type="text"
                  name="icon"
                  value={navbarItem.icon}
                  onChange={handleChange}
                  placeholder="e.g., FaHome"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Order</Form.Label>
                <Form.Control
                  type="number"
                  name="order"
                  value={navbarItem.order}
                  onChange={handleChange}
                  placeholder="0"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Parent Category</Form.Label>
                <Form.Select
                  name="parent"
                  value={navbarItem.parent || ""}
                  onChange={handleChange}
                >
                  <option value="">None (Top Level Category)</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Active"
                  name="isActive"
                  checked={navbarItem.isActive}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={loading} className="w-100">
                {loading ? <Spinner animation="border" size="sm" /> : "Save Navbar Item"}
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
