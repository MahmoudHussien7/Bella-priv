// Sidebar.js
import { NavLink, Link, useNavigate } from "react-router-dom";
import { CiUser, CiSettings } from "react-icons/ci";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { logoutUser } from "../../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";

function SidebarDash() {
  const [activeLink, setActiveLink] = useState("userInfo");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className="w-[20%] shadow-lg p-5 relative">
      <h2 className="text-mainColor text-[1.2rem] font-semibold text-center">
        BELLA{" "}
      </h2>
      <div className="flex flex-col gap-4 mt-6">
        <NavLink
          to="/profileUser/"
          className={`ml-1 text-titleColor font-montserrat transition-colors flex gap-2 items-center w-full ${
            activeLink === "userInfo"
              ? "bg-mainColor text-white"
              : "hover:bg-mainColor hover:text-white"
          } p-2 rounded-md`}
          onClick={() => setActiveLink("userInfo")}
        >
          <CiSettings size={20} />
          Dashboard{" "}
        </NavLink>

        <NavLink
          to="/dashboard/productsdash"
          className={`ml-1 text-titleColor font-montserrat transition-colors flex gap-2 items-center w-full ${
            activeLink === "favourites"
              ? "bg-mainColor text-white"
              : "hover:bg-mainColor hover:text-white"
          } p-2 rounded-md`}
          onClick={() => setActiveLink("favourites")}
        >
          <HiOutlineShoppingBag />
          Products
        </NavLink>

        <NavLink
          to="/dashboard/users"
          className={`ml-1 text-titleColor font-montserrat transition-colors flex gap-2 items-center w-full ${
            activeLink === "settings"
              ? "bg-mainColor text-white"
              : "hover:bg-mainColor hover:text-white"
          } p-2 rounded-md`}
          onClick={() => setActiveLink("settings")}
        >
          <CiUser size={20} />
          Users
        </NavLink>
      </div>

      <div className="mt-8 flex items-center font-montserrat text-gray-700 hover:text-red-600 cursor-pointer">
        <FaSignOutAlt />
        <Link onClick={logOut} className=" ml-2 text-titleColor">
          LogOut
        </Link>
      </div>
    </div>
  );
}

export default SidebarDash;
