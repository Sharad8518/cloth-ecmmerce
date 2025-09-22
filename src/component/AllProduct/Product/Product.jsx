import React, { useEffect, useState } from "react";
import ProductGrid from "../../layout/ProductGrid/ProductGrid";
import { getProducts } from "../../api/user/Productapi";
import { Pagination, Spinner, Container } from "react-bootstrap";
import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/Anim/loading.json";

// const products = [
//   {
//     image: "https://img.theloom.in/blog/wp-content/uploads/2024/03/thumb3.png",
//     title: "Product 1",
//     description: "Description of product 1.",
//     price: "$29.99"
//   },
//   {
//     image: "https://hooraindesignerwear.com/cdn/shop/articles/elevate-your-wardrobe-with-elegance-style-and-luxury-of-cross-stitch-pakistan-793587.webp?v=1721215446",
//     title: "Product 2",
//     description: "Description of product 2.",
//     price: "$19.99"
//   },
//   {
//     image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvlyBlKveQdYhEL2atlEipLYpzk56ntS7gDo36kxkgd2vCIsJvdOrMeg9FJe1AP7LnN7M&usqp=CAU",
//     title: "Product 3",
//     description: "Description of product 3.",
//     price: "$39.99"
//   },
//   {
//     image: "https://i.pinimg.com/736x/0a/1e/a4/0a1ea42e2719f4fccccdad3aae60216a.jpg",
//     title: "Product 4",
//     description: "Description of product 4.",
//     price: "$49.99"
//   },
//    {
//     image: "https://i.pinimg.com/736x/0a/1e/a4/0a1ea42e2719f4fccccdad3aae60216a.jpg",
//     title: "Product 4",
//     description: "Description of product 4.",
//     price: "$49.99"
//   },
//     {
//     image: "https://i.pinimg.com/736x/0a/1e/a4/0a1ea42e2719f4fccccdad3aae60216a.jpg",
//     title: "Product 4",
//     description: "Description of product 4.",
//     price: "$49.99"
//   },
//    {
//     image: "https://i.pinimg.com/736x/b0/4f/bf/b04fbff3976d176d88e0831d0d112a01.jpg",
//     title: "Product 4",
//     description: "Description of product 4.",
//     price: "$49.99"
//   },
//     {
//     image: "https://i.pinimg.com/736x/0a/1e/a4/0a1ea42e2719f4fccccdad3aae60216a.jpg",
//     title: "Product 4",
//     description: "Description of product 4.",
//     price: "$49.99"
//   },
//    {
//     image: "https://i.pinimg.com/736x/0a/1e/a4/0a1ea42e2719f4fccccdad3aae60216a.jpg",
//     title: "Product 4",
//     description: "Description of product 4.",
//     price: "$49.99"
//   },
// ];

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const limit = 12; // products per page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts({ page, limit });
        setProducts(data.products || []);
        setPages(data.pages || 1);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
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
    <div className="my-1">
      <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
      <ProductGrid products={products} />
      </div>

      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          {[...Array(pages).keys()].map((x) => (
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
  );
}
