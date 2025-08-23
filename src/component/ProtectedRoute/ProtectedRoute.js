import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export default function ProtectedRoute() {
  const token = localStorage.getItem("hfz-a_tkn_238x");

  const isTokenValid = () => {
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      // exp is in seconds, Date.now() is in ms
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        // Token is expired
        return false;
      }
      return true;
    } catch (error) {
      // Token not valid
      return false;
    }
  };

  return isTokenValid() ? <Outlet /> : <Navigate to="/AdminLogin" replace />;
}
