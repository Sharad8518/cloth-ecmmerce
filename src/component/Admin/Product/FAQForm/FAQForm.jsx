import React, { useState,useEffect } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { IoAddCircleOutline } from "react-icons/io5";

export default function FAQForm({ product, setProduct }) {

  const [faqs, setFaqs] = useState(product.faq || []);

  // Sync local faqs whenever product.faq changes
  useEffect(() => {
    setFaqs(product.faq || []);
  }, [product.faq]);

  const handleFAQChange = (index, field, value) => {
    const newFaqs = [...faqs];
    newFaqs[index][field] = value;
    setFaqs(newFaqs);
    setProduct((prev) => ({ ...prev, faq: newFaqs }));
  };

  const addFAQ = () => {
    const newFaqs = [...faqs, { question: "", answer: "" }];
    setFaqs(newFaqs);
    setProduct((prev) => ({ ...prev, faq: newFaqs }));
  };

  const removeFAQ = (index) => {
    const newFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(newFaqs);
    setProduct((prev) => ({ ...prev, faq: newFaqs }));
  };


  return (
    <Card className="mt-4 shadow-sm border-0">
      <Card.Header className="bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0"style={{fontSize:15}}>FAQs</h5>
        <Button  size="sm" onClick={addFAQ} style={{ width: 150, borderRadius: 100, backgroundColor: "#282e36ff", border: "none" }}>
          <IoAddCircleOutline size={15} style={{marginTop:-2}}/> Add FAQ
        </Button>
      </Card.Header>

      <Card.Body>
        {faqs.length === 0 && (
          <p className="text-muted text-center" style={{fontSize: 14}}>
            No FAQs added yet. Click <b>Add FAQ</b> to get started.
          </p>
        )}

        {faqs.map((faq, index) => (
          <Card key={index} className="mb-3 border-0 shadow-sm">
            <Card.Body>
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label className="fw-semibold">Question</Form.Label>
                    <Form.Control
                      type="text"
                      value={faq.question}
                      onChange={(e) =>
                        handleFAQChange(index, "question", e.target.value)
                      }
                      placeholder="e.g. What is the return policy?"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Answer</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={faq.answer}
                  onChange={(e) =>
                    handleFAQChange(index, "answer", e.target.value)
                  }
                  placeholder="e.g. You can return within 30 days..."
                />
              </Form.Group>

              <div className="d-flex justify-content-end">
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => removeFAQ(index)}
                >
                  ❌ Remove
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Card.Body>
    </Card>
  );
}
