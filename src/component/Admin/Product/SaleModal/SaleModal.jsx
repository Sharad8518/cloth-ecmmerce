// src/components/Navbar/SaleModal/SaleModal.js
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { onSaleProduct } from "../../../api/admin/productApi";

const SaleModal = ({ product, show, onHide, onSave }) => {
  const [form, setForm] = useState({
    saleOn: false,
    salePrice: "",
    discountType: "percent",
    discountValue: "",
    saleStart: "",
    saleEnd: "",
  });
 const [loading, setLoading] = useState(false);
  // When product changes, preload its sale data
  useEffect(() => {
    if (product) {
      setForm({
        saleOn: product.saleOn || false,
        salePrice: product.salePrice || "",
        discountType: product.discountType || "percent",
        discountValue: product.discountValue || "",
        saleStart: product.saleStart
          ? new Date(product.saleStart).toISOString().slice(0, 10)
          : "",
        saleEnd: product.saleEnd
          ? new Date(product.saleEnd).toISOString().slice(0, 10)
          : "",
      });
    }
  }, [product]);

  const handleSave = async () => {
    if (!product?._id) return;
    try {
      setLoading(true);
      const updated = await onSaleProduct(product._id, form);
      if (onSave) onSave(updated); // update parent state
      onHide();
    } catch (error) {
      console.error("Update Sale Error:", error);
      alert("Failed to update sale status!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {form.saleOn ? "Edit Sale" : "Put Product on Sale"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Check
            type="switch"
            id="saleOn"
            label="Enable Sale"
            checked={form.saleOn}
            onChange={(e) => setForm({ ...form, saleOn: e.target.checked })}
          />

          {form.saleOn && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Sale Price</Form.Label>
                <Form.Control
                  type="number"
                  value={form.salePrice}
                  onChange={(e) =>
                    setForm({ ...form, salePrice: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Discount Type</Form.Label>
                <Form.Select
                  value={form.discountType}
                  onChange={(e) =>
                    setForm({ ...form, discountType: e.target.value })
                  }
                >
                  <option value="percent">Percent</option>
                  <option value="flat">Flat</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Discount Value</Form.Label>
                <Form.Control
                  type="number"
                  value={form.discountValue}
                  onChange={(e) =>
                    setForm({ ...form, discountValue: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Sale Start</Form.Label>
                <Form.Control
                  type="date"
                  value={form.saleStart}
                  onChange={(e) =>
                    setForm({ ...form, saleStart: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Sale End</Form.Label>
                <Form.Control
                  type="date"
                  value={form.saleEnd}
                  onChange={(e) =>
                    setForm({ ...form, saleEnd: e.target.value })
                  }
                />
              </Form.Group>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SaleModal;
