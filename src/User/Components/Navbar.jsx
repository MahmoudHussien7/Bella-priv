import { useState, useEffect } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { CiSearch, CiHeart, CiUser } from "react-icons/ci";
import { Link, useLocation, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { PiLineVerticalLight } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData,logoutUser } from "../../Redux/Slices/AuthSlice";

const Navbar = () => {
  const [navBg, setNavBg] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const { user, userDetails } = useSelector((state) => state.auth);

  const changeNavBg = () => {
    setNavBg(window.scrollY > 0);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const logOut = () => {
    dispatch(logoutUser());
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
          ? "bg-white text-black h-20"
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
          <Link to="/" className="flex justify-center font-sans">
            Bella
          </Link>
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
            className={`text-3xl ${navBg ? "text-black" : "text-white"}`}
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
            <Link to="/AboutUs">About Us</Link>
          </li>
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200 text-[1rem]">
            <Link to="/Products">Collection</Link>
          </li>
          <li className="hover:text-mainColor cursor-pointer transition-all duration-200 text-[1rem]">
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>

        {/* Icons */}
        <div className="hidden lg:flex space-x-4 items-center mt-4">
          <div className="hover:text-mainColor cursor-pointer transition-all duration-200">
            <CiSearch className="size-6" />
          </div>
          <div className="hover:text-mainColor cursor-pointer transition-all duration-200">
            <Link to="/cart">
              <HiOutlineShoppingBag className="size-6" />
            </Link>
          </div>
          <div className="hover:text-mainColor cursor-pointer transition-all duration-200">
            <CiHeart className="size-6" />
          </div>
          <PiLineVerticalLight className="size-6" />

          {userDetails ? (
            <div className="flex-none text-center">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="">
                  <div className="w-40 text-[1rem]">
                    {userDetails?.fullName}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <NavLink className=" text-titleColor" to="/profileUser/">
                      <CiUser size={18} />
                      User Profile
                    </NavLink>
                  </li>
                  <li>
                    <Link
                      onClick={logOut}
                      className=" text-titleColor"
                      to="/login"
                    >
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
      >
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
          <div className="flex space-x-4 items-center mt-4">
            <div className="hover:text-mainColor cursor-pointer transition-all duration-200 text-black">
              <CiSearch className="size-10" />
            </div>
            <div className="hover:text-mainColor cursor-pointer transition-all duration-200 text-black">
              <HiOutlineShoppingBag className="size-8" />
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
