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
} from "react-bootstrap";
import { getAllUser } from "../../api/admin/userApi";

export default function Customer() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getAllUser({ page, limit: 5 });
        setUsers(res.data);
        setTotalPages(res.pagination.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page]);

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
      <h2 className="mb-4" style={{fontSize:16}}>👥 Customers</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" role="status" />
          <div className="mt-2">Loading users...</div>
        </div>
      ) : (
        <Card>
          <Card.Body>
            <Table striped bordered hover responsive style={{fontSize:13}}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>Account</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center text-muted">
                      No customers found
                    </td>
                  </tr>
                ) : (
                  users.map((user) => {
                    const defaultAddress = user.addresses?.find(
                      (a) => a.isDefault
                    );
                    return (
                      <tr key={user._id}>
                        <td>{user.name || "N/A"}</td>
                        <td>{user.email}</td>
                        <td>{user.phone || "-"}</td>
                        <td>{defaultAddress?.city || "-"}</td>
                        <td>
                          <Badge bg="info">{user.accountType}</Badge>
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
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => setSelectedUser(user)}
                          >
                            View
                          </Button>
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
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone || "N/A"}</p>
            <p><strong>Account Type:</strong> {selectedUser.accountType}</p>
            <p><strong>Signup Method:</strong> {selectedUser.signupMethod}</p>
            <p>
              <strong>Status:</strong>{" "}
              {selectedUser.isBlocked ? "Blocked" : selectedUser.isActive ? "Active" : "Inactive"}
            </p>
            <p><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
            <p><strong>Last Login:</strong> {selectedUser.lastLoginAt ? new Date(selectedUser.lastLoginAt).toLocaleString() : "Never"}</p>
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
