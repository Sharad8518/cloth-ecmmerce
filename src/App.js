import React from "react";
import Home from "./component/Home/Home";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import ProductDetail from "./component/ProductDetail/ProductDetail";
import CategoryProduct from "./component/AllProduct/CategoryProduct/CategoryProduct";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detail" element={<ProductDetail />} />
      <Route path="/categoryProduct" element={<CategoryProduct />} />
    </Routes>
  );
}
