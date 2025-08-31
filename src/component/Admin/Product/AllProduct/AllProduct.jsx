import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Badge,
  Button,
  Spinner,
  Pagination,
  Modal,
  Form, Row, Col,
  Card
} from "react-bootstrap";
import { getProducts } from "../../../api/admin/productApi";
import { useNavigate } from "react-router-dom";
import SaleModal from "../../Navbar/SaleModal/SaleModal";

const ProductRow = ({
  product,
  index,
  page,
  limit,
  onEdit,
  onDelete,
  onViewMore,
}) => {
  const navigate = useNavigate(); // <-- add this
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
          {product.onSale ? (
            <Badge bg="danger" style={{ padding: 10 }}>
              Yes
            </Badge>
          ) : (
            <Badge bg="secondary" style={{ padding: 10 }}>
              No
            </Badge>
          )}
        </td>
        <td>
          <Badge
            style={{ padding: 10 }}
            bg={product.status === "ACTIVE" ? "success" : "warning"}
          >
            {product.status || "-"}
          </Badge>
        </td>
        <td>
          <Badge
            style={{ padding: 10 }}
            bg={product.inStock ? "success" : "secondary"}
          >
            {product.inStock ? "Yes" : "No"}
          </Badge>
        </td>
        <td className="d-flex flex-wrap gap-1">
          <Button variant="info" size="sm" onClick={() => onEdit(product._id)}>
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(product._id)}
          >
            Delete
          </Button>
          <Button
            variant="secondary"
            size="sm"
              onClick={() =>
             navigate("/dashboard/FrequentlyBought", { state: { productId: product._id,productDetails:product } })
         }
          >
            Frequently Bought
          </Button>
          <Button
            variant="warning"
            size="sm"
            onClick={() => navigate("/dashboard/SimilarProduct",{ state: { productId: product._id,productDetails:product } })}
          >
            Similar Products
          </Button>
          <Button
            variant="dark"
            size="sm"
            onClick={() => {
              setSaleProduct(product);
              setShowSaleModal(true);
            }}
          >
            Sale on Products
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => onViewMore(product)}
          >
            View More
          </Button>
        </td>
      </tr>
      <SaleModal
        product={saleProduct}
        show={showSaleModal}
        onHide={() => setShowSaleModal(false)}
        onSave={(data) => console.log("Save sale data:", saleProduct._id, data)}
      />
    </>
  );
};

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
            <strong>On Sale:</strong> {product.onSale ? "Yes" : "No"}
          </p>
          <p>
            <strong>Status:</strong> {product.status}
          </p>
          <p>
            <strong>In Stock:</strong> {product.inStock ? "Yes" : "No"}
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

export default function AllProductAdmin() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
   const [search, setSearch] = useState("");
  const [title, setTitle] = useState("");
  const [itemNumber, setItemNumber] = useState("");
  const [status, setStatus] = useState("");
  const limit = 20;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts({ page, limit,search, title, itemNumber, status });
        setProducts(data.products || []);
        setPages(data.pages || 1);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page,search, title, itemNumber, status]);

  const handleEdit = (id) => console.log("Edit product:", id);
  const handleDelete = (id) => console.log("Delete product:", id);
  const handleViewMore = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
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
          <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
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
                <th>In Stock</th>
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
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onViewMore={handleViewMore}
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
        </>
      )}
    </Container>
  );
}
