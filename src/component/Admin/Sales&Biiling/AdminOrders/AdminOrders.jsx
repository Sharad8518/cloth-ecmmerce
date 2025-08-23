import React, { useEffect, useState } from "react";
import { Table, Badge, Button, Spinner, Container, Card, Pagination } from "react-bootstrap";
import { getAllOrders } from "../../../api/admin/orderApi"; // Your API

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // Orders per page
  const [totalPages, setTotalPages] = useState(1);

  const fetchOrders = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const response = await getAllOrders({ page: pageNumber, limit });
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
  }, []);

  const handlePageChange = (pageNumber) => {
    fetchOrders(pageNumber);
  };

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

  return (
    <Container className="my-4">
      <h2 className="mb-4">All Orders</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Card className="shadow-sm">
          <Card.Body>
            <Table hover responsive bordered>
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Order ID</th>
                  <th>Customer</th>
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
                    <td colSpan="9" className="text-center">
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  orders.map((order, idx) => (
                    <tr key={order._id}>
                      <td>{idx + 1 + (page - 1) * limit}</td>
                      <td>{order.invoiceNumber || order._id}</td>
                      <td>
                        {order.user?.name} <br />
                        <small>{order.user?.email}</small>
                      </td>
                      <td>{order.items?.length}</td>
                      <td>₹ {order.totalAmount}</td>
                      <td>{order.payment?.method}</td>
                      <td>
                        <Badge
                          bg={
                            order.payment?.status === "paid"
                              ? "success"
                              : order.payment?.status === "pending"
                              ? "warning"
                              : "danger"
                          }
                        >
                          {order.payment?.status.toUpperCase()}
                        </Badge>
                      </td>
                      <td>
                        <Badge
                          bg={
                            order.orderStatus === "delivered"
                              ? "success"
                              : order.orderStatus === "cancelled"
                              ? "danger"
                              : "info"
                          }
                        >
                          {order.orderStatus.toUpperCase()}
                        </Badge>
                      </td>
                      <td>
                        <Button size="sm" variant="outline-primary">
                          View
                        </Button>{" "}
                        <Button size="sm" variant="outline-secondary">
                          Update
                        </Button>
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
    </Container>
  );
}
