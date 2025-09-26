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
import Orders from "../User/Orders/Orders";
import Favourites from "../User/Favourites/Favourites";
import AdminOrders from "../Admin/Sales&Biiling/AdminOrders/AdminOrders";
import BannerManager from "../Admin/Banner/BannerManager";
import PromotionsPage from "../Promotion/PromotionsPage";
import Header from "../Admin/Navbar/Header/Header";
import Category from "../Admin/Navbar/Category/Category";
import Collection from "../Admin/Navbar/Collection/Collection";
import Customer from "../Admin/Customer/Customer";
import PolicyPage from "../Admin/Policy/PolicyPage";
import Collections from "../Collections/Collections";
import IndoWestern from "../IndoWestern/IndoWestern";
import Jewellery from "../Jewellery/Jewellery";
import KurtaSet from "../KurtaSet/KurtaSet";
import Potilis from "../Potilis/Potilis";
import DesignerSuit from "../DesignerSuit/DesignerSuit";
import EditProduct from "../Admin/Product/EditProduct/EditProduct";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";
import AboutUs from "../AboutUs/AboutUs";
import TermCondition from "../TermCondition/TermCondition";
import ReturnExchange from "../Return&Exchange/ReturnExchange";
import CookiesPolicy from "../CookiesPolicy/CookiesPolicy";
import NewIn from "../New-In/NewIn";
import NotFound from "../NotFound/NotFound";
import NoInternet from "../NoInternet/NoInternet";
import ZibaLuxe from "../Admin/Navbar/Collection/ZibaLuxe/ZibaLuxe";
import CollectionObleLuxe from "../Luxe/CollectionObleLuxe";
import TopCollection from "../Admin/TopCollection/TopCollection";
import TopCollectionUser from "../TopCollectionUser/TopCollectionUser";

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
      <Route path="/orders" element={<Orders />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/collections" element={<Collections />} />
      <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
      <Route path="/aboutUs" element={<AboutUs />} />
      <Route path="/termCondition" element={<TermCondition />} />
      <Route path="/returnExchange" element={<ReturnExchange />} />
      <Route path="/cookiesPolicy" element={<CookiesPolicy />} />
      <Route path="/newIn" element={<NewIn />} />
      <Route path="/topCollectionUser" element={<TopCollectionUser />} />
      <Route path="/collectionObleLuxe" element={<CollectionObleLuxe />} />
      <Route path="/indoWestern/:category/:subName?" element={<IndoWestern />} />
      <Route path="/jewellery/:category/:subName?" element={<Jewellery />} />
      <Route path="/kurtaSet/:category/:subName?" element={<KurtaSet />} />
      <Route path="/potilis/:category/:subName?" element={<Potilis />} />
      <Route path="/designerSuit/:category/:subName?" element={<DesignerSuit />} />
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
          <Route path="Orders" element={<AdminOrders />} />
          <Route path="BannerManager" element={<BannerManager />} />
          <Route path="Promotions" element={<PromotionsPage />} />
          <Route path="Header" element={<Header />} />
          <Route path="Category" element={<Category />} />
          <Route path="Collection" element={<Collection />} />
          <Route path="Customer" element={<Customer />} />
          <Route path="Policy" element={<PolicyPage />} />
          <Route path="EditProduct" element={<EditProduct />} />
          <Route path="ZibaLuxe" element={<ZibaLuxe />} />
          <Route path="TopCollection" element={<TopCollection />} />
        </Route>
           <Route path="*" element={<NotFound />} />
           <Route path="/no-internet" element={<NoInternet />} />
      </Route>
    </Routes>
  );
}
