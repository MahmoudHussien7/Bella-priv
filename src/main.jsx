import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Login from "./Pages/Login"; // Import the Login component
import Home from "./Pages/Home"; // Assuming you have a Home component
import Navbar from "./Components/Navbar"; // Assuming Navbar is outside App for global use
import Register from "./Pages/Register";
import AboutUs from "./Pages/AboutUs";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar /> {/* Navbar will be shown on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Register" element={<Register />} />
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
