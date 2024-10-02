/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { CiHeart, CiUser } from "react-icons/ci";
import { Link, useLocation, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { PiLineVerticalLight } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData, logoutUser } from "../../Redux/Slices/AuthSlice";
import { toast } from "react-toastify";

const Navbar = () => {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const [navBg, setNavBg] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, userDetails } = useSelector((state) => state.auth);

  const changeNavBg = () => {
    if (window.scrollY > 0) {
      setNavBg(true);
    } else {
      setNavBg(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const logOut = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out successfully!", {
        position: "bottom-right",
      });
      navigate("/login");
    } catch (error) {
      toast.error("An error occurred while logging out. Please try again.", {
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchUserData());
    }

    window.addEventListener("scroll", changeNavBg);
    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, [dispatch, user]);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-colors duration-500 px-[7%] ${
        navBg || (location.pathname !== "/" && location.pathname !== "/AboutUs")
          ? "bg-white text-titleColor h-20"
          : "bg-transparent text-white"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Section */}
        <div
          className={`text-3xl font-bold mt-4 ${
            navBg || location.pathname !== "/" ? "text-mainColor" : ""
          }`}
        >
          <span>
            <Link to="/" className="flex justify-center font-sans">
              Bella
            </Link>
          </span>
          <p className={`text-sm font-light ${navBg ? "text-mainColor" : ""}`}>
            <Link to="/" className="text-[0.7rem] font-extralight">
              LUXURY YOU DESERVE
            </Link>
          </p>
        </div>

        {/* Hamburger Icon (Visible on Small Screens) */}
        <div className="lg:hidden">
          <button
            onClick={toggleSidebar}
            className={`text-3xl ${navBg ? "text-mainColor" : "text-white"}`}
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Full Menu Links (Hidden on Small Screens) */}
        <ul className="hidden lg:flex space-x-8 uppercase tracking-wide mt-3">
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200 text-[1rem]">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200 text-[1rem]">
            <Link to="/aboutus">About Us</Link>
          </li>
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200 text-[1rem]">
            <Link to="/Products">Collection</Link>
          </li>
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200 text-[1rem]">
            <Link to="/contactUs">Contact Us</Link>
          </li>
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200">
            <Link to="/shop" onClick={toggleSidebar}>
              Store
            </Link>
          </li>
        </ul>

        {/* Icons */}
        <div className="hidden lg:flex space-x-4 items-center mt-4">
          <div className="hover:text-mainColor cursor-pointer transition-all duration-200 relative">
            <Link to="/cart">
              {totalQuantity > 0 && (
                <span className="absolute top-[0px] right-[-5px] flex justify-center items-center text-white bg-opacity-100 bg-[#DD5746] rounded-full text-xs px-[3px] ">
                  {totalQuantity}
                </span>
              )}
              <HiOutlineShoppingBag className="size-6" />
            </Link>
          </div>
          <div className="hover:text-mainColor cursor-pointer transition-all duration-200">
            <Link to="/wishlist">
              <CiHeart className="size-6" />
            </Link>{" "}
          </div>
          <PiLineVerticalLight className="size-6" />

          {userDetails ? (
            <div className="flex-none text-center">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="">
                  <div className="w-40 text-[1rem]">
                    {userDetails?.userName}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <NavLink
                      className=" text-titleColor"
                      to="/profileUser/userInfo"
                    >
                      <CiUser size={18} />
                      User Profile
                    </NavLink>
                  </li>
                  <li>
                    <Link onClick={logOut} className=" text-titleColor">
                      <IoIosLogOut size={18} />
                      LogOut
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="hover:text-mainColor cursor-pointer transition-all duration-200 text-[1rem]">
              <Link to="/login" className="mr-5">
                LOGIN
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar (Visible on Small Screens) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white text-black shadow-lg z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:hidden`}
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className="absolute top-4 right-4 text-3xl cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        >
          {sidebarOpen}
          {/* Add FaTimes back when sidebar is open */}
        </div>
        <ul className="flex flex-col space-y-8 p-8 text-black uppercase">
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200">
            <Link to="/" onClick={toggleSidebar}>
              Home
            </Link>
          </li>
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200">
            <Link to="/AboutUs" onClick={toggleSidebar}>
              About Us
            </Link>
          </li>
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200">
            <Link to="/Products" onClick={toggleSidebar}>
              Collection
            </Link>
          </li>
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200">
            <Link to="/contact" onClick={toggleSidebar}>
              Contact Us
            </Link>
          </li>
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200">
            <Link to="/shop" onClick={toggleSidebar}>
              Store
            </Link>
          </li>
          {/* Add icons to the sidebar */}
          <div className="flex gap-8 ">
            <li className="flex items-center justify-between">
              <Link to="/cart" onClick={toggleSidebar}>
                <HiOutlineShoppingBag className="size-6 hover:text-hovermain" />
                {totalQuantity > 0 && (
                  <span className="ml-2 bg-[#DD5746] text-white rounded-full px-2 py-1 text-xs">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            </li>
            <li className="hover:text-mainColor cursor-pointer transition-all duration-200">
              <Link to="/wishlist" onClick={toggleSidebar}>
                <CiHeart className="size-7" />
              </Link>{" "}
            </li>
          </div>
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200">
            {userDetails ? (
              <Link
                to="/profileUser/userInfo"
                onClick={toggleSidebar}
                className="flex gap-2"
              >
                <CiUser className="size-6" /> {userDetails?.userName}
              </Link>
            ) : (
              <Link to="/login" onClick={toggleSidebar}>
                LOGIN
              </Link>
            )}
          </li>
          {userDetails && (
            <li>
              <button onClick={logOut} className="text-red-500 flex gap-2">
                <IoIosLogOut size={24} />
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
