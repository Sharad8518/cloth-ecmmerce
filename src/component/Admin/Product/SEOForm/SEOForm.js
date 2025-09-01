import React, { useState } from "react";
import { Card, Form, Button, Badge } from "react-bootstrap";

export default function SEOForm({ seoData, setSeoData }) {
  const [keywordInput, setKeywordInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeoData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        [name]: value,
      },
    }));
  };

  const addKeyword = () => {
    if (
      keywordInput.trim() &&
      !seoData.seo.keywords.some(
        (kw) => kw.toLowerCase() === keywordInput.trim().toLowerCase()
      )
    ) {
      setSeoData((prev) => ({
        ...prev,
        seo: {
          ...prev.seo,
          keywords: [...prev.seo.keywords, keywordInput.trim()],
        },
      }));
      setKeywordInput("");
    }
  };

  const removeKeyword = (index) => {
    setSeoData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: prev.seo.keywords.filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <Card className="mt-4">
      <Card.Header>SEO Listing</Card.Header>
      <Card.Body>
        {/* Title */}
        <Form.Group className="mb-3">
          <Form.Label style={{fontWeight:500,fontSize:14}}>SEO Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            style={{ fontSize: 14 } }
            value={seoData.seo.title}
            onChange={handleChange}
            // placeholder="Enter SEO title (max 60 chars)"
            maxLength={60}
          />
          <small className="text-muted">{seoData.seo.title?.length || 0}/60</small>
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label style={{fontWeight:500,fontSize:14}}>SEO Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            style={{ fontSize: 14 } }
            value={seoData.seo.description}
            onChange={handleChange}
            // placeholder="Enter SEO description (max 160 chars)"
            maxLength={160}
          />
          <small className="text-muted">{seoData.seo.description?.length || 0}/160</small>
        </Form.Group>

        {/* Slug */}
        <Form.Group className="mb-3">
          <Form.Label style={{fontWeight:500,fontSize:14}}>Slug (URL)</Form.Label>
          <Form.Control
            type="text"
            name="slug"
            style={{ fontSize: 14 } }
            value={seoData.seo.slug}
            onChange={(e) => {
              const formattedSlug = e.target.value
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "");
              setSeoData((prev) => ({
                ...prev,
                seo: {
                  ...prev.seo,
                  slug: formattedSlug,
                },
              }));
            }}
            // placeholder="e.g. my-product-name"
          />
          <small className="text-muted">Only lowercase letters, numbers & hyphens allowed</small>
        </Form.Group>

        {/* Keywords */}
        <Form.Group className="mb-3">
          <Form.Label style={{fontWeight:500,fontSize:14}}>Keywords</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              value={keywordInput}
              style={{ fontSize: 14 } }
              onChange={(e) => setKeywordInput(e.target.value)}
              placeholder="Enter keyword"
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
            />
            <Button variant="secondary" onClick={addKeyword} className="ms-2">
              Add
            </Button>
          </div>
          <div className="mt-2">
            {seoData.seo.keywords.map((kw, index) => (
              <Badge
                bg="info"
                key={index}
                className="me-2"
                style={{ cursor: "pointer" }}
                onClick={() => removeKeyword(index)}
              >
                {kw} ×
              </Badge>
            ))}
          </div>
        </Form.Group>
      </Card.Body>
    </Card>
  );
}
