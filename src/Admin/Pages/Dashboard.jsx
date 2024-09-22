import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import Statistics from "../Pages/Statistics";
import UsersTable from "../Pages/UsersTable";
import ProductsTable from "../Pages/ProductsTable";

function Dashboard() {
    const [selectedItem, setSelectedItem] = useState("Statistics");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex bg-[#fffdfb] min-h-screen">
            <aside
                className={`fixed top-0 left-0 h-full bg-white shadow-sm transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:w-64 z-50`}
            >
                <Sidebar
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    closeSidebar={() => setIsSidebarOpen(false)}
                />
            </aside>

            <div className="flex-1 flex flex-col lg:ml-64">
                {/* <AdminNavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} /> */}
                <main className="flex-1 p-6">
                    <Routes>
                        <Route path="statistics" element={<Statistics />} />
                        <Route path="users" element={<UsersTable />} />
                        <Route path="products" element={<ProductsTable />} />
                        {/* Default route to handle unknown paths */}
                        <Route path="*" element={<Statistics />} />
                    </Routes>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
