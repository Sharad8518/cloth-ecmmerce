import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Badge,
} from "react-bootstrap";
import {
  getHeaders,
  getCategories,
  getSubCategories,
  getCollections,
} from "../../api/admin/hierarchyManagerApi";

import { addProduct } from "../../api/admin/productApi";
import { getPolicies } from "../../api/admin/policyApi";

import SEOForm from "./SEOForm/SEOForm";
import ColourDropdown from "./ColourDropdown/ColourDropdown";
import FAQForm from "./FAQForm/FAQForm";
import { IoAddCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import VariantsCard from "./Variants/VariantsCard";
import GstApplicationForm from "./GstApplicationForm";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const [headers, setHeaders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [collections, setCollections] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [selectedHeader, setSelectedHeader] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [specialityInput, setSpecialityInput] = useState("");
  const [product, setProduct] = useState({
    title: "",
    itemNumber: "",
    mrp: "",
    costPrice: "",
    marginPercent: "",
    salePrice: "",
    colour: "",
    fulfillmentType: "",
    keywords: [],
    media: [],

    // ✅ These were missing
    variants: [], // product variants (size/stock info)
    categories: [], // selected categories
    subCategories: [], // selected subcategories
    collections: [], // selected collections

    shortDescription: "",
    productType: "",
    estimatedShippingDays: "",
    shippingAndReturns: {
      title: "",
      description: "",
    },
    productSpeciality: "",
    faq: [],
    styleNo: "",
    styleAndFit: "",
    fabric: "",
    work: "",
    packContains: "",
    occasion: "",
    care: "",
    note: "",
    productionDetail: {
      enabled: false,
      description: "",
    },

    dupatta: {
      enabled: false,
      description: "",
    },

    paddingRequired: "No", // default No
    waist: "",
    length: "",
    height: "",

    // ✅ SEO
    seo: {
      title: "",
      description: "",
      slug: "",
      keywords: [],
    },
  });
  // Pure updater function
  const updateNestedField = (obj, path, value) => {
    const keys = path.split(".");
    const updated = { ...obj };
    let current = updated;

    keys.forEach((key, i) => {
      if (i === keys.length - 1) {
        current[key] = value;
      } else {
        current[key] = { ...current[key] };
        current = current[key];
      }
    });

    return updated;
  };

  // Handler uses setProduct
  const handleChange = (path, value) => {
    setProduct((prev) => updateNestedField(prev, path, value));
  };

  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const [variants, setVariants] = useState([]);

  const maxSize = 5 * 1024 * 1024; // 5MB

  // Load hierarchy
  useEffect(() => {
    fetchHeaders();
    loadCollections()
  }, []);
  const fetchHeaders = async () => {
    const res = await getHeaders();
    setHeaders(res);
  };
  const loadCategories = async (headerId) => {
    setSelectedHeader(headerId);
    const res = await getCategories();

    // Use optional chaining to avoid null errors
    const filtered = (res || []).filter((c) => c?.header?._id === headerId);

    setCategories(filtered);
    setSubCategories([]);
    setCollections([]);
  };
  const navigate = useNavigate();

  const loadSubCategories = async (categoryId) => {
    setSelectedCategory(categoryId);
    const res = await getSubCategories();

    const filtered = (res || []).filter((s) => s?.category?._id === categoryId);

    setSubCategories(filtered);
    setCollections([]);
  };

  const loadCollections = async () => {
    const res = await getCollections();
    setCollections(res);
  };
  // ✅ Validate file
  const validateFile = (file) => {
    // Case 1: User just uploaded (File object)
    if (file instanceof File) {
      if (
        !file.type?.startsWith("image/") &&
        !file.type?.startsWith("video/")
      ) {
        return "Only images and videos are allowed.";
      }
      if (file.size > maxSize) {
        return `${file.name} exceeds 5 MB.`;
      }
    }

    // Case 2: Already saved in DB (object with kind + url)
    else if (file.url && file.kind) {
      if (!["image", "video"].includes(file.kind)) {
        return "Only images and videos are allowed.";
      }
    } else {
      return "Invalid file format.";
    }

    return null;
  };

  // ✅ Handle files
  const handleFiles = (selectedFiles) => {
    const newMedia = [];

    for (let file of selectedFiles) {
      const err = validateFile(file);
      if (err) {
        setError(err);
        return;
      }

      newMedia.push({
        file, // keep original for upload later
        url: URL.createObjectURL(file), // preview
        alt: file.name,
        kind: file.type.startsWith("video") ? "video" : "image",
        bytes: file.size,
      });
    }

    setError("");
    setProduct((prev) => ({
      ...prev,
      media: [...prev.media, ...newMedia],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPolicies();
        setPolicies(data.data); // [{_id, title, decreption}]
      } catch (err) {
        console.error("Failed to load policies:", err.message);
      }
    };
    fetchData();
  }, []);

  // ✅ File input
  const handleChangeImage = (e) => handleFiles(e.target.files);

  // ✅ Drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => e.preventDefault();

  // ✅ Remove file
  const removeFile = (index) => {
    setProduct((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index),
    }));
  };

  const addVariant = () => {
    setProduct((prev) => ({
      ...prev,
      variants: [
        ...(prev.variants || []),
        {
          size: "", // single string
          status: "Active",
          stock: 0,
          lowStockAlertQty: 5,
        },
      ],
    }));
  };
  // Update Variant field (sku, stock, etc.)
  const updateVariant = (index, field, value) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.map((v, i) =>
        i === index ? { ...v, [field]: value } : v
      ),
    }));
  };

  // Update Attribute inside a Variant
  const updateVariantSize = (index, sizeValue) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.map((v, i) =>
        i === index ? { ...v, size: sizeValue } : v
      ),
    }));
  };

  // Remove Variant
  const removeVariant = (index) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  useEffect(() => {
    const cost = parseFloat(product.costPrice);
    const margin = parseFloat(product.marginPercent);

    if (!isNaN(cost) && !isNaN(margin)) {
      const marginValue = (cost * margin) / 100;
      const calculatedSalePrice = (cost + marginValue).toFixed(2);

      setProduct((prev) => ({
        ...prev,
        salePrice: calculatedSalePrice,
      }));
    }
  }, [product.costPrice, product.marginPercent]);

  // Add speciality
  const addSpeciality = () => {
    if (specialityInput.trim()) {
      setProduct((prev) => ({
        ...prev,
        productSpeciality: [
          ...(prev.productSpeciality || []),
          specialityInput.trim(),
        ],
      }));
      setSpecialityInput("");
    }
  };

  // Remove speciality
  const removeSpeciality = (index) => {
    setProduct((prev) => ({
      ...prev,
      productSpeciality: prev.productSpeciality.filter((_, i) => i !== index),
    }));
  };
  const addMoreSizes = () => {
    // Example: push multiple sizes at once
    const extraSizes = ["3XL", "4XL", "5XL"];
    const newVariants = extraSizes.map((size) => ({
      size,
      status: "Active",
      stock: 0,
      lowStockAlertQty: 0,
    }));

    setProduct((prev) => ({
      ...prev,
      variants: [...prev.variants, ...newVariants],
    }));
  };
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading
    console.log("product", product);
    try {
      const result = await addProduct(product);
      console.log("✅ Product created:", result);
      Swal.fire({
        icon: "success",
        title: "Product Created",
        text: `Product "${product.title}" has been created successfully!`,
        timer: 2000,
        showConfirmButton: false,
      });

      setProduct({
        title: "",
        itemNumber: "",
        mrp: "",
        costPrice: "",
        marginPercent: "",
        salePrice: "",
        colour: "",
        fulfillmentType: "",
        productType: "",
        keywords: [],
        media: [],

        // ✅ These were missing
        variants: [], // product variants (size/stock info)
        categories: [], // selected categories
        subCategories: [], // selected subcategories
        collections: [], // selected collections
        occasion: "",
        estimatedShippingDays: "",
        shippingAndReturns: {
          title: "",
          description: "",
        },
        productSpeciality: "",
        faq: [],
        styleNo: "",
        fabric: "",
        work: "",
        packContains: "",
        care: "",
        note: "",

        // ✅ SEO
        seo: {
          title: "",
          description: "",
          slug: "",
          keywords: [],
        },
      });

      // optionally reset form here
    } catch (error) {
      console.error("❌ Failed to create product", error);
      Swal.fire({
        icon: "error",
        title: "Failed to create product",
        text: error.response?.data?.message || error.message,
      });
    } finally {
      setLoading(false); // stop loading
    }
  };

  console.log("product", product);

  return (
    <Container className="my-4">
      <h2 style={{ fontWeight: "700", fontSize: 20 }}>Add New Product</h2>
      <p className="text-muted" style={{ fontSize: 13 }}>
        Fill in the details below to add a new product.
      </p>

      <Form onSubmit={handleSubmit}>
        <Row className="g-4">
          {/* Product Classification */}
          <Col md={6}>
            <Card>
              <Card.Header>Product Classification</Card.Header>
              <Card.Body>
                {/* Header */}
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: "600", fontSize: 15 }}>
                    Header <span style={{ color: "red" }}>*</span>
                  </Form.Label>

                  <Form.Select
                    value={product.header || ""}
                    onChange={async (e) => {
                      const headerTitle = e.target.value;

                      // Store only the title
                      setProduct((p) => ({
                        ...p,
                        header: headerTitle || "",
                      }));

                      // Load categories using _id of selected header
                      const selectedHeader = headers.find(
                        (h) => h.title === headerTitle
                      );
                      if (selectedHeader) {
                        await loadCategories(selectedHeader?._id);
                      }
                    }}
                  >
                    <option value="">Select Header</option>
                    {headers?.map((h) => (
                      <option key={h._id} value={h.title}>
                        {h.title}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: "600", fontSize: 15 }}>
                    Categories <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <div
                    style={{
                      maxHeight: "150px",
                      overflowY: "auto",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      padding: "8px",
                    }}
                  >
                    {categories?.map((c) =>
                      c ? (
                        <Form.Check
                          key={c._id}
                          type="checkbox"
                          label={c.name}
                          style={{ fontSize: 14 }}
                          checked={
                            product.categories?.includes(c.name) || false
                          }
                          onChange={async (e) => {
                            let newCategories;
                            if (e.target.checked) {
                              newCategories = [
                                ...(product.categories || []),
                                c.name,
                              ];
                              setProduct((p) => ({
                                ...p,
                                categories: newCategories,
                              }));
                              if (c._id) {
                                console.log("c._id", c._id);
                                await loadSubCategories(c._id);
                              }
                            } else {
                              newCategories = (product.categories || []).filter(
                                (name) => name !== c.name
                              );
                              setProduct((p) => ({
                                ...p,
                                categories: newCategories,
                              }));
                            }
                          }}
                        />
                      ) : null
                    )}
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    {product.categories?.map((cat) => (
                      <span
                        key={cat}
                        style={{
                          display: "inline-block",
                          backgroundColor: "#f0f0f0",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          marginRight: "6px",
                          marginBottom: "6px",
                          fontSize: "14px",
                        }}
                      >
                        {cat}{" "}
                        <span
                          style={{
                            marginLeft: "6px",
                            cursor: "pointer",
                            color: "#ff4d4f",
                            fontWeight: "bold",
                          }}
                          onClick={() =>
                            setProduct((p) => ({
                              ...p,
                              categories: p.categories.filter(
                                (name) => name !== cat
                              ),
                            }))
                          }
                        >
                          ✕
                        </span>
                      </span>
                    ))}
                  </div>
                </Form.Group>

                {/* SubCategories */}
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: "600", fontSize: 15 }}>
                    Sub Categories <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <div
                    style={{
                      maxHeight: "150px",
                      overflowY: "auto",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      padding: "8px",
                    }}
                  >
                    {subCategories.filter(Boolean).map((sc) => (
                      <Form.Check
                        key={sc._id}
                        type="checkbox"
                        label={sc.name}
                        style={{ fontSize: 14 }}
                        checked={
                          product.subCategories?.includes(sc.name) || false
                        }
                        onChange={async (e) => {
                          let newSubCategories;
                          if (e.target.checked) {
                            newSubCategories = [
                              ...(product.subCategories || []),
                              sc.name,
                            ];

                            // Generate item number
                            const randomNum = Math.floor(
                              1000 + Math.random() * 9000
                            );
                            const itemNumber = `${sc.name
                              .replace(/\s+/g, "")
                              .toUpperCase()}-${randomNum}`;

                            setProduct((p) => ({
                              ...p,
                              subCategories: newSubCategories,
                              itemNumber,
                            }));

                            if (sc?._id) {
                              await loadCollections(sc._id);
                            }
                          } else {
                            newSubCategories = (
                              product.subCategories || []
                            ).filter((name) => name !== sc.name);
                            setProduct((p) => ({
                              ...p,
                              subCategories: newSubCategories,
                            }));
                          }
                        }}
                      />
                    ))}
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    {product.subCategories?.map((sub) => (
                      <span
                        key={sub}
                        style={{
                          display: "inline-block",
                          backgroundColor: "#f0f0f0",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          marginRight: "6px",
                          marginBottom: "6px",
                          fontSize: "14px",
                        }}
                      >
                        {sub}{" "}
                        <span
                          style={{
                            marginLeft: "6px",
                            cursor: "pointer",
                            color: "#ff4d4f",
                            fontWeight: "bold",
                          }}
                          onClick={() =>
                            setProduct((p) => ({
                              ...p,
                              subCategories: p.subCategories.filter(
                                (name) => name !== sub
                              ),
                            }))
                          }
                        >
                          ✕
                        </span>
                      </span>
                    ))}
                  </div>
                </Form.Group>

                {/* Collections */}
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: "600", fontSize: 15 }}>
                    Collections
                  </Form.Label>
                  <div
                    style={{
                      maxHeight: "150px",
                      overflowY: "auto",
                      border: "1px solid #ddd",
                      borderRadius: "6px",
                      padding: "8px",
                    }}
                  >
                    {collections?.map((col) => (
                      <Form.Check
                        key={col._id}
                        type="checkbox"
                        label={col.name}
                        style={{ fontSize: 14 }}
                        checked={
                          product.collections?.includes(col.name) || false
                        }
                        onChange={(e) => {
                          const newCollections = e.target.checked
                            ? [...(product.collections || []), col.name]
                            : (product.collections || []).filter(
                                (name) => name !== col.name
                              );

                          setProduct((p) => ({
                            ...p,
                            collections: newCollections,
                          }));
                        }}
                      />
                    ))}
                  </div>

                  <div style={{ marginTop: "8px" }}>
                    {product.collections?.map((col) => (
                      <span
                        key={col}
                        style={{
                          display: "inline-block",
                          backgroundColor: "#f0f0f0",
                          padding: "4px 8px",
                          borderRadius: "12px",
                          marginRight: "6px",
                          marginBottom: "6px",
                          fontSize: "14px",
                        }}
                      >
                        {col}{" "}
                        <span
                          style={{
                            marginLeft: "6px",
                            cursor: "pointer",
                            color: "#ff4d4f",
                            fontWeight: "bold",
                          }}
                          onClick={() =>
                            setProduct((p) => ({
                              ...p,
                              collections: p.collections.filter(
                                (name) => name !== col
                              ),
                            }))
                          }
                        >
                          ✕
                        </span>
                      </span>
                    ))}
                  </div>
                </Form.Group>
              </Card.Body>
            </Card>
            {/* Product Details */}
            <Card className="mt-3">
              <Card.Header>Product Heading</Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: "600", fontSize: 15 }}>
                    Title <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={product?.title || ""}
                    style={{ fontSize: 14 }}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: "600", fontSize: 15 }}>
                    Description <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    style={{ fontSize: 14 }}
                    value={product?.description || ""}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    required
                  />
                </Form.Group>

                {/* Media Upload */}
                <div>
                  <Form.Label style={{ fontWeight: "600", fontSize: 15 }}>
                    Media <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    style={{
                      border: `2px dashed ${error ? "red" : "#ced4da"}`,
                      padding: "10px",
                      borderRadius: "5px",
                      minHeight: "100px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      cursor: "pointer",
                      marginBottom: "10px",
                    }}
                    onClick={() => document.getElementById("fileInput").click()}
                  >
                    <input
                      type="file"
                      accept="image/*,video/*"
                      multiple
                      onChange={handleChangeImage}
                      style={{ display: "none" }}
                      id="fileInput"
                    />
                    <p style={{ fontSize: "12px", margin: "5px" }}>
                      Drag & Drop or Click to Upload
                    </p>
                    <button
                      style={{
                        border: "none",
                        fontSize: "12px",
                        padding: "5px 10px",
                        height: "30px",
                        marginTop: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Upload Now
                    </button>
                    {error && (
                      <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
                    )}
                  </div>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
                  >
                    {product.media?.map((file, index) => {
                      // Case 1: freshly uploaded (File object)
                      if (file instanceof File) {
                        const isImage = file.type?.startsWith("image/");
                        return (
                          <div
                            key={index}
                            style={{
                              border: "1px solid #ddd",
                              borderRadius: "5px",
                              padding: "5px",
                              width: "120px",
                              textAlign: "center",
                              position: "relative",
                            }}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile(index);
                              }}
                              style={{
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                                border: "none",
                                background: "red",
                                color: "white",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                              }}
                            >
                              ×
                            </button>
                            {isImage ? (
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                style={{
                                  width: "100%",
                                  height: "80px",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <video
                                src={URL.createObjectURL(file)}
                                style={{
                                  width: "100%",
                                  height: "80px",
                                  objectFit: "cover",
                                }}
                                controls
                              />
                            )}
                            <p style={{ fontSize: "10px", marginTop: "5px" }}>
                              {file.name}
                            </p>
                          </div>
                        );
                      }

                      // Case 2: already saved in DB (with url + kind)
                      if (file.url && file.kind) {
                        const isImage = file.kind === "image";
                        return (
                          <div
                            key={index}
                            style={{
                              border: "1px solid #ddd",
                              borderRadius: "5px",
                              padding: "5px",
                              width: "120px",
                              textAlign: "center",
                              position: "relative",
                            }}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile(index);
                              }}
                              style={{
                                position: "absolute",
                                top: "5px",
                                right: "5px",
                                border: "none",
                                background: "red",
                                color: "white",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                cursor: "pointer",
                              }}
                            >
                              ×
                            </button>
                            {isImage ? (
                              <img
                                src={file.url}
                                alt={file.alt || ""}
                                style={{
                                  width: "100%",
                                  height: "80px",
                                  objectFit: "cover",
                                }}
                              />
                            ) : (
                              <video
                                src={file.url}
                                style={{
                                  width: "100%",
                                  height: "80px",
                                  objectFit: "cover",
                                }}
                                controls
                              />
                            )}
                            <p style={{ fontSize: "10px", marginTop: "5px" }}>
                              {file.name || "media"}
                            </p>
                          </div>
                        );
                      }

                      // fallback
                      return null;
                    })}
                  </div>
                </div>

                {/* Variant Cards */}
              </Card.Body>
            </Card>

            <Card className="mt-3" style={{ padding: "20px" }}>
              <VariantsCard
                product={product}
                setProduct={setProduct}
                addVariant={addVariant}
                updateVariant={updateVariant}
                removeVariant={removeVariant}
              />
            </Card>

            <Card className="mt-3">
              <Card.Header>Additional Info For Better Fit</Card.Header>
              <Card.Body>
                {/* Padding Required */}
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                    Additional Measurement Required?
                  </Form.Label>
                  <Form.Check
                    type="switch"
                    id="paddingRequired-switch"
                    label={product.paddingRequired === "Yes" ? "Yes" : "No"}
                    checked={product.paddingRequired === "Yes"}
                    onChange={(e) =>
                      handleChange(
                        "paddingRequired",
                        e.target.checked ? "Yes" : "No"
                      )
                    }
                  />
                  <Form.Text className="text-muted">
                    Note: Toggle Yes / No. (Can also be ignored by user)
                  </Form.Text>
                </Form.Group>

                {/* Show only if Padding Required = Yes */}
                {product.paddingRequired === "Yes" && (
                  <>
                    {/* Waist */}
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                        Waist
                      </Form.Label>
                      <Form.Select
                        style={{ fontSize: 14 }}
                        value={product.waist || ""}
                        onChange={(e) => handleChange("waist", e.target.value)}
                      >
                        <option value="">Select Waist</option>
                        <option value="25 Inch">25 Inch</option>
                        <option value="26 Inch">26 Inch</option>
                        <option value="27 Inch">27 Inch</option>
                        <option value="28 Inch">28 Inch</option>
                      </Form.Select>
                      <Form.Text className="text-muted">
                        Note: Select from list
                      </Form.Text>
                    </Form.Group>

                    {/* Length */}
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                        Length (Waist to Floor including heel)
                      </Form.Label>
                      <Form.Select
                        style={{ fontSize: 14 }}
                        value={product.length || ""}
                        onChange={(e) => handleChange("length", e.target.value)}
                      >
                        <option value="">Select Length</option>
                        <option value="36 Inch (91 cm)">36 Inch (91 cm)</option>
                        <option value="38 Inch (96 cm)">38 Inch (96 cm)</option>
                        <option value="40 Inch (102 cm)">
                          40 Inch (102 cm)
                        </option>
                      </Form.Select>
                      <Form.Text className="text-muted">
                        Note: Select from list
                      </Form.Text>
                    </Form.Group>

                    {/* Height */}
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                        Your Height (Including heel)
                      </Form.Label>
                      <Form.Select
                        style={{ fontSize: 14 }}
                        value={product.height || ""}
                        onChange={(e) => handleChange("height", e.target.value)}
                      >
                        <option value="">Select Height</option>
                        <option value="5 feet 2 Inch">5 feet 2 Inch</option>
                        <option value="5 feet 3 Inch">5 feet 3 Inch</option>
                        <option value="5 feet 4 Inch">5 feet 4 Inch</option>
                        <option value="5 feet 5 Inch">5 feet 5 Inch</option>
                      </Form.Select>
                      <Form.Text className="text-muted">
                        Note: Select from list
                      </Form.Text>
                    </Form.Group>
                  </>
                )}
              </Card.Body>
            </Card>

            <Card style={{ marginTop: "20px" }}>
              <Card.Header>Pricing</Card.Header>
              <Card.Body>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                        Cost Price
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="costPrice"
                        style={{ fontSize: 14 }}
                        value={product?.costPrice || ""}
                        onChange={(e) =>
                          handleChange("costPrice", e.target.value)
                        }
                        required
                        // placeholder="Enter cost price"
                        min="0"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                        Margin %
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="marginPercent"
                        style={{ fontSize: 14 }}
                        value={product.marginPercent || ""}
                        onChange={(e) =>
                          handleChange("marginPercent", e.target.value)
                        }
                        // placeholder="Enter margin %"
                        min="0"
                        max="100"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                        MRP <span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="mrp"
                        style={{ fontSize: 14 }}
                        value={product.mrp || ""}
                        onChange={(e) => handleChange("mrp", e.target.value)}
                        // placeholder="Enter MRP"
                        required
                        min="0"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                        Sale Price
                      </Form.Label>
                      <Form.Control
                        type="number"
                        name="salePrice"
                        style={{ fontSize: 14 }}
                        value={product.salePrice || ""}
                        onChange={(e) =>
                          handleChange("salePrice", e.target.value)
                        }
                        // placeholder="Auto-calculated or editable"
                        min="0"
                      />
                      <Form.Text
                        className="text-muted"
                        style={{ fontSize: 12 }}
                      >
                        Auto-calculated from cost + margin, but can be
                        overridden.
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>
                <GstApplicationForm
                  product={product}
                  handleChange={handleChange}
                />
                {/* <Row className="mb-3">
      <Col md={6}>
        <Form.Group>
          <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
            GST (%)
          </Form.Label>
          <Form.Control
            type="number"
            name="gst"
            style={{ fontSize: 14 }}
            value={product.gst || ""}
            onChange={(e) => handleChange("gst", e.target.value)}
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
            name="applicationFromDate"
            style={{ fontSize: 14 }}
            value={product.applicationFromDate || ""}
            onChange={(e) =>
              handleChange("applicationFromDate", e.target.value)
            }
          />
        </Form.Group>
      </Col>
    </Row> */}
              </Card.Body>
            </Card>

            <Card style={{ marginTop: 20 }}>
              <Card.Header>Shipment Information</Card.Header>
              <Card.Body>
                {/* <Form.Group className="mb-3">
                  <Form.Label>Colour</Form.Label>
                  <Form.Control
                    name="colour"
                    value={product.colour}
                    onChange={handleChange}
                  />
                </Form.Group> */}
                {/* <ColourDropdown product={product} setProduct={setProduct} /> */}
                <Form.Group>
                  <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                    Fulfillment Type <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Select
                    name="fulfillmentType"
                    value={product.fulfillmentType}
                    onChange={(e) =>
                      handleChange("fulfillmentType", e.target.value)
                    }
                  >
                    <option value="" disabled>Fulfillment Select</option>
                    <option value="READY_TO_SHIP">Ready to Ship</option>
                    <option value="MADE_TO_ORDER">Made to Order</option>
                  </Form.Select>
                </Form.Group>
                <br />
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                    Estimated Shipping (in days)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="estimatedShippingDays"
                    style={{ fontSize: 14 }}
                    min={1}
                    value={product.estimatedShippingDays || ""}
                    onChange={(e) =>
                      handleChange(
                        "estimatedShippingDays",
                        Number(e.target.value)
                      )
                    }
                    // placeholder="Enter number of days (e.g. 5)"
                  />
                </Form.Group>
              </Card.Body>
            </Card>
            <Card style={{ marginTop: "20px" }}>
              <Card.Header>Product Type</Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                    Product Type <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Select
                    name="productType"
                    required
                    style={{ fontSize: 14 }}
                    value={product.productType}
                    onChange={(e) =>
                      handleChange("productType", e.target.value)
                    }
                  >
                     <option value="" disabled>Product Select</option>
                    <option value="Cloths">Cloths</option>
                    <option value="Jewellery">Jewellery</option>
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>
          </Col>

          {/* Pricing */}
          <Col md={5}>
            <Card style={{ marginTop: "0px" }}>
              <Card.Header>Product Details</Card.Header>
              <Card.Body>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                        Short Description
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        style={{ fontSize: 14 }}
                        value={product.shortDescription || ""}
                        onChange={(e) =>
                          handleChange("shortDescription", e.target.value)
                        }
                        // placeholder="Enter a short summary of the product (e.g. Elegant silk saree with zari work)"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                        Style No.
                      </Form.Label>
                      <Form.Control
                        style={{ fontSize: 14 }}
                        value={product.styleNo || ""}
                        onChange={(e) =>
                          handleChange("styleNo", e.target.value)
                        }
                        // placeholder="Enter style number (e.g. ST1234)"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                        Colour
                      </Form.Label>
                      <Form.Control
                        style={{ fontSize: 14 }}
                        value={product.colour || ""}
                        onChange={(e) => handleChange("colour", e.target.value)}
                        // placeholder="Enter colour (e.g. Red, Blue)"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                        Fabric
                      </Form.Label>
                      <Form.Control
                        style={{ fontSize: 14 }}
                        value={product.fabric || ""}
                        onChange={(e) => handleChange("fabric", e.target.value)}
                        // placeholder="Enter fabric type (e.g. Cotton, Silk)"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                        Work / Craft
                      </Form.Label>
                      <Form.Control
                        style={{ fontSize: 14 }}
                        value={product.work || ""}
                        onChange={(e) => handleChange("work", e.target.value)}
                        // placeholder="Enter work (e.g. Embroidery, Zari)"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                    Pack Contains
                  </Form.Label>
                  <Form.Control
                    style={{ fontSize: 14 }}
                    value={product.packContains || ""}
                    onChange={(e) =>
                      handleChange("packContains", e.target.value)
                    }
                    // placeholder="Enter items (e.g. Kurta, Dupatta, Bottom)"
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                        Occasion
                      </Form.Label>
                      <Form.Control
                        style={{ fontSize: 14 }}
                        value={product.occasion || ""}
                        onChange={(e) =>
                          handleChange("occasion", e.target.value)
                        }
                        // placeholder="Enter occasion (e.g. Casual, Party, Wedding)"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                        Dupatta
                      </Form.Label>

                      <Form.Check
                        type="switch"
                        id="dupatta-switch"
                        label={product.dupatta?.enabled ? "Yes" : "No"}
                        checked={product.dupatta?.enabled || false} // 👈 default false = No
                        onChange={(e) =>
                          handleChange("dupatta", {
                            ...product.dupatta,
                            enabled: e.target.checked,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>

                  <Col md={12}>
                    {product.dupatta?.enabled && (
                      <Form.Control
                        type="text"
                        style={{ fontSize: 14, marginTop: 8 }}
                        value={product.dupatta?.description || ""}
                        onChange={(e) =>
                          handleChange("dupatta", {
                            ...product.dupatta,
                            description: e.target.value,
                          })
                        }
                        // placeholder="Enter dupatta details (e.g. Net, Printed, Plain)"
                      />
                    )}
                  </Col>
                </Row>
                <br />

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                    Care
                  </Form.Label>
                  <Form.Control
                    style={{ fontSize: 14 }}
                    value={product.care || ""}
                    onChange={(e) => handleChange("care", e.target.value)}
                    // placeholder="Enter care instructions (e.g. Dry Clean Only)"
                  />
                </Form.Group>

                {/* Production Detail: Yes/No Toggle + Description */}
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                    Production Detail
                  </Form.Label>
                  <Form.Check
                    type="switch"
                    id="production-detail-switch"
                    label={product.productionDetail?.enabled ? "Yes" : "No"}
                    checked={product.productionDetail?.enabled || false}
                    onChange={(e) =>
                      handleChange("productionDetail", {
                        ...product.productionDetail,
                        enabled: e.target.checked,
                      })
                    }
                  />
                  {product.productionDetail?.enabled && (
                    <Form.Control
                      as="textarea"
                      rows={3}
                      style={{ fontSize: 14, marginTop: 8 }}
                      value={product.productionDetail?.description || ""}
                      onChange={(e) =>
                        handleChange("productionDetail", {
                          ...product.productionDetail,
                          description: e.target.value,
                        })
                      }
                      // placeholder="Enter production description"
                    />
                  )}
                </Form.Group>

                {/* Note */}
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                    Note
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    style={{ fontSize: 14 }}
                    value={product.note || ""}
                    onChange={(e) => handleChange("note", e.target.value)}
                    // placeholder="Enter additional product notes (optional)"
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            <Card style={{ marginTop: "20px" }}>
              <Card.Header>Product Speciality</Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                    Product Speciality
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    style={{ fontSize: 14 }}
                    value={product.productSpeciality || ""}
                    onChange={(e) =>
                      handleChange("productSpeciality", e.target.value)
                    }
                    // placeholder="Enter speciality (e.g. Handcrafted, Limited Edition)"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                    Style & Fit
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    style={{ fontSize: 14 }}
                    value={product.styleAndFit || ""}
                    onChange={(e) =>
                      handleChange("styleAndFit", e.target.value)
                    }
                    // placeholder="Enter style & fit details (e.g. Regular Fit, A-Line Cut)"
                  />
                </Form.Group>
              </Card.Body>
            </Card>

            <Card style={{ marginTop: 20 }}>
              <Card.Header>Return & Exchange Policy</Card.Header>
              <Card.Body>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="outline-primary"
                    onClick={() => navigate("/dashboard/Policy")}
                    style={{ fontSize: 14 }}
                  >
                    Manage Policy
                  </Button>
                </div>
                {/* <Form.Group className="mb-3">
                  <Form.Label>Colour</Form.Label>
                  <Form.Control
                    name="colour"
                    value={product.colour}
                    onChange={handleChange}
                  />
                </Form.Group> */}
                {/* <ColourDropdown product={product} setProduct={setProduct} /> */}

                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                    Returns Policy
                  </Form.Label>
                  <Form.Select
                    style={{ fontSize: 14 }}
                    value={
                      // find the _id of the selected policy
                      policies.find(
                        (p) => p.title === product.shippingAndReturns.title
                      )?._id || ""
                    }
                    onChange={(e) => {
                      const selectedPolicy = policies.find(
                        (p) => p._id === e.target.value
                      );
                      if (selectedPolicy) {
                        setProduct((prev) => ({
                          ...prev,
                          shippingAndReturns: {
                            title: selectedPolicy.title,
                            description: selectedPolicy.description,
                          },
                        }));
                      } else {
                        setProduct((prev) => ({
                          ...prev,
                          shippingAndReturns: { title: "", description: "" },
                        }));
                      }
                    }}
                  >
                    <option value="">Select Policy</option>
                    {policies?.map((policy) => (
                      <option key={policy._id} value={policy._id}>
                        {policy.title}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>

            <Card style={{ marginTop: "20px" }}>
              <Card.Header>Product Status</Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                    Status
                  </Form.Label>
                  <Form.Select
                    name="status"
                    style={{ fontSize: 14 }}
                    value={product.status || "DRAFT"}
                    onChange={(e) => handleChange("status", e.target.value)}
                  >
                    <option value="DRAFT">Draft</option>
                    <option value="ACTIVE">Active</option>
                    <option value="ARCHIVED">Archived</option>
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>

            <FAQForm product={product} setProduct={setProduct} />

            <SEOForm seoData={product} setSeoData={setProduct} />
          </Col>

          {/* Additional Info */}
          <Col md={6}></Col>

          {/* Submit */}
          <Col md={12} className="text-end">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Saving..." : "Save Product"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
