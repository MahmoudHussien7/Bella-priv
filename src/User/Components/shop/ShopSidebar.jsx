import { useDispatch } from "react-redux";
import { setSelectedCategories } from "../../../Redux/Slices/ProductsSlice";

const ShopSidebar = ({
  priceRange,
  onPriceChange,
  onSearch,
  onCategoryChange,
}) => {
  const dispatch = useDispatch();

  const handleCategoryChange = (category) => {
    onCategoryChange(category); // Inform the parent component about category change
  };

  return (
    <div className="w-full lg:w-1/4 p-4 bg-transparent">
      {/* Search Input */}
      <div className="mb-6 relative">
        <input
          type="text"
          placeholder="Search Product..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full p-2 border-b-2 border-gray-400 focus:outline-none focus:border-gray-600 bg-transparent"
        />
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-4 text-gray-700 font-Montserrat">
          CATEGORIES
        </h3>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="livingRoom"
            className="form-checkbox h-4 w-4 text-gray-600 bg-white border-gray-300 focus:ring-gray-500"
            onChange={() => handleCategoryChange("Living Room")}
          />
          <label htmlFor="livingRoom" className="ml-2 text-gray-700">
            Living Room
          </label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="bedRoom"
            className="form-checkbox h-4 w-4 text-gray-600 bg-white border-gray-300 focus:ring-gray-500"
            onChange={() => handleCategoryChange("Bedroom")}
          />
          <label htmlFor="bedRoom" className="ml-2 text-gray-700">
            Bedroom
          </label>
        </div>
        <div className="flex items-center mb-2">
          <input
            type="checkbox"
            id="decoration"
            className="form-checkbox h-4 w-4 text-gray-600 bg-white border-gray-300 focus:ring-gray-500"
            onChange={() => handleCategoryChange("Decoration")}
          />
          <label htmlFor="decoration" className="ml-2 text-gray-700">
            Decoration
          </label>
        </div>
      </div>

      {/* Price Filter */}
      <div className="mb-8">
        <h3 className="font-bold text-lg mb-4 text-gray-700">PRICE</h3>
        <input
          type="range"
          min={priceRange.min}
          max={priceRange.max}
          onChange={(e) => onPriceChange(e.target.value)}
          className="w-full accent-gray-600"
        />
        <div className="flex justify-between text-sm text-gray-600 mb-4">
          <span>{priceRange.min} EGP</span>
          <span>{priceRange.max} EGP</span>{" "}
          {/* Update to reflect current max */}
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;
