import { AiFillHome } from 'react-icons/ai';
import AdminNavbar from '../Components/AdminNavbar';
import Sidebar from '../Components/Sidebar';
import StatisticsCards from '../Components/StatisticsCards';

function Dashboard() {
  return (
    <div className="min-h-screen flex bg-[#F7F9F2]">
      {/* Sidebar as aside */}
      <aside className="w-64">
        <Sidebar />
      </aside>
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        
        {/* Admin Navbar */}
        <AdminNavbar />
        <main className="flex-1 p-6">
        <div className="  flex flex-col ">
        <h1 className="text-2xl font-bold text-titleColor">Dashboard</h1>
        <span className="mt-2 text-sm flex gap-2 items-center"><AiFillHome className='text-titleColor'/><span className='text-titleColor'>Home</span> / Dashboard</span>
      </div>
          <StatisticsCards />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
