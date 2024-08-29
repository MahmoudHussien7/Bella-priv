import { AiFillHome } from 'react-icons/ai';
import AdminNavbar from '../Components/AdminNavbar';
import Sidebar from '../Components/Sidebar';
import StatisticsCards from '../Components/StatisticsCards';
import BalanceOverview from '../Components/BalanceOverview';
import CouponCard from '../Components/CouponCard';
import HeaderWithSubPath from '../Components/HeaderWithSubPath';

function Dashboard() {
  return (
    <div className="flex bg-[#F7F9F2] min-h-screen">
      {/* Sidebar as aside */}
      <aside className="w-64 fixed top-0 left-0 h-full bg-white shadow-md">
        <Sidebar />
      </aside>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Admin Navbar */}
        <AdminNavbar />
        <main className="flex-1 p-6">
        <HeaderWithSubPath
            title="Dashboard" 
            breadcrumb="Home / Dashboard"
          />
          <StatisticsCards />
          <BalanceOverview />
          <CouponCard />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
