import React from 'react'
import { Container, Row, Col, Card, Table, Badge, Button} from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const salesData = [
  { date: "Mon", sales: 1200 },
  { date: "Tue", sales: 2100 },
  { date: "Wed", sales: 800 },
  { date: "Thu", sales: 1600 },
  { date: "Fri", sales: 900 },
  { date: "Sat", sales: 1700 },
  { date: "Sun", sales: 1400 },
];

const stockData = [
  { name: "T-Shirts", value: 400 },
  { name: "Jeans", value: 300 },
  { name: "Jackets", value: 200 },
  { name: "Shoes", value: 150 },
  { name: "Accessories", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

export default function DashboardView() {
  return (
    <Container className="mt-4">
      <h2 className="mb-4 fw-semibold">Cloth Management Dashboard</h2>

      {/* Summary Cards */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total Products</Card.Title>
              <Card.Text className="display-6 text-primary">1,560</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Today's Sales</Card.Title>
              <Card.Text className="display-6 text-success">₹18,900</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Out of Stock</Card.Title>
              <Card.Text className="display-6 text-danger">24</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Low Stock Alerts</Card.Title>
              <Card.Text className="display-6 text-warning">12</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row className="g-4 mb-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="fw-bold">Sales Trend (This Week)</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid stroke="#f5f5f5" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Header className="fw-bold">Stock Distribution</Card.Header>
            <Card.Body>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={stockData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {stockData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Orders */}
      <Card className="shadow-sm mb-4">
        <Card.Header className="fw-bold">Recent Orders</Card.Header>
        <Card.Body>
          <Table hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>ORD1234</td>
                <td>John Doe</td>
                <td>3</td>
                <td>₹2,450</td>
                <td>
                  <Badge bg="success">Delivered</Badge>
                </td>
                <td>
                  <Button size="sm" variant="outline-primary">
                    View
                  </Button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>ORD1235</td>
                <td>Jane Smith</td>
                <td>5</td>
                <td>₹3,800</td>
                <td>
                  <Badge bg="warning">Pending</Badge>
                </td>
                <td>
                  <Button size="sm" variant="outline-primary">
                    View
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  )
}
