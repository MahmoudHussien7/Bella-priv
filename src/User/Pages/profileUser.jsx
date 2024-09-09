import { useEffect, useState } from "react"; // Added useState
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { CiUser, CiHeart, CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../Redux/Slices/AuthSlice";

function ProfileUser() {
  const [activeLink, setActiveLink] = useState("userInfo");

  const dispatch = useDispatch();
  const { user, userDetails, loading, error } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.error("User not authenticated");
      navigate("/login");
    } else {
      dispatch(fetchUserData(user.uid));
    }
  }, [dispatch, user, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="h-[100vh] flex">
      {userDetails ? (
        <>
          <div className="w-[20%] shadow-lg p-5 relative">
            <h2 className="text-titleColor text-[1.2rem] font-semibold text-center">
              User Profile
            </h2>
            <div className="flex flex-col gap-4 mt-6 ">
              <NavLink
                to="/profileUser/userInfo"
                className={({ isActive }) =>
                  `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 items-center w-full ${
                    isActive
                      ? "bg-hovermain text-white"
                      : "hover:bg-hovermain hover:text-white"
                  } p-2 rounded-md`
                }
                onClick={() => setActiveLink("userInfo")} // Correctly set the state
              >
                <CiUser size={20} />
                User Info
              </NavLink>

              <NavLink
                to="/profileUser/favourites"
                className={({ isActive }) =>
                  `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 ${
                    isActive
                      ? "bg-hovermain text-white"
                      : "hover:bg-hovermain hover:text-white"
                  } p-2 rounded-md`
                }
                onClick={() => setActiveLink("favourites")}
              >
                <CiHeart size={20} />
                Favourites
              </NavLink>

              <NavLink
                to="/profileUser/settings"
                className={({ isActive }) =>
                  `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 ${
                    isActive
                      ? "bg-hovermain text-white"
                      : "hover:bg-hovermain hover:text-white"
                  } p-2 rounded-md`
                }
                onClick={() => setActiveLink("settings")}
              >
                <CiSettings size={20} />
                Settings
              </NavLink>

              <NavLink
                to="/profileUser/notifications"
                className={({ isActive }) =>
                  `ml-1 text-titleColor font-montserrat transition-colors flex gap-2 ${
                    isActive
                      ? "bg-hovermain text-white"
                      : "hover:bg-hovermain hover:text-white"
                  } p-2 rounded-md`
                }
                onClick={() => setActiveLink("notifications")}
              >
                <IoIosNotificationsOutline size={20} />
                Notifications
              </NavLink>
            </div>

            <div className="absolute bottom-2 w-full text-center">
              <NavLink
                to="/"
                className={`ml-1 text-titleColor font-montserrat transition-colors flex gap-2 items-center w-full p-4 rounded-md`}
              >
                <FaSignOutAlt size={20} />
                Back Home
              </NavLink>
            </div>
          </div>

          <div className="w-[80%] p-5">
            <Outlet />
          </div>
        </>
      ) : (
        <div>Loading user details...</div>
      )}
    </div>
  );
}

export default ProfileUser;
