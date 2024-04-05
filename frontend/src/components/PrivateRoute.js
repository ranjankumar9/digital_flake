import Cookies from "js-cookie";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const isAuth = Cookies.get("token")
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to={"/user/login"} state={location.pathname} replace />;
  }
  return children; 
};