import React ,{useState,useEffect}from 'react'
import { Container, Row, Col, Card, Table, Badge, Button} from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Orders from '../../User/Orders/Orders';
import AdminOrders from '../Sales&Biiling/AdminOrders/AdminOrders';
import {getMonthlySales, getPieChartData, getLineChartData,getRemainingStock,getTotalStock} from "../../api/admin/orderApi"
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

    const [monthlySales, setMonthlySales] = useState(null);
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [stock,setStock] =useState(null)
  const [productTotal,setProductTotal] =useState(null)

   const formatIndianCurrency = (num) => {
  if (num === null || num === undefined) return "₹0";

  // Convert to number (in case it comes as string)
  const value = Number(num);

  if (value >= 10000000) {
    return `₹ ${(value / 10000000).toFixed(2)} Cr`; // Crores
  } else if (value >= 100000) {
    return `₹ ${(value / 100000).toFixed(2)} Lakh`; // Lakhs
  } else if (value >= 1000) {
    return `₹ ${(value / 1000).toFixed(2)} K`; // Thousands
  }
  return `₹ ${value}`;
};

  useEffect(() => {
    (async () => {
      try {
        const sales = await getMonthlySales();
        setMonthlySales(sales);

        const pie = await getPieChartData();
        setPieData(pie.chartData);

        const line = await getLineChartData();
        setLineData(line.chartData);

        const stock = await getRemainingStock()
           setStock(stock)

         const productTotal = await getTotalStock()
           setProductTotal(productTotal)

      } catch (err) {
        console.error("Dashboard fetch error:", err.message);
      }
    })();
  }, []);

  console.log('productTotal',productTotal)

  return (
    <Container className="mt-4">
      <h2 className="mb-4 fw-semibold">Cloth Management Dashboard</h2>

      {/* Summary Cards */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Total Products</Card.Title>
              <Card.Text className="display-6 text-primary">{productTotal?.totalStock}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm">
          <Card.Body>
  <Card.Title>Current Month</Card.Title>
  <Card.Text className="display-6 text-success">
     { formatIndianCurrency(monthlySales?.totalSales || 0)}
  </Card.Text>
  <Card.Text className="text-muted">
    Orders: {monthlySales?.totalOrders || 0}
  </Card.Text>
</Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Out of Stock</Card.Title>
              <Card.Text className="display-6 text-danger">{stock?.totalSold}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Low Stock Alerts</Card.Title>
              <Card.Text className="display-6 text-warning">{stock?.totalStock}</Card.Text>
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
                 <LineChart width={500} height={300} data={lineData}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="netRevenue" stroke="#82ca9d" />
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
                  <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={100} label>
          {pieData?.map((entry, index) => (
            <Cell key={index} fill={["#0088FE", "#00C49F", "#FFBB28"][index % 3]} />
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
      {/* <Card className="shadow-sm mb-4">
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
      </Card> */}
         <AdminOrders/>
      
    </Container>
  )
}
