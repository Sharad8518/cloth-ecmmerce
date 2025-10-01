import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Table,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { addCoupon, getCoupon } from "../../api/admin/couponApi";

export default function Coupon() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    discountType: "percentage",
    discountValue: "",
    maxDiscountAmount: "",
    minPurchaseAmount: "",
    expirationDate: "",
    usageLimit: "",
  });

  // Fetch all coupons
  const fetchCoupons = async () => {
    try {
      const res = await getCoupon();
      setCoupons(res);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit new coupon
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await addCoupon(formData);
      setFormData({
        discountType: "percentage",
        discountValue: "",
        maxDiscountAmount: "",
        minPurchaseAmount: "",
        expirationDate: "",
        usageLimit: "",
      });
      fetchCoupons();
    } catch (err) {
      console.error(err.response?.data || err);
    } finally {
      setCoupons(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const toggleCoupon = async (id, status) => {
    try {
      // await axios.patch(`http://localhost:3000/coupons/${id}`, { isActive: status });
      fetchCoupons(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Coupon
  const deleteCoupon = async (id) => {
    if (!window.confirm("Are you sure you want to delete this coupon?")) return;
    try {
      // await axios.delete(`http://localhost:3000/coupons/${id}`);
      fetchCoupons();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="py-5">
      <h1 className="mb-4 text-center">Coupon Management</h1>

      {/* Coupon Form */}
      <Card className="p-4 mb-5 shadow-sm">
        <h4 className="mb-3">Add New Coupon</h4>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Discount Type</Form.Label>
                <Form.Select
                  name="discountType"
                  value={formData.discountType}
                  onChange={handleChange}
                >
                  <option value="percentage">Percentage</option>
                  <option value="flat">Flat</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Discount Value</Form.Label>
                <Form.Control
                  type="number"
                  name="discountValue"
                  value={formData.discountValue}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Max Discount Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="maxDiscountAmount"
                  value={formData.maxDiscountAmount}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Min Purchase Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="minPurchaseAmount"
                  value={formData.minPurchaseAmount}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Expiration Date</Form.Label>
                <Form.Control
                  type="date"
                  name="expirationDate"
                  value={formData.expirationDate}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Usage Limit</Form.Label>
                <Form.Control
                  type="number"
                  name="usageLimit"
                  value={formData.usageLimit}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Adding..." : "Add Coupon"}
          </Button>
        </Form>
      </Card>

      {/* Coupon Table */}
      <Card className="p-4 shadow-sm">
        <h4 className="mb-3">All Coupons</h4>
        <Table bordered hover>
          <thead className="table-light">
            <tr>
              <th>Code</th>
              <th>Type</th>
              <th>Value</th>
              <th>Max Discount</th>
              <th>Min Purchase</th>
              <th>Expiry</th>
              <th>Usage</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c._id}>
                <td className="fw-bold">{c.code}</td>
                <td>{c.discountType}</td>
                <td>{c.discountValue}</td>
                <td>{c.maxDiscountAmount || "-"}</td>
                <td>{c.minPurchaseAmount}</td>
                <td>{new Date(c.expirationDate).toLocaleDateString()}</td>
                <td>
                  {c.usedCount}/{c.usageLimit}
                </td>
                <td>
                  {c.isActive ? (
                    <span className="badge bg-success">Active</span>
                  ) : (
                    <span className="badge bg-secondary">Inactive</span>
                  )}
                </td>
                <td>
                  <Button
                    size="sm"
                    variant={c.isActive ? "warning" : "success"}
                    className="me-2"
                    onClick={() => toggleCoupon(c._id, !c.isActive)}
                  >
                    {c.isActive ? "Deactivate" : "Activate"}
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteCoupon(c._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}
