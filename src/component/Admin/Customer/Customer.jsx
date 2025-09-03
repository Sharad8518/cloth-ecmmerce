import React, { useEffect, useState } from "react";
import {
  Table,
  Spinner,
  Alert,
  Pagination,
  Container,
  Card,
  Badge,
  Button,
  Modal,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { getAllUser } from "../../api/admin/userApi";

export default function Customer() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // filters
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    state: "",
    hasPurchased: "",
    lastLogin: "",
  });

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [page]);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllUser({
        page,
        limit: 5,
        ...filters,
      });
      setUsers(res.data);
      setTotalPages(res.pagination.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyFilters = () => {
    setPage(1);
    fetchUsers();
  };

  // Generate Bootstrap pagination
  const renderPagination = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === page}
          onClick={() => setPage(number)}
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
    <Container className="mt-4">
      <h2 className="mb-4" style={{ fontSize: 16 }}>
        👥 Customers
      </h2>

      {/* Filters */}
      <Card className="mb-3">
        <Card.Body>
          <Row className="g-3">
            <Col md={3}>
              <Form.Group>
                <Form.Label style={{ fontSize: 13 }}>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={filters.startDate}
                  onChange={(e) =>
                    handleFilterChange("startDate", e.target.value)
                  }
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Label style={{ fontSize: 13 }}>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => handleFilterChange("endDate", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label style={{ fontSize: 13 }}>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter state"
                  value={filters.state}
                  onChange={(e) => handleFilterChange("state", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label style={{ fontSize: 13 }}>Purchase</Form.Label>
                <Form.Select
                  value={filters.hasPurchased}
                  onChange={(e) =>
                    handleFilterChange("hasPurchased", e.target.value)
                  }
                >
                  <option value="">All</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group>
                <Form.Label style={{ fontSize: 13 }}>Last Login After</Form.Label>
                <Form.Control
                  type="date"
                  value={filters.lastLogin}
                  onChange={(e) =>
                    handleFilterChange("lastLogin", e.target.value)
                  }
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3 d-flex justify-content-end">
            <Button size="sm" variant="secondary" onClick={() => setFilters({
              startDate: "",
              endDate: "",
              state: "",
              hasPurchased: "",
              lastLogin: "",
            })}>
              Reset
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={handleApplyFilters}
              style={{ marginLeft: 10 }}
            >
              Apply
            </Button>
          </div>
        </Card.Body>
      </Card>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" />
          <div className="mt-2">Loading users...</div>
        </div>
      ) : (
        <Card>
          <Card.Body>
            <Table striped bordered hover responsive style={{ fontSize: 13 }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Created</th>
                  <th>Name</th>
                  <th>State</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Account</th>
                  <th>Purchase</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Select</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="13" className="text-center text-muted">
                      No customers found
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => {
                    const defaultAddress = user.addresses?.find(
                      (a) => a.isDefault
                    );
                    return (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>{user?.name || "N/A"}</td>
                        <td>{user?.addresses[0]?.state || "N/A"}</td>
                        <td>{user.email}</td>
                        <td>{user.phone || "-"}</td>
                        <td>{defaultAddress?.city || "-"}</td>
                        <td>
                          <Badge bg="info">{user.accountType}</Badge>
                        </td>
                        <td>
                          {user?.hasPurchased ? (
                            <>
                              <span>Yes</span>
                              <br />
                              <span>
                                Purchase :{" "}
                                {user?.orders?.reduce(
                                  (sum, it) => sum + (it.totalAmount || 0),
                                  0
                                )}{" "}
                                /-
                              </span>
                            </>
                          ) : (
                            <span>No</span>
                          )}
                        </td>
                        <td>
                          {user.isBlocked ? (
                            <Badge bg="danger">Blocked</Badge>
                          ) : user.isActive ? (
                            <Badge bg="success">Active</Badge>
                          ) : (
                            <Badge bg="secondary">Inactive</Badge>
                          )}
                        </td>
                        <td>
                          {user.lastLoginAt
                            ? new Date(user.lastLoginAt).toLocaleDateString()
                            : "-"}
                        </td>
                        <td></td>
                        <td>
                          <div style={{ display: "flex" }}>
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => setSelectedUser(user)}
                            >
                              View
                            </Button>
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => setSelectedUser(user)}
                              style={{ marginLeft: 10 }}
                            >
                              Send Email
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </Table>

            {/* Pagination */}
            {renderPagination()}
          </Card.Body>
        </Card>
      )}

      {/* User Detail Modal */}
      {selectedUser && (
        <Modal
          show={true}
          onHide={() => setSelectedUser(null)}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{selectedUser.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <p>
              <strong>Phone:</strong> {selectedUser.phone || "N/A"}
            </p>
            <p>
              <strong>Account Type:</strong> {selectedUser.accountType}
            </p>
            <p>
              <strong>Signup Method:</strong> {selectedUser.signupMethod}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {selectedUser.isBlocked
                ? "Blocked"
                : selectedUser.isActive
                ? "Active"
                : "Inactive"}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(selectedUser.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Last Login:</strong>{" "}
              {selectedUser.lastLoginAt
                ? new Date(selectedUser.lastLoginAt).toLocaleString()
                : "Never"}
            </p>
            <hr />
            <h6>Addresses</h6>
            {selectedUser.addresses?.length > 0 ? (
              <ul>
                {selectedUser.addresses.map((addr, idx) => (
                  <li key={idx}>
                    {addr.label}: {addr.street}, {addr.city}, {addr.state} -{" "}
                    {addr.postalCode}, {addr.country}{" "}
                    {addr.isDefault && <Badge bg="success">Default</Badge>}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No addresses saved</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedUser(null)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
}
