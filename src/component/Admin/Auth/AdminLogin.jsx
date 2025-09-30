import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Form, Button, InputGroup } from "react-bootstrap";
import styles from "./css/Adminlogin.module.css";
import { isMobile, isTablet, isBrowser, browserName, osName, osVersion, deviceType } from "react-device-detect";
import { loginAdmin } from "../../api/admin/authApi";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const deviceInfo = {
    browser: browserName,
    os: osName,
    osVersion: osVersion,
    deviceType: isMobile ? "Mobile" : isTablet ? "Tablet" : "Desktop",
  };

  try {
    // Send login request with credentials + device info
    const data = await loginAdmin({ email, password, deviceInfo });

    // Save token to localStorage
    if (data.token) {
      localStorage.setItem("hfz-a_tkn_238x", data.token);
      navigate("/dashboard");
    }else{
      setError("Login failed: Invalid credentials");
      
    }
  } catch (err) {
    setError("Login failed: " + (err.response?.data?.message || err.message));
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3 className={styles.title}>Admin Login</h3>

        <Form onSubmit={handleSubmit}>
          {/* Email */}
          <Form.Group className={styles.inputGroup}>
            <Form.Label>Email</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaUser />
              </InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </InputGroup>
          </Form.Group>

          {/* Password */}
          <Form.Group className={styles.inputGroup}>
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <InputGroup.Text>
                <FaLock />
              </InputGroup.Text>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                className={styles.iconBtn}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </InputGroup>
          </Form.Group>

          {/* Submit */}
          <div className="d-grid">
            <Button
              type="submit"
              className={styles.submitBtn}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </Form>
{error && <div className={styles.error}>{error}</div>}
        <p className={styles.footer}>© {new Date().getFullYear()} Admin Panel</p>
      </div>
    </div>
  );
};

export default AdminLogin;
