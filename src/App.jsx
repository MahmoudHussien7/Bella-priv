import React, { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/config/firebase";
import ProtectedRoute from "../src/ProtectedRoute/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../src/Redux/Slices/AuthSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./hooks/ScrollTop";
import Home from "./User/Pages/Home";

// Lazy-loaded components
const Login = lazy(() => import("./User/Pages/Login"));
const Register = lazy(() => import("./User/Pages/Register"));
const AboutUs = lazy(() => import("./User/Pages/AboutUs"));
const Products = lazy(() => import("./User/Pages/Products"));
const ProductDetails = lazy(() => import("./User/Pages/ProductDetails"));
const Shop = lazy(() => import("./User/Pages/Shop"));
const Cart = lazy(() => import("./User/Pages/Cart"));
const Checkout = lazy(() => import("./User/Pages/Checkout"));
const Dashboard = lazy(() => import("./ReAdmin/Pages/Dashboard"));
const Page404 = lazy(() => import("./User/Pages/Page404"));
const ContactUs = lazy(() => import("./User/Pages/ContactUs"));
const Wishlist = lazy(() => import("./User/Pages/Wishlist"));
const ProfileUser = lazy(() => import("./User/Pages/profileUser"));
const UserInfo = lazy(() => import("./User/Components/userInfo"));
const Statistics = lazy(() => import("./ReAdmin/Components/Statistics"));
const Users = lazy(() => import("./ReAdmin/Components/Users"));
const ProductsDash = lazy(() => import("./ReAdmin/Components/ProductsDash"));
const Orders = lazy(() => import("./ReAdmin/Components/Orders"));
const Settings = lazy(() => import("./User/Components/Settings"));
const ProfileFavourite = lazy(() =>
  import("./User/Components/ProfileFavourite")
);
const Success = lazy(() => import("./User/Components/Success"));
const UserOrders = lazy(() => import("./User/Components/UserOrders"));

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { role } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        await dispatch(fetchUserData(user.uid)); // Dispatch fetch user data when a user is logged in
      } else {
        setCurrentUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center object-center w-full mt-[20%] ">
        <div className="">
          <span className="loading loading-infinity loading-lg text-mainColor size-16"></span>
        </div>
      </div>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="flex items-center justify-center object-center w-full mt-[20%]">
            <div className="">
              <span className="loading loading-infinity loading-lg text-mainColor size-16"></span>
            </div>
          </div>
        }
      >
        <Routes>
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute isAllowed={role === "admin"} redirectPath="/">
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="" element={<Navigate to="productsDash" />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="users" element={<Users />} />
            <Route path="productsdash" element={<ProductsDash />} />
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route
            path="*"
            element={
              role === "admin" ? (
                <Navigate to="/dashboard/productsDash" />
              ) : (
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/login"
                    element={
                      <ProtectedRoute
                        isAllowed={!role}
                        redirectPath={role === "admin" ? "/dashboard" : "/"}
                      >
                        <Login />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/Register"
                    element={
                      <ProtectedRoute
                        isAllowed={!role}
                        redirectPath={role === "admin" ? "/dashboard" : "/"}
                      >
                        <Register />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/AboutUs" element={<AboutUs />} />
                  <Route path="/Products" element={<Products />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="/contactUs" element={<ContactUs />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route
                    path="/profileUser/*"
                    element={
                      currentUser ? <ProfileUser /> : <Navigate to="/" />
                    }
                  >
                    <Route path="userInfo" element={<UserInfo />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="userfav" element={<ProfileFavourite />} />
                    <Route path="orders" element={<UserOrders />} />
                  </Route>
                  <Route path="*" element={<Page404 />} />
                  <Route path="/success" element={<Success />} />
                </Routes>
              )
            }
          />
        </Routes>
      </Suspense>
      <ToastContainer />
    </>
  );
}

export default App;
