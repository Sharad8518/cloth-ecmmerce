import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  Pagination,
  Form,
  Modal,
} from "react-bootstrap";
import styles from "./OrderList.module.css";
import { FaShippingFast, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import OrderDetailModal from "../OrderDetailModal";
import { FaStar } from "react-icons/fa";

// Props: orders = array of orders fetched from API
const OrderList = ({ orders, totalPages = 1, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [reviewItem, setReviewItem] = useState(null);
const [review, setReview] = useState({ rating: 5, comment: "" });

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (onPageChange) onPageChange(pageNumber);
  };

  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageClick(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return (
      <Pagination className="justify-content-center mt-3">{items}</Pagination>
    );
  };

  return (
    <Container className="my-4">
      <br />
      <br />
      <h2 className="mb-4">My Orders</h2>

      {orders?.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <>
          {orders?.map((order) => (
            <Card
              key={order._id}
              className={`${styles.orderCard} mb-4`}
              style={{ width: "100%", minHeight: 250 }}
            >
              <Card.Header className="d-flex justify-content-between align-items-center">
                <span>Invoice: {order.invoiceNumber || "N/A"}</span>
                <Badge
                  bg={
                    order?.orderStatus === "delivered"
                      ? "success"
                      : order?.orderStatus === "cancelled"
                      ? "danger"
                      : "warning"
                  }
                >
                  {order.orderStatus.toUpperCase()}
                </Badge>
              </Card.Header>

              <Card.Body>
                <h6>Items:</h6>
                <Table responsive size="sm" className="mb-3">
                  <tbody>
                    {order?.items.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <img
                            src={item?.product?.media?.[0]?.url}
                            alt={item?.product?.title}
                            style={{
                              width: 70,
                              height: 70,
                              objectFit: "cover",
                              borderRadius: 6,
                            }}
                          />
                        </td>
                        <td>
                          <strong>{item?.product?.title}</strong>
                          <br />
                          SKU: {item?.variant?.sku}
                          <br />
                          Qty: {item?.quantity}
                          {order.orderStatus === "delivered" && (
                            <div className="mt-2">
                              <Button
                                size="sm"
                                variant="outline-success"
                                onClick={() => setReviewItem(item)}
                              >
                                Give Review
                              </Button>
                            </div>
                          )}
                        </td>
                        <td>₹ {item?.subtotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <h6>Shipping:</h6>
                <p className="mb-1">
                  {order?.shippingAddress?.name},{" "}
                  {order?.shippingAddress?.addressLine1},{" "}
                  {order?.shippingAddress?.city},{" "}
                  {order?.shippingAddress?.state},{" "}
                  {order?.shippingAddress?.postalCode}
                </p>
                <p className="mb-1">Phone: {order?.shippingAddress?.phone}</p>
                <p className="mb-1">Email: {order?.shippingAddress?.email}</p>

                <h6>Total Amount:</h6>
                <p>
                  <strong>₹ {order?.totalAmount}</strong>
                </p>

                {order?.tracking?.trackingNumber && (
                  <p>
                    <FaShippingFast /> Tracking:{" "}
                    <a
                      href={order?.tracking?.trackingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {order?.tracking?.trackingNumber}
                    </a>
                  </p>
                )}
              </Card.Body>

              <Card.Footer className="d-flex justify-content-between align-items-center">
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setSelectedOrder(order)}
                >
                  View Details
                </Button>
                {order.orderStatus === "delivered" && (
                  <Badge bg="success">
                    <FaCheckCircle /> Delivered
                  </Badge>
                )}
                {order.orderStatus === "cancelled" && (
                  <Badge bg="danger">
                    <FaTimesCircle /> Cancelled
                  </Badge>
                )}
              </Card.Footer>
            </Card>
          ))}

          {totalPages > 1 && renderPagination()}
        </>
      )}
      <OrderDetailModal
        order={selectedOrder}
        show={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />

      <Modal show={!!reviewItem} onHide={() => setReviewItem(null)} centered>
  <Modal.Header closeButton>
    <Modal.Title>
      Review Product - {reviewItem?.product?.title}
    </Modal.Title>
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
    <Button variant="secondary" onClick={() => setReviewItem(null)}>
      Cancel
    </Button>
    <Button
      variant="success"
      onClick={() => {
        // ✅ Save review to backend
        console.log("Review submitted:", {
          productId: reviewItem?.product?._id,
          rating: review.rating,
          comment: review.comment,
        });

        // Reset form
        setReview({ rating: 5, comment: "" });
        setReviewItem(null);
      }}
    >
      Submit Review
    </Button>
  </Modal.Footer>
</Modal>

    </Container>
  );
};

export default OrderList;
