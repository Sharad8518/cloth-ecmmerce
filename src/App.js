import React from "react";
import Home from "./component/Home/Home";
import "./App.css";
import { CartProvider } from "./component/Context/CartProvider";
import RouteManager from "./component/RouteManager/RouteManager";

export default function App() {
  return (
    <CartProvider>
      <RouteManager />
    </CartProvider>
  );
}
