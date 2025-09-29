import React, { useEffect, useState } from "react";
import styles from "./NewIn.module.css";
import { Pagination } from "react-bootstrap";
import NavbarMenu from "../Navbar/NavbarMenu";
import { useNavigate } from "react-router-dom";
import { productNewIn } from "../api/user/Productapi";
import loadingAnimation from "../../assets/Anim/loading.json";
import Lottie from "lottie-react";
import ProductGrid from "../layout/ProductGrid/ProductGrid";
export default function NewIn() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20; // you can change this

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewIn = async () => {
      try {
        setLoading(true);
        const res = await productNewIn({ page, limit });
        setProducts(res?.products);
        setTotalPages(res?.pages);
      } catch (err) {
        console.error("❌ Error fetching new in products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNewIn();
  }, [page]);

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
    <div>
      <NavbarMenu />
      <br />
      <br />
      <br /> <br />
      <br />
      <br />
      <h2 className="mb-4 text-center" style={{ fontWeight: "700" }}>
        ✨ New In Products
      </h2>
      <div>
        {products && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ProductGrid products={products} />
          </div>
        )}

        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            {[...Array(page).keys()].map((x) => (
              <Pagination.Item
                key={x + 1}
                active={x + 1 === page}
                onClick={() => setPage(x + 1)}
              >
                {x + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
      </div>
    </div>
  );
}
