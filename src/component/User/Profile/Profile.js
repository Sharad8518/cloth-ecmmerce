import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, ListGroup, Container, Row, Col, Button, Nav } from "react-bootstrap";
import { FaBox, FaHeart, FaCog, FaSignOutAlt, FaUser } from "react-icons/fa";
import { getProfile } from "../../api/user/authApi"; // your API function
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
        console.error("Error fetching profile:", err);
        alert("Unable to fetch profile");
      }
    };

    fetchProfile();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
      <Row>
        {/* Sidebar */}
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <div className="rounded-circle bg-light d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: 80, height: 80 }}>
                <FaUser className="text-secondary" size={36} />
              </div>
              <h5 className="mb-1">{userDetails?.name}</h5>
              <small className="text-muted">{userDetails?.email}</small>
            </Card.Body>

            <ListGroup variant="flush">
              <ListGroup.Item action onClick={() => navigate("/orders")}>
                <FaBox className="me-2" /> Orders
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => navigate("/favourites")}>
                <FaHeart className="me-2" /> Favorites
              </ListGroup.Item>
              <ListGroup.Item action onClick={() => navigate("/profile/settings")}>
                <FaCog className="me-2" /> Settings
              </ListGroup.Item>
              <ListGroup.Item action className="text-danger" onClick={handleLogout}>
                <FaSignOutAlt className="me-2" /> Logout
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        {/* Main Content */}
        <Col md={9}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="mb-3">Profile</h3>
              <p>
                <strong>Selected Address:</strong>{" "}
                {selectedAddress
                  ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "No default address selected"}
              </p>
              <Button variant="primary" onClick={() => navigate("/profile/settings")}>
                Manage Addresses
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Profile;
