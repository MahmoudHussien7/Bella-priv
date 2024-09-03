import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./User/Pages/Login";
import Home from "./User/Pages/Home";
import Register from "./User/Pages/Register";
import AboutUs from "./User/Pages/AboutUs";
import Products from "./User/Pages/Products";
import ProductDetails from "./User/Pages/ProductDetails";
import Shop from "./User/Pages/Shop";
import Cart from "./User/Pages/Cart";
import Checkout from "./User/Pages/Checkout";
import Dashboard from "./Admin/Pages/Dashboard";
import Page404 from "./User/Pages/Page404";
import ProfileUser from "./User/Pages/ProfileUser";
import UserInfo from "./User/Components/UserInfo"; // Make sure path is correct
import { Provider } from "react-redux";
import storeApp from "./Redux/Store";
import Setting from "./User/Components/Setting";
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={storeApp}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact-us" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* ProfileUser routes with nested child routes */}
          <Route path="/profileUser/*" element={<ProfileUser />}>
            {/* Default nested route: userInfo will be rendered by default */}
            <Route index element={<UserInfo />} />

            {/* Other nested routes */}
            <Route path="favourites" element={<div>Favourites</div>} />
            <Route path="settings" element={<Setting/>} />
            <Route path="notifications" element={<div>Notifications</div>} />
          </Route>

          {/* Catch-all for undefined routes */}
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);