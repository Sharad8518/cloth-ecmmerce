import React, { useEffect, useState, useRef } from "react";
import {
  Table,
  Badge,
  Button,
  Spinner,
  Container,
  Card,
  Pagination,
  ListGroup,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import { getAllOrders, updateOrdersStatus } from "../../../api/admin/orderApi";
import PrintableOrder from "../PrintableOrder/PrintableOrder";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // Filter states
  const [search, setSearch] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  // Update order
  const [updateOrder, setUpdateOrder] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Print handling
  const [printReady, setPrintReady] = useState(false);
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    
  });

  // Fetch orders
  const fetchOrders = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const response = await getAllOrders({
        page: pageNumber,
        limit,
        search,
        orderNumber,
        orderStatus,
      });
      if (response.success) {
        setOrders(response.orders);
        setTotalPages(response.totalPages || 1);
        setPage(pageNumber);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
    // eslint-disable-next-line
  }, []);

  // Pagination
  const handlePageChange = (pageNumber) => fetchOrders(pageNumber);
  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return <Pagination className="justify-content-center mt-3">{items}</Pagination>;
  };

  // Modals
  const handleView = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };
  const handleClose = () => {
    setSelectedOrder(null);
    setShowModal(false);
  };
  const handleUpdate = (order) => {
    setUpdateOrder(order);
    setShowUpdateModal(true);
  };
  const handleUpdateClose = () => {
    setUpdateOrder(null);
    setShowUpdateModal(false);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchOrders(1); // reset to page 1
  };

  // Print handling
  const handlePrintOrder = (order) => {
    setSelectedOrder(order);
    setPrintReady(true);
    
  };

  useEffect(() => {
    if (printReady && selectedOrder && contentRef.current) {
      handlePrint();
      setPrintReady(false); // reset
    }
  }, [printReady, selectedOrder]);

  return (
    <Container className="my-4">
      <h2 className="mb-4" style={{ fontSize: 18 }}>All Orders</h2>

      {/* Filters */}
      <Card className="mb-3 p-3 shadow-sm">
        <Form onSubmit={handleFilterSubmit}>
          <Row>
            <Col md={4}>
              <Form.Control
                type="text"
                placeholder="Search by customer name/email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Control
                type="text"
                placeholder="Order Number"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
              />
            </Col>
            <Col md={3}>
              <Form.Select
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="Handcraft In Progress">Handcraft In Progress</option>
                <option value="Being Tailored For You">Being Tailored For You</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
                <option value="returned">Returned</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Button type="submit" variant="primary" className="w-100">Filter</Button>
            </Col>
          </Row>
        </Form>
      </Card>

      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
      ) : (
        <Card className="shadow-sm">
          <Card.Body>
            <Table hover responsive style={{ fontSize: 13 }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>State</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment Method</th>
                  <th>Payment Status</th>
                  <th>Order Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="text-center">No orders found.</td>
                  </tr>
                ) : (
                  orders.map((order, idx) => (
                    <tr key={order._id}>
                      <td>{idx + 1 + (page - 1) * limit}</td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>{order.invoiceNumber || order._id}</td>
                      <td>
                        {order.user?.name} <br />
                        <small>{order.user?.email}</small>
                      </td>
                      <td><small>{order.shippingAddress?.state}</small></td>
                      <td>{order.items?.length}</td>
                      <td>₹ {order.totalAmount}</td>
                      <td>{order.payment?.method}</td>
                      <td>
                        {order.payment?.status === "created" ? (
                          <Badge bg="danger">Failed</Badge>
                        ) : (
                          <Badge
                            bg={
                              order.payment?.status === "paid" ? "success" :
                              order.payment?.status === "pending" ? "warning" :
                              "danger"
                            }
                          >
                            {order.payment?.status.toUpperCase()}
                          </Badge>
                        )}
                      </td>
                      <td>
                        <Badge
                          bg={
                            order.orderStatus === "delivered" ? "success" :
                            order.orderStatus === "shipped" ? "primary" :
                            order.orderStatus === "processing" ? "info" :
                            order.orderStatus === "pending" ? "warning" :
                            order.orderStatus === "cancelled" ? "danger" :
                            order.orderStatus === "returned" ? "secondary" :
                            "dark"
                          }
                        >
                          {order.orderStatus.toUpperCase()}
                        </Badge>
                      </td>
                      <td>
                        <Button size="sm" variant="outline-primary" onClick={() => handleView(order)}>View</Button>{" "}
                        <Button size="sm" variant="outline-secondary" onClick={() => handleUpdate(order)}>Update</Button>{" "}
                        <Button size="sm" variant="outline-success" onClick={() => handlePrintOrder(order)}>Print</Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
            {totalPages > 1 && renderPagination()}
          </Card.Body>
        </Card>
      )}

      {/* Order Details Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && (
            <>
              <h5>Order ID: {selectedOrder.invoiceNumber || selectedOrder._id}</h5>
              <p><strong>Placed At:</strong> {new Date(selectedOrder.placedAt).toLocaleString()}</p>
              <hr />

              <h6>Customer Details</h6>
              <p>
                <strong>{selectedOrder.shippingAddress?.name}</strong> <br />
                {selectedOrder.shippingAddress?.email} <br />
                {selectedOrder.shippingAddress?.phone} <br />
                {selectedOrder.shippingAddress?.addressLine1}{" "}
                {selectedOrder.shippingAddress?.addressLine2 && <> , {selectedOrder.shippingAddress.addressLine2}</>} <br />
                {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.postalCode}, {selectedOrder.shippingAddress?.country}
              </p>

              <hr />
              <h6>Products</h6>
              <ListGroup>
                {selectedOrder.items?.map((item, idx) => (
                  <ListGroup.Item key={idx} className="d-flex align-items-center">
                    {item.product?.media?.length > 0 && (
                      <img src={item.product.media[0].url} alt={item.product?.name} style={{ width: 60, height: 60, objectFit: "contain", marginRight: 10, borderRadius: 6 }} />
                    )}
                    <div>
                      <strong>{item.product?.title}</strong> <br />
                      {item.variant?.attributes?.map((attr, i) => (
                        <small key={i} style={{ fontSize: 12 }}>{attr.name}: {attr.value} </small>
                      ))}
                      {item.variant?.attributes?.length > 0 && <br />}

                      {item.variant?.paddingDetails && (
                        <div style={{ fontSize: 13, fontWeight: "bold", backgroundColor: "#fff3cd", color: "#856404", padding: "6px 8px", borderRadius: 6, marginTop: 4, display: "inline-block" }}>
                          Bust: {item.variant.paddingDetails.bust} | Waist: {item.variant.paddingDetails.waist} | Length: {item.variant.paddingDetails.length} | Height: {item.variant.paddingDetails.height} | Hip: {item.variant.paddingDetails.hip} | Unit: {item.variant.paddingDetails.unit}
                        </div>
                      )}
                      <br />
                      Qty: {item.quantity} × ₹{item.variant?.price} = ₹{item.subtotal}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <hr />
              <h6>Order Summary</h6>
              <p>
                <strong>Items:</strong> {selectedOrder.totalItems} <br />
                <strong>Total MRP:</strong> ₹ {selectedOrder.totalMrp} <br />
                <strong>Discount:</strong> ₹ {selectedOrder.totalDiscount} <br />
                <strong>Shipping Fee:</strong> ₹ {selectedOrder.shippingFee} <br />
                <strong>Total Price:</strong> ₹ {selectedOrder.totalAmount} <br />
                <strong>Payment:</strong> {selectedOrder.payment?.method} -{" "}
                <Badge bg={selectedOrder.payment?.status === "paid" ? "success" : selectedOrder.payment?.status === "pending" ? "warning" : "danger"}>
                  {selectedOrder.payment?.status.toUpperCase()}
                </Badge>
                <br />
                <strong>Order Status:</strong>{" "}
                <Badge bg={selectedOrder.orderStatus === "delivered" ? "success" : selectedOrder.orderStatus === "cancelled" ? "danger" : "info"}>
                  {selectedOrder.orderStatus.toUpperCase()}
                </Badge>
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Update Order Modal */}
      <Modal show={showUpdateModal} onHide={handleUpdateClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Order Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {updateOrder && (
            <Form>
              <Form.Group>
                <Form.Label>Order ID</Form.Label>
                <Form.Control type="text" value={updateOrder.invoiceNumber || updateOrder._id} disabled />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Current Status</Form.Label>
                <Form.Select
                  value={updateOrder.orderStatus}
                  onChange={(e) => setUpdateOrder({ ...updateOrder, orderStatus: e.target.value })}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="handcraft_in_progress">Handcraft In Progress</option>
                  <option value="being_tailored_for_you">Being Tailored For You</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="returned">Returned</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUpdateClose}>Close</Button>
          <Button
            variant="primary"
            onClick={async () => {
              try {
                await updateOrdersStatus(updateOrder._id, updateOrder.orderStatus);
                alert("Order status updated successfully!");
                handleUpdateClose();
                window.location.reload();
              } catch (error) {
                console.error(error);
                alert("Failed to update order status.");
              }
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Hidden printable component */}
      {selectedOrder &&  (
        <div style={{ display: "none" }}>
          <PrintableOrder ref={contentRef} order={selectedOrder} />
        </div>
      )}
    </Container>
  );
}
