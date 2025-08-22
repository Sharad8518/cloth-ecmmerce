import React from 'react';
import { Container, Row, Col, Nav, Card, Badge,NavDropdown  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTachometerAlt, FaPills, FaCashRegister, FaUsers, FaTruck, FaChartBar, FaCog, FaBell, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa';
import { Outlet, Link } from "react-router-dom";
import Sidebar from './Sidebar';



export default function AdminDashboard() {
  return (
     <Container fluid className="bg-light" style={{ minHeight: '100vh' }}>
      <Row>
        <Col md={2} className="p-0">
          <Sidebar />
        </Col>
        <Col md={{ span: 10, offset: 2 }} className="p-4">
        <Outlet />
        </Col>
      </Row>
    </Container>
  )
}