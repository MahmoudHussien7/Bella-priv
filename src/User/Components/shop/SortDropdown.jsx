import  { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const SortDropdown = ({ onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Sort by Default');

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-between w-full rounded-md  px-4 py-2  text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          {selectedOption}
          <FaChevronDown className="ml-2" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-30">
          <div className="py-1">
            <a
              onClick={() => handleOptionClick('Sort by Default')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            >
              Sort by Default
            </a>
            <a
              onClick={() => handleOptionClick('Sort by Popularity')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            >
              Sort by Popularity
            </a>
            <a
              onClick={() => handleOptionClick('Sort by Latest')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            >
              Sort by Latest
            </a>
            <a
              onClick={() => handleOptionClick('Sort by Price: ↑')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            >
              Sort by Price: ↑
            </a>
            <a
              onClick={() => handleOptionClick('Sort by Price: ↓')}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            >
              Sort by Price: ↓
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
