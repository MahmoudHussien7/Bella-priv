import { NavLink, Outlet } from "react-router-dom";
import { CiUser, CiHeart, CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";

function ProfileUser() {
  // State to keep track of the active link
  const [activeLink, setActiveLink] = useState("userInfo");

  return (
    <div className="h-[100vh] flex">
      <div className="w-[20%] shadow-lg p-5 relative">
        <h2 className="text-titleColor text-[1.2rem] font-semibold text-center">
          User Profile
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
            <CiUser size={20} />
            User Info
          </NavLink>

          <NavLink
            to="/profileUser/favourites"
            className={`ml-1 text-titleColor font-montserrat transition-colors flex gap-2 items-center w-full ${
              activeLink === "favourites"
                ? "bg-mainColor text-white"
                : "hover:bg-mainColor hover:text-white"
            } p-2 rounded-md`}
            onClick={() => setActiveLink("favourites")}
          >
            <CiHeart size={20} />
            Favourites
          </NavLink>

          <NavLink
            to="/profileUser/settings"
            className={`ml-1 text-titleColor font-montserrat transition-colors flex gap-2 items-center w-full ${
              activeLink === "settings"
                ? "bg-mainColor text-white"
                : "hover:bg-mainColor hover:text-white"
            } p-2 rounded-md`}
            onClick={() => setActiveLink("settings")}
          >
            <CiSettings size={20} />
            Settings
          </NavLink>

          <NavLink
            to="/profileUser/notifications"
            className={`ml-1 text-titleColor font-montserrat transition-colors flex gap-2 items-center w-full ${
              activeLink === "notifications"
                ? "bg-mainColor text-white"
                : "hover:bg-mainColor hover:text-white"
            } p-2 rounded-md`}
            onClick={() => setActiveLink("notifications")}
          >
            <IoIosNotificationsOutline size={20} />
            Notifications
          </NavLink>
        </div>

        <div className="absolute bottom-2 w-full text-center">
          <NavLink
            to="/"
            className="ml-1 text-titleColor font-montserrat transition-colors flex gap-2 items-center w-full p-4 rounded-md"
          >
            <FaSignOutAlt size={20} />
            Back Home
          </NavLink>
        </div>
      </div>

      <div className="w-[80%] p-5">
        {/* Nested route content will be rendered here */}
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileUser;