import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const SaleModal = ({ product, show, onHide, onSave }) => {
  const [saleData, setSaleData] = useState({
    discountType: product?.discountType || "percent",
    discountValue: product?.discountValue || 0,
    saleStart: product?.saleStart ? new Date(product.saleStart).toISOString().slice(0, 16) : "",
    saleEnd: product?.saleEnd ? new Date(product.saleEnd).toISOString().slice(0, 16) : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSaleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(saleData);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Sale on Product: {product?.title || "-"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Discount Type</Form.Label>
            <Form.Select name="discountType" value={saleData.discountType} onChange={handleChange}>
              <option value="percent">Percent (%)</option>
              <option value="flat">Flat (₹)</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Discount Value</Form.Label>
            <Form.Control
              type="number"
              name="discountValue"
              value={saleData.discountValue}
              onChange={handleChange}
              min={0}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sale Start</Form.Label>
            <Form.Control
              type="datetime-local"
              name="saleStart"
              value={saleData.saleStart}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sale End</Form.Label>
            <Form.Control
              type="datetime-local"
              name="saleEnd"
              value={saleData.saleEnd}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save Sale</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SaleModal;
