import { useState } from 'react';
// import AdminNavbar from '../Components/AdminNavbar';
import Sidebar from '../Components/Sidebar';
import Statistics from '../Pages/Statistics';
import UsersTable from '../Pages/UsersTable';
import ProductsTable from './ProductsTable';

function Dashboard() {
  const [selectedItem, setSelectedItem] = useState('Statistics');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (selectedItem) {
      case 'Statistics':
        return <Statistics />;
      case 'Users':
        return <UsersTable />;
      case 'Products':
        return <ProductsTable />;
      default:
        return <Statistics />;
    }
  };

  return (
    <div className="flex bg-[#F7F9F2] min-h-screen">
      <aside className={`fixed top-0 left-0 h-full bg-white shadow-md transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:w-64 z-50`}>
        <Sidebar selectedItem={selectedItem} setSelectedItem={setSelectedItem} closeSidebar={() => setIsSidebarOpen(false)} />
      </aside>

      <div className="flex-1 flex flex-col lg:ml-64">
        {/* <AdminNavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} /> */}
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
