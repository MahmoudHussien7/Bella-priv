import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { CiUser, CiHeart } from "react-icons/ci";
// import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../Redux/Slices/AuthSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/firebase";
import { GrTask } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import Navbar from "../Components/Navbar";

function ProfileUser() {
  const dispatch = useDispatch();
  const { user, userDetails, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeLink, setActiveLink] = useState(location.pathname);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(fetchUserData(currentUser.uid));
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  useEffect(() => {
    if (location.pathname === "/profileUser") {
      navigate("/profileUser/userInfo");
    }
  }, [location, navigate]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLinkClick = (path) => {
    setActiveLink(path);
    navigate(path); // Manually navigate to avoid page refresh
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full mt-[25%]">
        <div>
          <span className="loading loading-infinity loading-lg text-mainColor"></span>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return (
      <div className="flex items-center justify-center w-full mt-[25%]">
        <div>
          <span className="loading loading-infinity loading-lg text-mainColor"></span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* <Navbar /> */}
      <div className="flex h-screen">
        {/* <Navbar /> */}
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`h-full p-4 relative flex flex-col justify-between ${
            sidebarOpen ? "w-[250px]" : "w-[80px]"
          } transition-all duration-300 bg-white shadow-lg`}
        >
          <div className="flex flex-col m">
            {/* Sidebar Header with Hamburger Menu */}
            <button
              onClick={toggleSidebar}
              className="text-mainColor text-3xl mb-10"
            >
              <GiHamburgerMenu />
            </button>

            {/* Navigation Links */}
            <div className="flex flex-col gap-4 mt-6 w-full">
              <NavLink
                to="/profileUser/userInfo"
                className={`text-mainColor font-montserrat transition-colors flex items-center w-full ${
                  activeLink === "/profileUser/userInfo"
                    ? "bg-mainColor text-white"
                    : "hover:bg-mainColor hover:text-white"
                } p-2 rounded-md`}
                onClick={() => handleLinkClick("/profileUser/userInfo")}
              >
                <CiUser size={24} />
                <span className={`ml-2 ${!sidebarOpen && "hidden"}`}>
                  User Info
                </span>
              </NavLink>
              <NavLink
                to="/profileUser/userfav"
                className={`text-mainColor font-montserrat transition-colors flex items-center w-full ${
                  activeLink === "/profileUser/userfav"
                    ? "bg-mainColor text-white"
                    : "hover:bg-mainColor hover:text-white"
                } p-2 rounded-md`}
                onClick={() => handleLinkClick("/profileUser/userfav")}
              >
                <CiHeart size={24} />
                <span className={`ml-2 ${!sidebarOpen && "hidden"}`}>
                  Favourites
                </span>
              </NavLink>
              <NavLink
                to="/profileUser/orders"
                className={`text-mainColor font-montserrat transition-colors flex items-center w-full ${
                  activeLink === "/profileUser/orders"
                    ? "bg-mainColor text-white"
                    : "hover:bg-mainColor hover:text-white"
                } p-2 rounded-md`}
                onClick={() => handleLinkClick("/profileUser/orders")}
              >
                <GrTask size={24} />
                <span className={`ml-2 ${!sidebarOpen && "hidden"}`}>
                  My Orders
                </span>
              </NavLink>
            </div>
          </div>

          {/* Back Home Link */}
          <div className="flex items-center text-gray-700 hover:text-red-600 cursor-pointer">
            <NavLink to="/" className={`ml-3  text-titleColor`}>
              <div className="flex gap-2">
                <IoHomeOutline className="text-hovermain" size={24} />
                <span className={`${!sidebarOpen && "hidden"}`}>
                  {" "}
                  Back Home{" "}
                </span>
              </div>
            </NavLink>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full p-5">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default ProfileUser;
