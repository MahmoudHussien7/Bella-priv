/* eslint-disable react/prop-types */
import { NavLink, Link, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { logoutUser } from "../../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";
import { GrTask } from "react-icons/gr";

function SidebarDash({ isSidebarOpen }) {
  const [activeLink, setActiveLink] = useState("productsdash");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div
      className={`h-full p-5 relative flex flex-col justify-between ${
        isSidebarOpen ? "w-[250px]" : "w-[80px]"
      } transition-all duration-300 bg-white shadow-lg`}
    >
      <div>
        {/* Logo or Sidebar Header */}
        <div className="flex items-center justify-center mb-16">
          <h2
            className={`text-3xl text-mainColor font-semibold ${
              !isSidebarOpen && "hidden"
            }`}
          >
            BELLA
          </h2>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-4 mt-6">
          <NavLink
            to="/dashboard/productsDash"
            className={`text-mainColor font-montserrat transition-colors flex items-center w-full ${
              activeLink === "productsdash"
                ? "bg-mainColor text-white"
                : "hover:bg-mainColor hover:text-white"
            } p-2 rounded-md`}
            onClick={() => setActiveLink("productsdash")}
          >
            <HiOutlineShoppingBag size={24} />
            <span className={`ml-2 ${!isSidebarOpen && "hidden"}`}>
              Products
            </span>
          </NavLink>
          <NavLink
            to="/dashboard/users"
            className={`text-mainColor font-montserrat transition-colors flex items-center w-full ${
              activeLink === "users"
                ? "bg-mainColor text-white"
                : "hover:bg-mainColor hover:text-white"
            } p-2 rounded-md`}
            onClick={() => setActiveLink("users")}
          >
            <CiUser size={24} />
            <span className={`ml-2 ${!isSidebarOpen && "hidden"}`}>Users</span>
          </NavLink>
          <NavLink
            to="/dashboard/orders"
            className={`text-mainColor font-montserrat transition-colors flex items-center w-full ${
              activeLink === "orders"
                ? "bg-mainColor text-white"
                : "hover:bg-mainColor hover:text-white"
            } p-2 rounded-md`}
            onClick={() => setActiveLink("orders")}
          >
            <GrTask size={24} />
            <span className={`ml-2 ${!isSidebarOpen && "hidden"}`}>Orders</span>
          </NavLink>
        </div>
      </div>

      {/* Logout Link */}
      <div className="flex items-center text-gray-700 hover:text-red-600 cursor-pointer">
        <Link onClick={logOut} className={`ml-3 text-titleColor`}>
          <div className="flex gap-2">
            <FaSignOutAlt size={24} />
            <span className={`${!isSidebarOpen && "hidden"}`}>Logout</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SidebarDash;
