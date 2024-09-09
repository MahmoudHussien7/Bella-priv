// Dashboard.js
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/SidebarDash"; // Import the new Sidebar component

function Dashboard() {
  return (
    <div className="h-[100vh] flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="w-[80%] p-5">
        {/* Nested route content will be rendered here */}
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
