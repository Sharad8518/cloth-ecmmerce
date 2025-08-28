import React from "react";
import Home from "./component/Home/Home";
import "./App.css";
import { CartProvider } from "./component/Context/CartProvider";
import RouteManager from "./component/RouteManager/RouteManager";
import { GoogleOAuthProvider } from "@react-oauth/google";
export default function App() {
  return (
     <GoogleOAuthProvider clientId={"489329560689-n1hmlss9s8s950umc729bnatcltt1lrf.apps.googleusercontent.com"}>
    <CartProvider>
      <RouteManager />
    </CartProvider>
    </GoogleOAuthProvider>
  );
}
