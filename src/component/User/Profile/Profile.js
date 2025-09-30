import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, ListGroup, Container, Row, Col, Button, Nav,Modal,Form } from "react-bootstrap";
import { FaBox, FaHeart, FaCog, FaSignOutAlt, FaUser,FaEdit  } from "react-icons/fa";
import { getProfile, updateProfile } from "../../api/user/authApi"; // your API function
import NavbarMenu from "../../Navbar/NavbarMenu";
import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/Anim/loading.json";
import MobileBackButton from "../../layout/BackButton/MobileBackButton";
import styles from "./Profile.module.css"
const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const token = localStorage.getItem("token");
   const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "" });
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        if (res.status) {
          setUserDetails(res.data);

          const defaultAddr = res.data.addresses?.find((a) => a.isDefault);
          if (defaultAddr) {
            setSelectedAddress(defaultAddr);
          }
        } else {
          alert(res.message || "Failed to load profile");
        }
      } catch (err) {
        alert("Unable to fetch profile");
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
   const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };
   const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const res = await updateProfile(editForm);
      if (res.status) {
        setUserDetails(res.data);
        setShowEditModal(false);
      } else {
        alert(res.message || "Failed to update profile");
      }
    } catch (err) {
      alert("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  if (!userDetails) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection:"column",
          alignItems: "center",
          background: "#fff", // optional
        }}
      >
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          autoplay={true}
          style={{ width: 200, height: 200 }}
        />
           <p style={{ marginTop: "1rem", fontSize: "18px", color: "#333" }}>
          Please wait, loading...
        </p>
      </div> 
    );
  }

  return (
    <>
    <NavbarMenu/>
   <br/>
    <Container fluid  className={styles.profileContainer}>
      <MobileBackButton/>
      <br/>
       <Row className="mt-3">
          {/* Sidebar */}
          <Col md={3}>
            <Card className="shadow-sm mb-3">
              <Card.Body className="text-center">
                <div
                  className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: 80, height: 80 }}
                >
                  <FaUser className="text-secondary" size={36} />
                </div>
                <h5 className="mb-1">{userDetails?.name}</h5>
                <small className="text-muted">{userDetails?.email}</small>
              </Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item action onClick={() => navigate("/orders", { state: { userName: userDetails?.name } })}>
                  <FaBox className="me-2" /> Orders
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => navigate("/favourites")}>
                  <FaHeart className="me-2" /> Favorites
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => setShowEditModal(true)}>
                  <FaCog className="me-2" /> Edit Profile
                </ListGroup.Item>
                <ListGroup.Item action className="text-danger" onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" /> Logout
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>

          {/* Main Content */}
          <Col md={9}>
            <Card className="shadow-sm mb-3">
              <Card.Body>
                <h3 className="mb-3">Profile Details</h3>
                <p>
                  <strong>Name:</strong> {userDetails?.name}
                </p>
                <p>
                  <strong>Email:</strong> {userDetails?.email}
                </p>
                {userDetails?.phone && <p><strong>Phone:</strong> {userDetails.phone}</p>}
                <p>
                  <strong>Selected Address:</strong>{" "}
                  {selectedAddress
                    ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}`
                    : "No default address selected"}
                </p>
                {/* <Button variant="primary" className="me-2" onClick={() => navigate("/profile/settings")}>
                  Manage Addresses
                </Button>
                <Button variant="outline-secondary" onClick={() => setShowEditModal(true)}>
                  <FaEdit className="me-1" /> Edit Profile
                </Button> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
    </Container>
     <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editForm.email}
                onChange={handleEditChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={editForm.phone}
                onChange={handleEditChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveProfile} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;
