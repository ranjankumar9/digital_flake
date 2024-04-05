import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Category from "../Pages/Category";
import Products from "../Pages/Products";
import SignUp from "../Pages/Authentication/SignUp";
import Login from "../Pages/Authentication/Login";
import { PrivateRoute } from "../components/PrivateRoute";
import ForgotPassword from "../Pages/Authentication/ForgotPassword";
import ResetPassword from "../Pages/Authentication/ResetPassword";
import AddCategory from "../Pages/AddCategory";
import AddProducts from "../Pages/AddProducts";

const Pages = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/user/signup" element={<SignUp />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/forgot-password" element={<ForgotPassword />} />
        <Route path="/user/reset-password" element={<ResetPassword />} />
        <Route
          path="/category"
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-category"
          element={
            <PrivateRoute>
              <AddCategory />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Products />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-products"
          element={
            <PrivateRoute>
              <AddProducts />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default Pages;
