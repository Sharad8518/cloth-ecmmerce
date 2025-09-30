import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Container,
  Table,
  Badge,
  Button,
  Spinner,
  Pagination,
  Modal,
  Form,
  Row,
  Col,
  Card,
  Dropdown,
  ButtonGroup,
  OverlayTrigger,
  Tooltip,
  Tab,
  Nav,
  Accordion,
} from "react-bootstrap";
import {
  editProductMedia,
  getProducts,
  addOrUpdateReview,
  verifyReview,
  onSaleProduct,
} from "../../../api/admin/productApi";
import { MdReviews } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import SaleModal from "../SaleModal/SaleModal";
import { FaStar } from "react-icons/fa";
import {
  FaEdit,
  FaTrash,
  FaEllipsisV,
  FaEye,
  FaTags,
  FaCopy,
  FaRandom,
  FaTimes,
} from "react-icons/fa";

// -------------------- Product Row --------------------
const ProductRow = ({
  product,
  index,
  page,
  limit,
  onDelete,
  onViewMore,
  onEditMedia,
  onAddReview,
  onSale,
}) => {
  const navigate = useNavigate();
  const [saleProduct, setSaleProduct] = useState(null);
  const [showSaleModal, setShowSaleModal] = useState(false);

  return (
    <>
      <tr>
        <td>{(page - 1) * limit + index + 1}</td>
        <td>{product.itemNumber || "-"}</td>
        <td>
          <img src={product.media[0].url} style={{ width: 50, height: 50 }} />
        </td>
        <td>{product.title || "-"}</td>
        <td>{product.categories[0] || "-"}</td>
        <td>₹{product.mrp || "-"}</td>
        <td>
          {product.saleOn ? (
            <Badge bg="danger" pill>
              Yes
            </Badge>
          ) : (
            <Badge bg="secondary" pill>
              No
            </Badge>
          )}
        </td>
        <td>{product.availableStock}</td>
        <td>{product.sold}</td>
        <td>
          <Badge pill bg={product.status === "ACTIVE" ? "success" : "warning"}>
            {product.status || "-"}
          </Badge>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <OverlayTrigger placement="top" overlay={<Tooltip>Edit</Tooltip>}>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() =>
                  navigate("/dashboard/EditProduct", {
                    state: { getProduct: product },
                  })
                }
              >
                <FaEdit />
              </Button>
            </OverlayTrigger>

            <OverlayTrigger placement="top" overlay={<Tooltip>Delete</Tooltip>}>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onDelete(product._id)}
              >
                <FaTrash />
              </Button>
            </OverlayTrigger>

            <Dropdown.Toggle
              split
              variant="light"
              id={`dropdown-actions-${product._id}`}
              className="border"
              size="sm"
            >
              <FaEllipsisV />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
              <Dropdown.Item
                onClick={() =>
                  navigate("/dashboard/FrequentlyBought", {
                    state: { productId: product._id, productDetails: product },
                  })
                }
              >
                <FaCopy className="me-2 text-secondary" /> Frequently Bought
              </Dropdown.Item>

              <Dropdown.Item
                onClick={() =>
                  navigate("/dashboard/SimilarProduct", {
                    state: { productId: product._id, productDetails: product },
                  })
                }
              >
                <FaRandom className="me-2 text-secondary" /> Similar Products
              </Dropdown.Item>

              <Dropdown.Item onClick={() => onSale(product)}>
                <FaTags className="me-2 text-secondary" /> Sale on Product
              </Dropdown.Item>

              <Dropdown.Item onClick={() => onEditMedia(product)}>
                <FaEdit className="me-2 text-secondary" /> Edit Media
              </Dropdown.Item>

              <Dropdown.Item onClick={() => onAddReview(product)}>
                <MdReviews className="me-2 text-secondary" /> Add Review
              </Dropdown.Item>

              <Dropdown.Divider />

              <Dropdown.Item onClick={() => onViewMore(product)}>
                <FaEye className="me-2 text-secondary" /> View More
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>

      {/* Sale Modal */}
      {/* <SaleModal
        product={saleProduct}
        show={showSaleModal}
        onHide={() => setShowSaleModal(false)}
        onSave={(data) => console.log("Save sale data:", saleProduct._id, data)}
      /> */}
    </>
  );
};

