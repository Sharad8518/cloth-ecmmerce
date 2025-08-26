import React, { useState } from "react";
import { Nav, Badge } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaPills,
  FaCashRegister,
  FaUsers,
  FaTruck,
  FaChartBar,
  FaCog,
  FaBell,
  FaQuestionCircle,
  FaSignOutAlt,
  FaChevronRight,
} from "react-icons/fa";
import { PiFlagBannerFold } from "react-icons/pi";
import styles from "./css/Sidebar.module.css";

const Sidebar = () => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <div className={styles.sidebar}>
      <h4 className={styles.title}>House of Ziba</h4>
      <Nav className="flex-column">
        <Nav.Link
          as={Link}
          to="/dashboard"
          className={`${styles.link} ${
            location.pathname === "/dashboard" ? styles.active : ""
          }`}
        >
          <FaTachometerAlt /> <span className={styles.label}>Dashboard</span>
        </Nav.Link>

        {/* Product Dropdown */}
        <div className={styles.link} onClick={() => toggleDropdown("product")}>
          <FaPills /> <span className={styles.label}>Product</span>
          <FaChevronRight
            className={`${styles.arrow} ${
              openDropdown === "product" ? styles.arrowOpen : ""
            }`}
          />
        </div>
        <div
          className={`${styles.dropdown} ${
            openDropdown === "product" ? styles.showDropdown : ""
          }`}
        >
          <Link to="/dashboard/addProduct" className={styles.dropdownLink}>
            Add Product
          </Link>
          <Link to="/dashboard/AllProduct" className={styles.dropdownLink}>
            View Products
          </Link>
        </div>

        {/* Manage Navbar Dropdown */}
        <div className={styles.link} onClick={() => toggleDropdown("navbar")}>
          <FaPills /> <span className={styles.label}>Manage Navbar</span>
          <FaChevronRight
            className={`${styles.arrow} ${
              openDropdown === "navbar" ? styles.arrowOpen : ""
            }`}
          />
        </div>
        <div
          className={`${styles.dropdown} ${
            openDropdown === "navbar" ? styles.showDropdown : ""
          }`}
        >
          <Link to="/dashboard/hierarchyManager" className={styles.dropdownLink}>
            Navbar Manager
          </Link>
         
        </div>
        

        <Nav.Link
          as={Link}
          to="/dashboard/Orders"
          className={`${styles.link} ${
            location.pathname === "/dashboard/Orders" ? styles.active : ""
          }`}
        >
          <FaCashRegister />{" "}
          <span className={styles.label}>Sales & Billing</span>
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/dashboard/purchases"
          className={`${styles.link} ${
            location.pathname === "/dashboard/purchases" ? styles.active : ""
          }`}
        >
          <FaTruck /> <span className={styles.label}>Purchases</span>
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/dashboard/customers"
          className={`${styles.link} ${
            location.pathname === "/dashboard/customers" ? styles.active : ""
          }`}
        >
          <FaUsers /> <span className={styles.label}>Customers</span>
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/dashboard/BannerManager"
          className={`${styles.link} ${
            location.pathname === "/dashboard/BannerManager" ? styles.active : ""
          }`}
        >
          <PiFlagBannerFold /> <span className={styles.label}>Banner</span>
        </Nav.Link>


        <Nav.Link
          as={Link}
          to="/dashboard/suppliers"
          className={`${styles.link} ${
            location.pathname === "/dashboard/suppliers" ? styles.active : ""
          }`}
        >
          <FaTruck /> <span className={styles.label}>Suppliers</span>
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/dashboard/reports"
          className={`${styles.link} ${
            location.pathname === "/dashboard/reports" ? styles.active : ""
          }`}
        >
          <FaChartBar /> <span className={styles.label}>Reports</span>
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/dashboard/settings"
          className={`${styles.link} ${
            location.pathname === "/dashboard/settings" ? styles.active : ""
          }`}
        >
          <FaCog /> <span className={styles.label}>Settings</span>
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/dashboard/notifications"
          className={`${styles.link} ${
            location.pathname === "/dashboard/notifications"
              ? styles.active
              : ""
          }`}
        >
          <FaBell /> <span className={styles.label}>Notifications</span>
          <Badge bg="danger" pill className={styles.badge}>
            3
          </Badge>
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/dashboard/help"
          className={`${styles.link} ${
            location.pathname === "/dashboard/help" ? styles.active : ""
          }`}
        >
          <FaQuestionCircle />{" "}
          <span className={styles.label}>Help / Support</span>
        </Nav.Link>

        <Nav.Link as={Link} to="/logout" className={styles.link}>
          <FaSignOutAlt /> <span className={styles.label}>Logout</span>
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
