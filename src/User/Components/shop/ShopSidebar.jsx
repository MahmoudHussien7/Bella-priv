import React from 'react';
import { FaSearch } from 'react-icons/fa';

const ShopSidebar = ({ priceRange, onPriceChange, onSearch }) => {
  return (
    <div className="w-full lg:w-1/4 p-4 bg-transparent">
       {/* Search Input */}
       <div className="mb-6 relative ">
        <input
          type="text"
          placeholder="Search Product..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full p-2 border-b-2 border-gray-400 focus:outline-none focus:border-gray-600 bg-transparent"
        />
        <FaSearch className="absolute right-2 top-3 text-gray-400" />
      </div>

     {/* Categories */}
<div className="mb-8">
  <h3 className="font-bold text-lg mb-4 text-gray-700 font-Montserrat">CATEGORIES</h3>
  <div className="flex items-center mb-2">
    <input
      type="checkbox"
      id="newArrival"
      className="form-checkbox h-4 w-4 text-gray-600 bg-white border-gray-300 focus:ring-gray-500"
    />
    <label htmlFor="newArrival" className="ml-2 text-gray-700 ">
      New Arrival (25)
    </label>
  </div>
  <div className="flex items-center">
    <input
      type="checkbox"
      id="uncategorized"
      className="form-checkbox h-4 w-4 text-gray-300 bg-white border-gray-300 focus:ring-gray-500"
      disabled
    />
    <label htmlFor="uncategorized" className="ml-2 text-gray-300">
      Uncategorized (0)
    </label>
  </div>
</div>


      {/* Price Filter */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-4 text-gray-700">PRICE</h3>
        <div className="mb-4">
          <input
            type="range"
            min={priceRange.min}
            max={priceRange.max}
            onChange={(e) => onPriceChange(e.target.value)}
            className="w-full accent-gray-600"
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>{priceRange.min} EGP</span>
          <span>{priceRange.max} EGP</span>
        </div>
        <button className="w-full bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded hover:bg-gray-100">
          Filter
        </button>
      </div>
    </div>
  );
};

export default ShopSidebar;
