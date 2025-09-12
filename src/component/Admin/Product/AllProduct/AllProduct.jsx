import React, { useState, useEffect, useRef } from "react";
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
} from "react-bootstrap";
import { editProductMedia, getProducts } from "../../../api/admin/productApi";
import { useNavigate } from "react-router-dom";
import SaleModal from "../SaleModal/SaleModal";

import {
  FaEdit,
  FaTrash,
  FaEllipsisV,
  FaEye,
  FaTags,
  FaCopy,
  FaRandom,
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
        <td>{product.title || "-"}</td>
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
const ProductModal = ({ product, show, onHide }) => (
  <Modal show={show} onHide={onHide} size="lg" centered>
    <Modal.Header closeButton>
      <Modal.Title>{product?.title || "Product Details"}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {product ? (
        <div>
          <p>
            <strong>Item Number:</strong> {product.itemNumber}
          </p>
          <p>
            <strong>Description:</strong> {product.description || "-"}
          </p>
          <p>
            <strong>Price:</strong> ₹{product.mrp}
          </p>
          <p>
            <strong>On Sale:</strong> {product.saleOn ? "Yes" : "No"}
          </p>
          <p>
            <strong>Status:</strong> {product.status}
          </p>
          <p>
            <strong>Fabric:</strong> {product.productDetail?.fabric || "-"}
          </p>
          <p>
            <strong>Work:</strong> {product.productDetail?.work || "-"}
          </p>
          <p>
            <strong>Care:</strong> {product.productDetail?.care || "-"}
          </p>
          <p>
            <strong>Pack Contains:</strong>{" "}
            {product.productDetail?.packContains || "-"}
          </p>
        </div>
      ) : (
        <p>No product selected.</p>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onHide}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

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

  const [currentEditingProduct, setCurrentEditingProduct] = useState(null);
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [selectedSaleProduct, setSelectedSaleProduct] = useState(null);

  const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [itemNumber, setItemNumber] = useState("");
  const [status, setStatus] = useState("");
  const [showModalSele, setShowModalSale] = useState(false);
  const [showSaleModal, setShowSaleModal] = useState(false);
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

  useEffect(() => {
    const fetchProducts = async () => {
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
    };
    fetchProducts();
  }, [page, search, title, itemNumber, status]);

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

  // save handler
  const handleSaveSale = async (data) => {
    console.log("Saving sale for product:", selectedSaleProduct._id, data);
    // 👉 here you call your API (e.g. updateProductSale API)
    setShowSaleModal(false);
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
            striped
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
                <th>Title</th>
                <th>Price</th>
                <th>On Sale</th>
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

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
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
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleSaveSale}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
