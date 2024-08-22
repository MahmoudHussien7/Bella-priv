import { useState, useEffect } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Hamburger and Close Icons

const Navbar = () => {
  const [navBg, setNavBg] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const changeNavBg = () => {
    if (window.scrollY >= 100) {
      setNavBg(true);
    } else {
      setNavBg(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavBg);
    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-colors duration-500 h-20 ${
        navBg ? "bg-white shadow-md text-black" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Brand Section */}
        <div className="text-3xl font-bold mt-4 text-white">
          <span>Bella</span>
          <p className="text-sm font-light tracking-wide text-white">
            LUXURY YOU DESERVE
          </p>
        </div>

        {/* Hamburger Icon (Visible on Small Screens) */}
        <div className="lg:hidden">
          <button onClick={toggleSidebar} className="text-white text-3xl">
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Full Menu Links (Hidden on Small Screens) */}
        <ul className="hidden lg:flex space-x-8 uppercase tracking-wide mt-5">
          <li className="hover:text-hovermain cursor-pointer transition-all duration-200 text-white">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-hovermain cursor-pointer transition-all duration-200 text-white">
            <Link to="/AboutUs">About Us</Link>
          </li>
          <li className="hover:text-hovermain cursor-pointer transition-all duration-200 text-white">
            <Link to="/collection">Collection</Link>
          </li>
          <li className="hover:text-hovermain cursor-pointer transition-all duration-200 text-white">
            <Link to="/contact">Contact Us</Link>
          </li>
        </ul>

        {/* Icons */}
        <div className="hidden lg:flex space-x-4 items-center">
          <div className="hover:text-hovermain cursor-pointer transition-all duration-200 text-white">
            <CiSearch className="size-10" />
          </div>
          <div className="hover:text-hovermain cursor-pointer transition-all duration-200 text-white">
            <HiOutlineShoppingBag className="size-8" />
          </div>
          <span className="mr-5">|</span>
          <div className="hover:text-hovermain cursor-pointer transition-all duration-200 text-white">
            <Link to="/login" className="mr-5">
              LOGIN
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar (Visible on Small Screens) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:hidden`}
      >
        <ul className="flex flex-col space-y-8 p-8 text-black uppercase">
          <li className="hover:text-hovermain cursor-pointer transition-all duration-200">
            <Link to="/" onClick={toggleSidebar}>
              Home
            </Link>
          </li>
          <li className="hover:text-hovermain cursor-pointer transition-all duration-200">
            <Link to="/AboutUs" onClick={toggleSidebar}>
              About Us
            </Link>
          </li>
          <li className="hover:text-hovermain cursor-pointer transition-all duration-200">
            <Link to="/collection" onClick={toggleSidebar}>
              Collection
            </Link>
          </li>
          <li className="hover:text-hovermain cursor-pointer transition-all duration-200">
            <Link to="/contact" onClick={toggleSidebar}>
              Contact Us
            </Link>
          </li>
          <div className="flex space-x-4 items-center mt-4">
            <div className="hover:text-hovermain cursor-pointer transition-all duration-200 text-black">
              <CiSearch className="size-10" />
            </div>
            <div className="hover:text-hovermain cursor-pointer transition-all duration-200 text-black">
              <HiOutlineShoppingBag className="size-8" />
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
