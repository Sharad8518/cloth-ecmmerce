import { useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";

export default function GstApplicationForm({ product, handleChange }) {
  const [rows, setRows] = useState([
    { gst: product.gst || "", applicationFromDate: product.applicationFromDate || "" },
  ]);

  // Add new row
  const addRow = () => {
    setRows([...rows, { gst: "", applicationFromDate: "" }]);
  };

  // Handle row change
  const handleRowChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
    handleChange("gstRows", newRows); // send back to parent if needed
  };

  return (
    <>
      {rows.map((row, index) => (
        <Row className="mb-3" key={index}>
          <Col md={6}>
            <Form.Group>
              <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                GST (%) {rows.length > 1 && <span>#{index + 1}</span>}
              </Form.Label>
              <Form.Control
                type="number"
                style={{ fontSize: 14 }}
                value={row.gst}
                onChange={(e) => handleRowChange(index, "gst", e.target.value)}
                min="0"
                max="100"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                Application From Date
              </Form.Label>
              <Form.Control
                type="date"
                style={{ fontSize: 14 }}
                value={row.applicationFromDate}
                onChange={(e) =>
                  handleRowChange(index, "applicationFromDate", e.target.value)
                }
              />
            </Form.Group>
          </Col>
        </Row>
      ))}

      {/* Add More Button */}
      <Button
        variant="outline-primary"
        onClick={addRow}
        style={{ fontSize: 14 }}
      >
        + Add More
      </Button>
    </>
  );
}
