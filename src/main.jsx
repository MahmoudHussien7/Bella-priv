import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
// import App from "./App";
import Login from "./Pages/Login"; // Import the Login component
import Home from "./Pages/Home"; // Assuming you have a Home component
// import Navbar from "./Components/Navbar"; // Assuming Navbar is outside App for global use
import Register from "./Pages/Register";
import AboutUs from "./Pages/AboutUs";
import Products from "./Pages/Products";
import ProductDetails from "./Pages/ProductDetails";
import Shop from "./Pages/Shop";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Products" element={<Products />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/contactUs" element={<Register />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
