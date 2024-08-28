import {  FaGift,   FaSignOutAlt, FaUsers } from 'react-icons/fa';
import { HiOutlineShoppingBag } from 'react-icons/hi2';
import { ImStatsDots } from 'react-icons/im';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="min-h-screen w-64 bg-white p-4 shadow-lg flex flex-col justify-between">
      {/* Logo and Navigation */}
      <div>
        <div className="text-2xl text-mainColor  font-semibold mb-8">
          Bella 
        </div>
        <nav className="flex flex-col space-y-4">
          {/* Navigation Items */}
       
          <Link to="#" className="flex items-center font-montserrat text-white bg-mainColor hover:bg-mainColor p-2 rounded-lg">
          <ImStatsDots />
            <span className="ml-3">Statistics</span>
          </Link>
          <Link to="#" className="flex items-center font-montserrat text-gray-700 hover:text-mainColor">
          <HiOutlineShoppingBag className="size-5" />
            <span className="ml-3">Products</span>
          </Link>
          <Link to="#" className="flex items-center font-montserrat text-gray-700 hover:text-mainColor">
          <FaUsers />
            <span className="ml-3">Users</span>
          </Link>
          <Link to="#" className="flex items-center font-montserrat text-gray-700 hover:text-mainColor">
          <MdOutlineSupportAgent />
            <span className="ml-3">Support</span>
          </Link>
       
          <Link to="#" className="flex items-center font-montserrat text-gray-700 hover:text-mainColor">
            <FaGift />
            <span className="ml-3">Coupon</span>
          </Link>
       
        </nav>
      </div>

     

      {/* Logout */}
      <div className="mt-8 flex items-center font-montserrat text-gray-700 hover:text-red-600">
        <FaSignOutAlt />
        <span className="ml-2">Log out</span>
      </div>
    </div>
  );
};

export default Sidebar;
