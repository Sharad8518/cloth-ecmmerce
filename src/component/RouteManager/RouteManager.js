// src/RouteManager.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import ProductDetail from "../ProductDetail/ProductDetail";
import CategoryProduct from "../AllProduct/CategoryProduct/CategoryProduct";
import ProductCart from "../Cart/ProductCart";
import AdminLogin from "../Admin/Auth/AdminLogin";
import AdminDashboard from "../Admin/Dashboard/AdminDashboard";
import DashboardView from "../Admin/Dashboard/DashboardView";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import AddProduct from "../Admin/Product/AddProduct";
import AddNavbar from "../Admin/Navbar/AddNavbar";
import NavbarManager from "../Admin/Navbar/NavbarManager";
import HierarchyManager from "../Admin/Dashboard/Hierarchy/HierarchyManager";
import AllProduct from "../Admin/Product/AllProduct/AllProduct";
import SimilarProduct from "../Admin/Product/SimilarProduct/SimilarProduct";
import FrequentlyBought from "../Admin/Product/FrequentlyBought/FrequentlyBought";
import Checkout from "../Checkout/Checkout";
import Profile from "../User/Profile/Profile";

export default function RouteManager() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/detail/:id" element={<ProductDetail />} />
      <Route path="/categoryProduct" element={<CategoryProduct />} />
      <Route path="/cart" element={<ProductCart />} />
       <Route path="/checkout" element={<Checkout />} />
      <Route path="/AdminLogin" element={<AdminLogin />} />
       <Route path="/profile" element={<Profile />} />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<AdminDashboard />}>
          <Route index element={<DashboardView />} />
          <Route path="addProduct" element={<AddProduct />} />
          <Route path="addNavbar" element={<AddNavbar />} />
          <Route path="navbarmanager" element={<NavbarManager />} />
          <Route path="hierarchyManager" element={<HierarchyManager />} />
          <Route path="AllProduct" element={<AllProduct />} />
          <Route path="FrequentlyBought" element={<FrequentlyBought />} />
          <Route path="SimilarProduct" element={<SimilarProduct />} />
        </Route>
      </Route>
    </Routes>
  );
}
