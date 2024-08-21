import { useState, useEffect } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { CiSearch } from "react-icons/ci";
const Navbar = () => {
  const [navBg, setNavBg] = useState(false);

  const changeNavBg = () => {
    if (window.scrollY >= 100) {
      setNavBg(true);
    } else {
      setNavBg(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavBg);
    return () => {
      window.removeEventListener("scroll", changeNavBg);
    };
  }, []);
  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-colors duration-500 h-20 ${
        navBg ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-6">
        <div className="text-3xl font-bold mt-4">
          <span>Bella</span>
          <p className="text-sm font-light tracking-wide">LUXURY YOU DESERVE</p>
        </div>

        {/* Menu Links */}
        <ul className="flex space-x-8 uppercase tracking-wide mt-5 ">
          <li className="hover:text-amber-300 cursor-pointer transition-all duration-200">
            Home
          </li>
          <li className="hover:text-amber-300 cursor-pointer transition-all duration-200">
            About Us
          </li>
          <li className="hover:text-amber-300 cursor-pointer transition-all duration-200">
            Collection
          </li>
          <li className="hover:text-amber-300 cursor-pointer transition-all duration-200">
            Contact Us
          </li>
        </ul>

        {/* Icons */}
        <div className="flex space-x-4 items-center">
          <div className="hover:text-amber-300 cursor-pointer transition-all duration-200">
            <CiSearch className="size-10" />
          </div>
          <div className=" hover:text-amber-300 cursor-pointer transition-all duration-200">
            <HiOutlineShoppingBag className="size-8" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