// -------------------- Product Details Modal --------------------
const ProductModal = ({ product, show, onHide }) => {
  if (!product) return null;

  const discount =
    product.saleOn && product.discountValue
      ? product.discountType === "percent"
        ? `${product.discountValue}% OFF`
        : `₹${product.discountValue} OFF`
      : null;

  const handleToggleVerify = async (reviewId) => {
    try {
      const response = await verifyReview(product._id, reviewId);
      alert(response.message);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{product?.title || "Product Details"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row>
          {/* --- Media --- */}
          <Col md={5} className="mb-3">
            {product.media && product.media.length > 0 ? (
              <img
                src={product.media[0].url}
                alt={product.media[0].alt || product.title}
                className="img-fluid rounded shadow-sm"
              />
            ) : (
              <div className="bg-light text-center py-5 rounded">
                No Image Available
              </div>
            )}
          </Col>

          {/* --- Product Info --- */}
          <Col md={7}>
            <h5>{product.title}</h5>
            <p className="text-muted">
              {product.shortDescription || product.description}
            </p>

            <h4 className="fw-bold">
              ₹
              {product.saleOn && product.salePrice
                ? product.salePrice
                : product.mrp}{" "}
              {product.saleOn && (
                <small className="text-muted text-decoration-line-through">
                  ₹{product.mrp}
                </small>
              )}
              {discount && (
                <Badge bg="success" className="ms-2">
                  {discount}
                </Badge>
              )}
            </h4>

            <p>
              <strong>Status:</strong>{" "}
              <Badge bg={product.status === "ACTIVE" ? "success" : "secondary"}>
                {product.status}
              </Badge>
            </p>

            <p>
              <strong>Item Number:</strong> {product.itemNumber}
            </p>

            <p>
              <strong>Category:</strong> {product.categories?.join(", ") || "-"}
            </p>

            <p>
              <strong>Colour:</strong> {product.colour || "-"}
            </p>

            <p>
              <strong>Fulfillment:</strong> {product.fulfillmentType}
            </p>

            {/* Average Rating */}
            <div className="d-flex align-items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <FaStar
                  key={i}
                  color={
                    i < Math.round(product.averageRating)
                      ? "#ffc107"
                      : "#e4e5e9"
                  }
                />
              ))}
              <span className="ms-2">
                {product.averageRating || 0} / 5 ({product.reviews?.length || 0}{" "}
                reviews)
              </span>
            </div>
          </Col>
        </Row>

        {/* --- Tabs Section --- */}
        <Tab.Container defaultActiveKey="details">
          <Nav variant="tabs" className="mt-4">
            <Nav.Item>
              <Nav.Link eventKey="details">Details</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="variants">Variants</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="shipping">Shipping</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="faq">FAQ</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="reviews">Reviews</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content className="pt-3">
            {/* Details */}
            <Tab.Pane eventKey="details">
              <Card className="shadow-sm p-3 mb-3">
                <Card.Header>
                  <h5 className="mb-0">Product Details</h5>
                </Card.Header>
                <Card.Body>
                  <Table borderless size="sm" className="mb-0">
                    <tbody>
                      <tr>
                        <th>Fabric</th>
                        <td>{product.fabric || "-"}</td>
                      </tr>
                      <tr>
                        <th>Work</th>
                        <td>{product.work || "-"}</td>
                      </tr>
                      <tr>
                        <th>Care</th>
                        <td>{product.care || "-"}</td>
                      </tr>
                      <tr>
                        <th>Pack Contains</th>
                        <td>{product.packContains || "-"}</td>
                      </tr>
                      <tr>
                        <th>Occasion</th>
                        <td>{product.occasion || "-"}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Tab.Pane>

            {/* Variants */}
            <Tab.Pane eventKey="variants">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Product Variants</h5>
                {/* <button className="btn btn-primary btn-sm">Add Variant</button> */}
              </div>

              {product.variants?.length > 0 ? (
                <Row className="g-3">
                  {product.variants.map((v, idx) => (
                    <Col xs={12} md={6} lg={4} key={idx}>
                      <Card className="shadow-sm h-100">
                        <Card.Body>
                          <Card.Title>Size: {v.size}</Card.Title>
                          <Card.Text>
                            <strong>Stock:</strong> {v.stock}
                            <br />
                            <strong>Status:</strong>{" "}
                            <Badge
                              bg={
                                v.status.toLowerCase() === "active"
                                  ? "success"
                                  : "secondary"
                              }
                            >
                              {v.status}
                            </Badge>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <p className="text-muted">No variants available.</p>
              )}
            </Tab.Pane>

            {/* Shipping */}
            <Tab.Pane eventKey="shipping">
              <p>
                {product.shippingAndReturns?.description || "No shipping info."}
              </p>
            </Tab.Pane>

            {/* FAQ */}
            <Tab.Pane eventKey="faq">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Frequently Asked Questions</h5>
                {/* <button className="btn btn-primary btn-sm">Add FAQ</button> */}
              </div>

              {product.faq?.length > 0 ? (
                <Accordion defaultActiveKey="">
                  {product.faq.map((f, idx) => (
                    <Accordion.Item eventKey={idx.toString()} key={idx}>
                      <Accordion.Header>{f.question}</Accordion.Header>
                      <Accordion.Body>{f.answer}</Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              ) : (
                <p className="text-muted">No FAQs available.</p>
              )}
            </Tab.Pane>

            {/* Reviews */}
            <Tab.Pane eventKey="reviews">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Product Reviews</h5>
                {/* <button className="btn btn-primary btn-sm">Add Review</button> */}
              </div>

              {product.reviews?.length > 0 ? (
                product.reviews.map((r) => (
                  <div
                    key={r._id}
                    className={`border rounded p-3 mb-2 shadow-sm ${
                      r.isAdminReview ? "bg-light" : ""
                    }`}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <div>
                        <strong>{r.name}</strong>{" "}
                        <span className="text-warning">{r.rating}★</span>
                        {r.isAdminReview && (
                          <span className="badge bg-info text-dark ms-2">
                            Admin
                          </span>
                        )}
                      </div>
                      <div>
                        <div>
                          <button
                            className={`btn btn-sm me-1 ${
                              r.verified
                                ? "btn-outline-success"
                                : "btn-outline-secondary"
                            }`}
                            onClick={() => handleToggleVerify(r._id)}
                          >
                            {r.verified ? "Unverify" : "Verify"}
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="mb-0">{r.comment}</p>
                    {r.media?.url && (
                      <img
                        src={r.media.url}
                        alt={r.media.alt || "review image"}
                        className="img-fluid mt-2 rounded"
                        style={{ maxHeight: "150px" }}
                      />
                    )}
                    <small className="text-muted d-block mt-1">
                      {new Date(r.createdAt).toLocaleString()}
                    </small>
                  </div>
                ))
              ) : (
                <p className="text-muted">No reviews yet.</p>
              )}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// -------------------- Media Edit Modal --------------------
const MediaModal = ({ show, onHide, product }) => {
  const [files, setFiles] = useState([]); // New files to upload
  const [mediaList, setMediaList] = useState([]); // Existing media
  const [deleteList, setDeleteList] = useState([]); // URLs to delete
  const [draggedIndex, setDraggedIndex] = useState(null); // Reorder drag
  const [draggingUpload, setDraggingUpload] = useState(false); // File drag hover
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();

  // Load existing media when product changes
  useEffect(() => {
    if (product) {
      setFiles([]);
      setDeleteList([]);
      setMediaList(product.media || []);
    }
  }, [product]);

  // --- Upload input / drag events ---
  const handleFileChange = (e) => {
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDraggingUpload(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDraggingUpload(false);
  };

  const handleDropFiles = (e) => {
    e.preventDefault();
    setDraggingUpload(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };

  // --- Delete media ---
  const handleDeleteUrl = (url) => {
    setDeleteList([...deleteList, url]);
    setMediaList(mediaList.filter((m) => m.url !== url));
  };

  // --- Reorder drag ---
  const handleDragStart = (index) => setDraggedIndex(index);

  const handleDragOverMedia = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    const list = [...mediaList];
    const draggedItem = list[draggedIndex];
    list.splice(draggedIndex, 1);
    list.splice(index, 0, draggedItem);
    setDraggedIndex(index);
    setMediaList(list);
  };

  const handleDragEnd = () => setDraggedIndex(null);

  // --- Save changes ---
  const handleSave = async () => {
    if (!product) return;
    try {
      setUploading(true);
      const updatedMedia = await editProductMedia({
        productId: product._id,
        newFiles: files,
        deleteUrls: deleteList,
        reorderedMedia: mediaList,
      });
      alert("Media updated successfully!");
      onHide(updatedMedia);
    } catch (err) {
      console.error(err);
      alert("Failed to update media");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal show={show} onHide={() => onHide()} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Media - {product?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Drag & Drop Upload Area */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDropFiles}
          onClick={() => inputRef.current.click()}
          style={{
            border: "2px dashed #ccc",
            borderRadius: 8,
            padding: 20,
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: draggingUpload ? "#f0f8ff" : "#fff",
            marginBottom: 15,
          }}
        >
          <input
            type="file"
            multiple
            ref={inputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          {draggingUpload ? (
            <p>Drop files here...</p>
          ) : (
            <p>Drag & drop files here or click to select</p>
          )}
        </div>

        {/* Preview Existing Media (Reorderable) */}
        <div className="d-flex flex-wrap">
          {mediaList.map((m, idx) => (
            <div
              key={m.url}
              className="position-relative m-2"
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOverMedia(e, idx)}
              onDragEnd={handleDragEnd}
              style={{ cursor: "grab" }}
            >
              {m.kind === "image" ? (
                <img
                  src={m.url}
                  alt={m.alt}
                  width={100}
                  height={100}
                  style={{ borderRadius: 8 }}
                />
              ) : (
                <video
                  src={m.url}
                  width={100}
                  height={100}
                  controls
                  style={{ borderRadius: 8 }}
                />
              )}
              <Button
                size="sm"
                variant="danger"
                className="position-absolute top-0 end-0"
                onClick={() => handleDeleteUrl(m.url)}
              >
                X
              </Button>
            </div>
          ))}

          {/* Preview New Uploads */}
          {files.map((file, idx) => (
            <div key={idx} className="position-relative m-2">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                width={100}
                height={100}
                style={{ borderRadius: 8 }}
              />
              <Button
                size="sm"
                variant="danger"
                className="position-absolute top-0 end-0"
                onClick={() => setFiles(files.filter((f, i) => i !== idx))}
              >
                X
              </Button>
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => onHide()}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={uploading}>
          {uploading ? "Saving..." : "Save Changes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// -------------------- AllProductAdmin Page --------------------
export default function AllProductAdmin() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [review, setReview] = useState({
    userName: "",
    rating: 5,
    comment: "",
  });
  const [currentEditingProduct, setCurrentEditingProduct] = useState(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedSaleProduct, setSelectedSaleProduct] = useState(null);

  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [itemNumber, setItemNumber] = useState("");
  const [status, setStatus] = useState("");
  const [showModalSele, setShowModalSale] = useState(false);
  const [showSaleModal, setShowSaleModal] = useState(false);
  const [showReviewModel, setShowRevieModel] = useState(false);

  const [form, setForm] = useState({
    saleOn: false,
    salePrice: "",
    discountType: "percent",
    discountValue: "",
    saleStart: "",
    saleEnd: "",
  });

  const limit = 20;
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       setLoading(true);
  //       const data = await getProducts({
  //         page,
  //         limit,
  //         search,
  //         title,
  //         itemNumber,
  //         status,
  //       });
  //       setProducts(data.products || []);
  //       setPages(data.pages || 1);
  //       console.log('data',data)
  //     } catch (err) {
  //       console.error("Failed to fetch products:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchProducts();
  // }, [page, search, title, itemNumber, status]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProducts({
        page,
        limit,
        search,
        title,
        itemNumber,
        status,
      });
      setProducts(data.products || []);
      setPages(data.pages || 1);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, title, itemNumber, status]);

  // 🔹 call when deps change
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = (id) => console.log("Delete product:", id);

  const handleViewMore = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleEditMedia = (product) => {
    setCurrentEditingProduct(product);
    setShowMediaModal(true);
  };

  const handleOpenSaleModal = (product) => {
    setSelectedSaleProduct(product);
    setShowSaleModal(true);
  };

  const handleAddReview = async (product) => {
    setCurrentEditingProduct(product);
    setShowRevieModel(true);
  };


  const [isSaving, setIsSaving] = useState(false);
  // save handler
  const handleSaveSale = async () => {
    try {
      setIsSaving(true); // show loader/spinner if you have on
      await onSaleProduct(selectedSaleProduct._id, form);
      setShowSaleModal(false);
    } catch (error) {
      console.error("❌ Failed to save sale:", error);
      alert("Something went wrong while saving the sale. Please try again.");
    } finally {
      setIsSaving(false); // always stop loader
      fetchProducts(); // refresh product list to show updated sale info
    }
  };

  const fileInputRef = useRef(null);

  // cleanup object URL when file changes / component unmounts
  useEffect(() => {
    return () => {
      if (review?.file && review.filePreview) {
        URL.revokeObjectURL(review.filePreview);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFileSelected = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }

    // revoke previous preview
    if (review.filePreview) URL.revokeObjectURL(review.filePreview);

    const preview = URL.createObjectURL(file);
    setReview({ ...review, file, filePreview: preview });
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      handleFileSelected(files[0]); // single file only
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // optionally add a class to indicate active drop zone
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) handleFileSelected(file);
  };

  const removeFile = () => {
    if (review.filePreview) URL.revokeObjectURL(review.filePreview);
    setReview({ ...review, file: null, filePreview: null });
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4">Products</h2>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Form>
            <Row className="g-3 align-items-center">
              <Col md={3}>
                <Form.Control
                  placeholder="Search (text)"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Col>
              <Col md={3}>
                <Form.Control
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  placeholder="Item Number"
                  value={itemNumber}
                  onChange={(e) => setItemNumber(e.target.value)}
                />
              </Col>
              <Col md={2}>
                <Form.Select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">All Status</option>
                  <option value="ACTIVE">Active</option>
                  <option value="Draft">Draft</option>
                </Form.Select>
              </Col>
              <Col md={2} className="d-flex">
                <Button
                  variant="secondary"
                  className="w-100"
                  onClick={() => {
                    setSearch("");
                    setTitle("");
                    setItemNumber("");
                    setStatus("");
                  }}
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Table
            bordered
            hover
            responsive
            className="shadow-sm"
            style={{ fontSize: 12 }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Item Number</th>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>MRP</th>
                <th>On Sale</th>
                <th>Stock</th>
                <th>Sold</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <ProductRow
                  key={product._id}
                  product={product}
                  index={index}
                  page={page}
                  limit={limit}
                  onDelete={handleDelete}
                  onViewMore={handleViewMore}
                  onEditMedia={handleEditMedia}
                  onAddReview={handleAddReview}
                  onSale={handleOpenSaleModal}
                />
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              {[...Array(pages).keys()].map((x) => (
                <Pagination.Item
                  key={x + 1}
                  active={x + 1 === page}
                  onClick={() => setPage(x + 1)}
                >
                  {x + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </div>

          <ProductModal
            product={selectedProduct}
            show={showModal}
            onHide={() => setShowModal(false)}
          />
          <SaleModal
            product={selectedSaleProduct}
            show={showSaleModal}
            onHide={() => setShowSaleModal(false)}
            onSave={handleSaveSale}
          />

          <MediaModal
            show={showMediaModal}
            product={currentEditingProduct}
            onHide={(updatedMedia) => {
              setShowMediaModal(false);
              if (updatedMedia && currentEditingProduct) {
                setProducts((prev) =>
                  prev.map((p) =>
                    p._id === currentEditingProduct._id
                      ? { ...p, media: updatedMedia }
                      : p
                  )
                );
              }
              setCurrentEditingProduct(null);
            }}
          />
        </>
      )}

      <Modal
        show={showSaleModal}
        onHide={() => setShowSaleModal(false)}
        centered
      >
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
                <div className="alert alert-info mt-3" style={{ fontSize: 12 }}>
                  <strong>Note:</strong> Sale price is auto-calculated from MRP
                  (₹
                  {selectedSaleProduct?.mrp || 0}) based on discount.
                </div>

                <Form.Group className="mb-3">
                  <Form.Label>Discount Type</Form.Label>
                  <Form.Select
                    value={form.discountType}
                    onChange={(e) => {
                      const discountType = e.target.value;
                      let salePrice = form.salePrice;

                      if (selectedSaleProduct?.mrp) {
                        const mrp = selectedSaleProduct.mrp;
                        if (discountType === "percent") {
                          salePrice = mrp - (mrp * form.discountValue) / 100;
                        } else {
                          salePrice = mrp - form.discountValue;
                        }
                      }

                      setForm({ ...form, discountType, salePrice });
                    }}
                  >
                    <option value="percent">Percent</option>
                    <option value="flat">Flat</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Discount Value</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    value={form.discountValue}
                    onChange={(e) => {
                      const discountValue = Number(e.target.value);
                      let salePrice = form.salePrice;

                      if (selectedSaleProduct?.mrp) {
                        const mrp = selectedSaleProduct.mrp;
                        if (form.discountType === "percent") {
                          salePrice = mrp - (mrp * discountValue) / 100;
                        } else {
                          salePrice = mrp - discountValue;
                        }
                      }

                      setForm({ ...form, discountValue, salePrice });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Sale Price</Form.Label>
                  <Form.Control
                    type="number"
                    required
                    value={form.salePrice}
                    readOnly // ✅ make it readonly since it's auto-calculated
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleSaveSale}
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showReviewModel}
        onHide={() => setShowRevieModel(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Review Product - {selectedProduct?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Rating</Form.Label>
              <div>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={22}
                    className="me-1"
                    color={review.rating >= star ? "gold" : "lightgray"}
                    style={{ cursor: "pointer" }}
                    onClick={() => setReview({ ...review, rating: star })}
                  />
                ))}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={review.userName || ""}
                onChange={(e) =>
                  setReview({ ...review, userName: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Upload Image (optional)</Form.Label>

              <div
                onDragOver={onDragOver}
                onDrop={onDrop}
                onClick={() =>
                  fileInputRef.current && fileInputRef.current.click()
                }
                style={{
                  border: "1px dashed #ced4da",
                  borderRadius: 6,
                  padding: 12,
                  textAlign: "center",
                  cursor: "pointer",
                  position: "relative",
                  background: "#fff",
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileInputChange}
                />

                {review.filePreview ? (
                  <div
                    style={{ position: "relative", display: "inline-block" }}
                  >
                    <img
                      src={review.filePreview}
                      alt="Preview"
                      style={{
                        maxHeight: 150,
                        borderRadius: 6,
                        display: "block",
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile();
                      }}
                      aria-label="Remove image"
                      style={{
                        position: "absolute",
                        top: 6,
                        right: 6,
                        border: "none",
                        background: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        borderRadius: "50%",
                        width: 28,
                        height: 28,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                    >
                      <FaTimes size={12} />
                    </button>
                  </div>
                ) : (
                  <p className="m-0">
                    Drag & drop an image here, or <u>click to select</u>
                  </p>
                )}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write your review..."
                value={review.comment}
                onChange={(e) =>
                  setReview({ ...review, comment: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRevieModel(false)}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={async () => {
              if (!review.comment && review.rating < 1) {
                alert("Please provide a rating or comment.");
                return;
              }
              try {
                // Call backend API
                const response = await addOrUpdateReview(
                  currentEditingProduct?._id,
                  review
                );
                alert(response.message); // "Review added" or "Review updated"

                // Reset form
                setReview({ rating: 5, userName: "", comment: "" });
                setShowRevieModel(false);
              } catch (err) {
                console.error("Review error:", err);
                alert(err.message);
              }
            }}
          >
            Submit Review
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
