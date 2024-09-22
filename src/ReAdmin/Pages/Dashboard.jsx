import { useState } from "react";
import { Outlet } from "react-router-dom";
import SidebarDash from "../components/SidebarDash";
import { GiHamburgerMenu } from "react-icons/gi";

function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="h-full flex">
      {/* Sidebar toggle icon for all screens */}
      <button
        onClick={toggleSidebar}
        className="fixed z-50 top-4 left-4 p-2 text-mainColor hover:text-hovermain focus:outline-none transition-all"
      >
        <GiHamburgerMenu size={28} />
      </button>

      {/* Sidebar - slide in/out on all screens */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ${
          isSidebarOpen ? "translate-x-0 w-[250px]" : "translate-x-0 w-[80px]"
        }`}
      >
        <SidebarDash isSidebarOpen={isSidebarOpen} />
      </div>

      {/* Main content */}
      <div
        className={`flex-grow p-4 transition-all duration-300 ${isSidebarOpen ? "ml-[250px]" : "ml-[80px]"}`}
      >
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
