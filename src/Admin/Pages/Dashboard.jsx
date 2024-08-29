import  { useState } from 'react';
import AdminNavbar from '../Components/AdminNavbar';
import Sidebar from '../Components/Sidebar';
import Statistics from '../Pages/Statistics'; // Import the Statistics page
import UsersTable from '../Pages/UsersTable'; // Import the UsersTable page
import ProductsTable from './ProductsTable';

function Dashboard() {
  // State to track the selected item
  const [selectedItem, setSelectedItem] = useState('Statistics');

  // Function to render content based on selected item
  const renderContent = () => {
    switch (selectedItem) {
      case 'Statistics':
        return <Statistics />;
      case 'Users':
        return <UsersTable />;
      case 'Products':
        return <ProductsTable/>;
      // Add cases for other items as needed
      default:
        return <Statistics />;
    }
  };

  return (
    <div className="flex bg-[#F7F9F2] min-h-screen">
      {/* Sidebar as aside */}
      <aside className="w-64 fixed top-0 left-0 h-full bg-white shadow-md">
        <Sidebar selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Admin Navbar */}
        <AdminNavbar />
        <main className="flex-1 p-6">
          {/* Render the selected content */}
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
