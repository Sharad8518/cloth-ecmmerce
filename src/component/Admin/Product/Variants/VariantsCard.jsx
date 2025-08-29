import { useState } from "react";
import { Modal, Button, Form, Card, Table } from "react-bootstrap";
import { IoAddCircleOutline } from "react-icons/io5";

function VariantsCard({ product, setProduct, addVariant, updateVariant, removeVariant }) {
  // ✅ Sizes state
  const [sizes, setSizes] = useState(["XS", "S", "M", "L", "XL", "XXL"]);
  const [showModal, setShowModal] = useState(false);
  const [newSize, setNewSize] = useState("");

  // Add custom size handler
  const handleAddCustomSize = () => {
    if (!newSize.trim()) return;

    // ✅ Append new size to sizes list
    setSizes(prev => [...prev, newSize.trim()]);

    // Also create a new variant entry
    const newVariant = {
      size: newSize.trim(),
      status: "Active",
      stock: 0,
      lowStockAlertQty: 0,
    };

    setProduct(prev => ({
      ...prev,
      variants: [...prev.variants, newVariant],
    }));

    setNewSize("");
    setShowModal(false);
  };

  return (
    <Card className="mt-3" style={{ padding: "20px" }}>
      <div className="mt-4">
        <h6>Variants</h6>

        <Table striped bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Size</th>
              <th>Status</th>
              <th>Qty</th>
              <th>Low Stock Alert</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {product.variants.map((variant, vIndex) => {
              const selectedSizes = product.variants.map((v) => v.size);

              return (
                <tr key={vIndex}>
                  {/* Size */}
                  <td>
                    <Form.Select
                      size="sm"
                      style={{ fontSize: 14 }}
                      value={variant.size || ""}
                      onChange={(e) =>
                        updateVariant(vIndex, "size", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      {sizes.map((size) => (
                        <option
                          key={size}
                          value={size}
                          disabled={
                            selectedSizes.includes(size) &&
                            variant.size !== size
                          }
                        >
                          {size}
                        </option>
                      ))}
                    </Form.Select>
                  </td>

                  {/* Status */}
                  <td>
                    <Form.Select
                      size="sm"
                      style={{ fontSize: 14 }}
                      value={variant.status || "Active"}
                      onChange={(e) =>
                        updateVariant(vIndex, "status", e.target.value)
                      }
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </Form.Select>
                  </td>

                  {/* Qty */}
                  <td>
                    <Form.Control
                      type="number"
                      size="sm"
                      style={{ fontSize: 14 }}
                      value={variant.stock}
                      onChange={(e) =>
                        updateVariant(
                          vIndex,
                          "stock",
                          Number(e.target.value)
                        )
                      }
                    />
                  </td>

                  {/* Low Stock */}
                  <td>
                    <Form.Control
                      type="number"
                      size="sm"
                      style={{ fontSize: 14 }}
                      value={variant.lowStockAlertQty}
                      onChange={(e) =>
                        updateVariant(
                          vIndex,
                          "lowStockAlertQty",
                          Number(e.target.value)
                        )
                      }
                    />
                  </td>

                  {/* Remove */}
                  <td className="text-center">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeVariant(vIndex)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        {/* Buttons row */}
        <div className="d-flex align-items-center gap-2 mt-2">
          {/* Add Variant Button */}
          <Button
            onClick={addVariant}
            variant="primary"
            size="sm"
            style={{
              width: 150,
              borderRadius: 100,
              backgroundColor: "#282e36ff",
              border: "none",
            }}
          >
            <IoAddCircleOutline color="#fff" size={17} style={{ marginTop: -2 }} /> Add Variant
          </Button>

          {/* Add More Sizes Button */}
          <Button
            onClick={() => setShowModal(true)}
            variant="secondary"
            size="sm"
            style={{
              width: 150,
              borderRadius: 100,
              backgroundColor: "#6c757d",
              border: "none",
            }}
          >
            <IoAddCircleOutline color="#fff" size={17} style={{ marginTop: -2 }} /> Add More Sizes
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Custom Size</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Enter Size</Form.Label>
            <Form.Control
              type="text"
              value={newSize}
              onChange={(e) => setNewSize(e.target.value)}
              placeholder="e.g. 3XL, Free Size, Custom Fit"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddCustomSize}>
            Add Size
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

export default VariantsCard;
