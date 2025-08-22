import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
} from "react-bootstrap";
import {
  getHeaders,
  getCategories,
  getSubCategories,
  getCollections,
} from "../../api/admin/hierarchyManagerApi";

import { addProduct } from "../../api/admin/productApi";
import "quill/dist/quill.snow.css";
import SEOForm from "./SEOForm/SEOForm";
import ColourDropdown from "./ColourDropdown/ColourDropdown";
import FAQForm from "./FAQForm/FAQForm";
import { IoAddCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";

export default function AddProduct() {
  const [headers, setHeaders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [collections, setCollections] = useState([]);

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
    keywords: [], // old one, you can remove if not used
    media: [],
    variants: [],
    estimatedShippingDate: "",
    shippingAndReturns: "",
    productSpeciality: [],
    faq: [],
    inventoryBySize: [],

    // ✅ initialize seo correctly
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
  }, []);
  const fetchHeaders = async () => {
    const res = await getHeaders();
    setHeaders(res);
  };
  const loadCategories = async (headerId) => {
    setSelectedHeader(headerId);
    const res = await getCategories();
    setCategories(res.filter((c) => c.header._id === headerId));
    setSubCategories([]);
    setCollections([]);
  };
  const loadSubCategories = async (categoryId) => {
    setSelectedCategory(categoryId);
    const res = await getSubCategories();
    setSubCategories(res.filter((s) => s.category._id === categoryId));
    setCollections([]);
  };
  const loadCollections = async (subCategoryId) => {
    setSelectedSubCategory(subCategoryId);
    const res = await getCollections();
    setCollections(res.filter((c) => c.subcategory._id === subCategoryId));
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
    setProduct((prev) => {
      const updated = {
        ...prev,
        variants: [
          ...(prev.variants || []),
          {
            attributes: [{ name: "Size", value: "" }],
            sku: "",
            additionalPrice: 0,
            stock: 0,
            reservedStock: 0,
          },
        ],
      };
      console.log("✅ Updated product:", updated); // check if variant added
      return updated;
    });
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
  const updateVariantAttribute = (vIndex, aIndex, field, value) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.map((v, i) =>
        i === vIndex
          ? {
              ...v,
              attributes: v.attributes.map((a, j) =>
                j === aIndex ? { ...a, [field]: value } : a
              ),
            }
          : v
      ),
    }));
  };

  // Add Attribute to a Variant
  const addVariantAttribute = (index) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.map((v, i) =>
        i === index
          ? { ...v, attributes: [...v.attributes, { name: "", value: "" }] }
          : v
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
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading
    console.log("product",product)
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
      category: "",
      subCategory: "",
      header: "",
      keywords: [],
      media: [],
      variants: [],
      estimatedShippingDate: "",
      shippingAndReturns: "",
      productSpeciality: [],
      faq: [],
      inventoryBySize: {},
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
                  <Form.Label style={{fontWeight:"600",fontSize:15}}>Header  <span style={{color:"red"}}>*</span></Form.Label>
                  <Form.Select
                    name="header"
                    value={product.header || ""}
                    onChange={async (e) => {
                      const headerId = e.target.value;
                      setProduct((p) => ({ ...p, header: headerId }));
                      await loadCategories(headerId);
                    }}
                    style={{fontSize:14}}
                  >
                    <option value="">Select Header</option>
                    {headers.map((h) => (
                      <option key={h._id} value={h._id}>
                        {h.title}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                {/* Category */}
                <Form.Group className="mb-3">
                  <Form.Label style={{fontWeight:"600",fontSize:15}}>Category <span style={{color:"red"}}>*</span></Form.Label>
                  <Form.Select
                    name="category"
                    style={{fontSize:14}}
                    value={product.category || ""}
                    onChange={async (e) => {
                      const categoryId = e.target.value;
                      setProduct((p) => ({ ...p, category: categoryId }));
                      await loadSubCategories(categoryId);
                    }}
                  >
                    <option value="">Select Category</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                {/* SubCategory */}
                <Form.Group className="mb-3">
                  <Form.Label style={{fontWeight:"600",fontSize:15}}>Sub Category <span style={{color:"red"}}>*</span></Form.Label>
                  <Form.Select
                    name="subCategory"
                    style={{fontSize:14}}
                    value={product.subCategory || ""}
                    onChange={async (e) => {
                      const subCategoryId = e.target.value;

                      // Find the subcategory name
                      const subCategoryObj = subCategories.find(
                        (sc) => sc._id === subCategoryId
                      );
                      const subCategoryName = subCategoryObj
                        ? subCategoryObj.name
                        : "GEN";

                      // Generate random item number
                      const randomNum = Math.floor(1000 + Math.random() * 9000);
                      const itemNumber = `${subCategoryName
                        .replace(/\s+/g, "")
                        .toUpperCase()}-${randomNum}`;

                      // Update product state
                      setProduct((p) => ({
                        ...p,
                        subCategory: subCategoryId,
                        itemNumber: itemNumber, // set the random item number
                      }));

                      await loadCollections(subCategoryId);
                    }}
                  >
                    <option value="">Select SubCategory</option>
                    {subCategories.map((sc) => (
                      <option key={sc._id} value={sc._id}>
                        {sc.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                {/* Collection */}
                <Form.Group>
                  <Form.Label style={{fontWeight:"600",fontSize:15}}>Collection</Form.Label>
                  <Form.Select
                    name="collection"
                    style={{fontSize:14}}
                    value={product.collection || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select Collection</option>
                    {collections.map((col) => (
                      <option key={col._id} value={col._id}>
                        {col.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>

            {/* Product Details */}
            <Card className="mt-3">
              <Card.Header>Product Details</Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label style={{fontWeight:"600",fontSize:15}}>Title <span style={{color:"red"}}>*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={product?.title || ""}
                    style={{fontSize:14}}
                    onChange={(e) => handleChange("title", e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{fontWeight:"600",fontSize:15}}>Description <span style={{color:"red"}}>*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="description"
                    style={{fontSize:14}}
                    value={product?.description || ""}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    required
                  />
                </Form.Group>

                {/* Media Upload */}
                <div>
                  <Form.Label style={{fontWeight:"600",fontSize:15}}>Media <span style={{color:"red"}}>*</span></Form.Label>
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
              <div className="mt-4">
                <h6>Variants</h6>
                {product.variants.map((variant, vIndex) => (
                  <Card key={vIndex} className="mb-3">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <strong>Variant {vIndex + 1}</strong>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeVariant(vIndex)}
                        >
                          Remove
                        </Button>
                      </div>

                      {variant.attributes.map((attr, aIndex) => (
                        <Row className="mb-2" key={aIndex}>
                          <Col>
                            <Form.Control
                              type="text"
                               style={{fontSize:14}}
                              placeholder="Attribute Name (e.g. Size)"
                              value={attr.name}
                              onChange={(e) =>
                                updateVariantAttribute(
                                  vIndex,
                                  aIndex,
                                  "name",
                                  e.target.value
                                )
                              }
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              type="text"
                              placeholder="Value (e.g. Large)"
                               style={{fontSize:14}}
                              value={attr.value}
                              onChange={(e) =>
                                updateVariantAttribute(
                                  vIndex,
                                  aIndex,
                                  "value",
                                  e.target.value
                                )
                              }
                            />
                          </Col>
                        </Row>
                      ))}
                      <Button
                        size="sm"
                        variant="secondary"
                       
                        onClick={() => addVariantAttribute(vIndex)}
                        style={{borderRadius:100,backgroundColor:"#282e36ff",border:"none",fontSize:12,}}
                      >
                        <IoAddCircleOutline size={15}/> Add Attribute
                      </Button>

                      <Row className="mt-3">
                        <Col md={6}>
                          <Form.Label>SKU</Form.Label>
                          <Form.Control
                           style={{fontSize:14}}
                            value={variant.sku}
                            onChange={(e) =>
                              updateVariant(vIndex, "sku", e.target.value)
                            }
                          />
                        </Col>
                        <Col md={6}>
                          <Form.Label>Additional Price</Form.Label>
                          <Form.Control
                            type="number"
                            value={variant.additionalPrice}
                            onChange={(e) =>
                              updateVariant(
                                vIndex,
                                "additionalPrice",
                                Number(e.target.value)
                              )
                            }
                          />
                        </Col>
                      </Row>

                      <Row className="mt-2">
                        <Col md={6}>
                          <Form.Label>Stock</Form.Label>
                          <Form.Control
                            type="number"
                             style={{fontSize:14}}
                            value={variant.stock}
                            onChange={(e) =>
                              updateVariant(
                                vIndex,
                                "stock",
                                Number(e.target.value)
                              )
                            }
                          />
                        </Col>
                        <Col md={6}>
                          <Form.Label>Reserved Stock</Form.Label>
                          <Form.Control
                            type="number"
                             style={{fontSize:14}}
                            value={variant.reservedStock}
                            onChange={(e) =>
                              updateVariant(
                                vIndex,
                                "reservedStock",
                                Number(e.target.value)
                              )
                            }
                          />
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                ))}

                <Button onClick={addVariant} variant="primary" size="sm" style={{width:150,borderRadius:100,backgroundColor:"#282e36ff",border:"none"}}>
                  <IoAddCircleOutline color="#fff"size={17} style={{marginTop:-2}}/> Add Variant
                </Button>
              </div>
            </Card>
          </Col>

          {/* Pricing */}
          <Col md={5}>
            <Card style={{ marginTop: "0px" }}>
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
                         style={{fontSize:14}}
                        value={product?.costPrice || ""}
                        onChange={(e) =>
                          handleChange("costPrice", e.target.value)
                        }
                        required
                        placeholder="Enter cost price"
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
                        style={{fontSize:14}}
                        value={product.marginPercent || ""}
                        onChange={(e) =>
                          handleChange("marginPercent", e.target.value)
                        }
                        placeholder="Enter margin %"
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
                        style={{fontSize:14}}
                        value={product.mrp || ""}
                        onChange={(e) => handleChange("mrp", e.target.value)}
                        placeholder="Enter MRP"
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
                        style={{fontSize:14}}
                        value={product.salePrice || ""}
                        onChange={(e) =>
                          handleChange("salePrice", e.target.value)
                        }
                        placeholder="Auto-calculated or editable"
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
              </Card.Body>
            </Card>

            <Card style={{ marginTop: "20px" }}>
              <Card.Header>Shipping & Product Info</Card.Header>
              <Card.Body>
                {/* Product Speciality */}
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                    Product Speciality
                  </Form.Label>
                  <Row>
                    <Col md={8}>
                      <Form.Control
                        type="text"
                        style={{fontSize:14}}
                        value={specialityInput}
                        onChange={(e) => setSpecialityInput(e.target.value)}
                        placeholder="Enter speciality (e.g. Handcrafted)"
                      />
                    </Col>
                    <Col md={4}>
                      <Button
                        variant="primary"
                        onClick={addSpeciality}
                        style={{ width: "100%",backgroundColor: "#282e36ff", border: "none" ,fontSize:14}}
                      >
                        Add
                      </Button>
                    </Col>
                  </Row>

                  <div className="mt-2">
                    {(product.productSpeciality || []).map((item, index) => (
                      <Badge
                        key={index}
                        bg="secondary"
                        className="me-2 mb-2 p-2"
                        style={{ fontSize: "13px", cursor: "pointer" }}
                        onClick={() => removeSpeciality(index)}
                      >
                        {item} ✕
                      </Badge>
                    ))}
                  </div>
                </Form.Group>

                {/* Shipping & Returns */}
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                    Shipping & Returns
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    style={{fontSize:14}}
                    name="shippingAndReturns"
                    value={product?.shippingAndReturns || ""}
                    onChange={(e) =>
                      handleChange("shippingAndReturns", e.target.value)
                    }
                    placeholder="Enter shipping & return policy"
                  />
                </Form.Group>

                {/* Estimated Shipping Date */}
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: 500, fontSize: 14 }}>
                    Estimated Shipping Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="estimatedShippingDate"
                    style={{fontSize:14}}
                    value={product.estimatedShippingDate || ""}
                    onChange={(e) =>
                      handleChange("estimatedShippingDate", e.target.value)
                    }
                  />
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

            <Card className="mt-4 shadow-sm">
              <Card.Body>
                <h5 className="mb-3" style={{fontSize:16}}>Inventory by Size</h5>

                {Object.entries(product.inventoryBySize || {}).map(
                  ([size, qty], index) => (
                    <Row key={index} className="align-items-end mb-2">
                      <Col>
                        <Form.Group>
                          <Form.Label style={{fontSize:14,fontWeight:500}}>Size</Form.Label>
                          <Form.Control
                            type="text"
                            value={size}
                            style={{fontSize:14}}
                            onChange={(e) => {
                              const newSize = e.target.value;
                              setProduct((prev) => {
                                const updated = { ...prev.inventoryBySize };
                                // Move quantity to new key
                                delete updated[size];
                                updated[newSize] = qty;
                                return { ...prev, inventoryBySize: updated };
                              });
                            }}
                            placeholder="e.g. M, L, XL"
                          />
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group>
                          <Form.Label style={{fontSize:14,fontWeight:500}}>Quantity</Form.Label>
                          <Form.Control
                            type="number"
                            min="0"
                            value={qty}
                            style={{fontSize:14}}
                            onChange={(e) => {
                              const value = parseInt(e.target.value, 10) || 0;
                              setProduct((prev) => ({
                                ...prev,
                                inventoryBySize: {
                                  ...prev.inventoryBySize,
                                  [size]: value,
                                },
                              }));
                            }}
                            placeholder="Enter stock quantity"
                          />
                        </Form.Group>
                      </Col>

                      <Col xs="auto">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() =>
                            setProduct((prev) => {
                              const updated = { ...prev.inventoryBySize };
                              delete updated[size];
                              return { ...prev, inventoryBySize: updated };
                            })
                          }
                        >
                          Remove
                        </Button>
                      </Col>
                    </Row>
                  )
                )}

                <Button
                  variant="primary"
                  size="sm"
                  style={{ width: 150, borderRadius: 100, backgroundColor: "#282e36ff", border: "none" }}
                  onClick={() =>
                    setProduct((prev) => ({
                      ...prev,
                      inventoryBySize: {
                        ...prev.inventoryBySize,
                        "": 0, // new row with empty size
                      },
                    }))
                  }
                >
                  <IoAddCircleOutline size={15}/> Add Size
                </Button>
              </Card.Body>
            </Card>
          </Col>

          {/* Additional Info */}
          <Col md={6}>
            <Card>
              <Card.Header>Additional Info</Card.Header>
              <Card.Body>
                {/* <Form.Group className="mb-3">
                  <Form.Label>Colour</Form.Label>
                  <Form.Control
                    name="colour"
                    value={product.colour}
                    onChange={handleChange}
                  />
                </Form.Group> */}
                <ColourDropdown product={product} setProduct={setProduct} />
                <Form.Group>
                  <Form.Label style={{fontWeight:500,fontSize:14}}>Fulfillment Type  <span style={{color:"red"}}>*</span></Form.Label>
                  <Form.Select
                    name="fulfillmentType"
                    value={product.fulfillmentType}
                    onChange={(e) =>
                      handleChange("fulfillmentType", e.target.value)
                    }
                  >
                    <option value="READY_TO_SHIP">Ready to Ship</option>
                    <option value="MADE_TO_ORDER">Made to Order</option>
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>

            <FAQForm product={product} setProduct={setProduct} />

            <SEOForm seoData={product} setSeoData={setProduct} />
          </Col>

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
