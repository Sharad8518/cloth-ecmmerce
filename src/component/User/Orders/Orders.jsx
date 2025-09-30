import React, { useEffect, useState } from "react";
import NavbarMenu from "../../Navbar/NavbarMenu";
import { getUserOrder } from "../../api/user/orderApi";
import { Container, Spinner, Pagination } from "react-bootstrap";
import OrderList from "./OrdersList/OrderList";
import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/Anim/loading.json";

export default function Orders() {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(6); // Orders per page
  const [totalPages, setTotalPages] = useState(1);

  // Fetch orders from API
  const fetchOrders = async (pageNumber = 1) => {
    try {
      setLoading(true);
      const response = await getUserOrder({ page: pageNumber, limit });
      if (response.success) {
        setOrderList(response.orders);
        setTotalPages(response.totalPages || 1);
        setPage(pageNumber);
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, []);

  // Handle pagination click
  const handlePageChange = (pageNumber) => {
    fetchOrders(pageNumber);
  };

  // Render pagination component
  const renderPagination = () => {
    if (totalPages <= 1) return null; // No need if only one page
    const items = [];
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
    return <Pagination>{items}</Pagination>;
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
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
    ); // or a spinner component
  }

  return (
    <>
      <NavbarMenu />
      <br />
      <br />
      <br />
      <Container className="my-4">
        <OrderList orders={orderList} />
        <div className="d-flex justify-content-center mt-3">
          {renderPagination()}
        </div>
      </Container>
    </>
  );
}
