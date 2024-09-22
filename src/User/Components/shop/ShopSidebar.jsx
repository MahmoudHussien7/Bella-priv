/* eslint-disable react/prop-types */
const ShopSidebar = ({
    priceRange,
    onPriceChange,
    onSearch,
    onCategoryChange,
}) => {
    const handleMinPriceChange = (e) => {
        const newMin = Number(e.target.value);
        onPriceChange(newMin, priceRange.max);
    };

    const handleMaxPriceChange = (e) => {
        const newMax = Number(e.target.value);
        onPriceChange(priceRange.min, newMax);
    };

    const handleCategoryChange = (category) => {
        onCategoryChange(category);
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
                        onChange={() => handleCategoryChange("Bed Room")}
                    />
                    <label htmlFor="bedRoom" className="ml-2 text-gray-700">
                        Bed Room
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
                <div className="flex gap-4">
                    <input
                        type="number"
                        value={priceRange.min}
                        min={0}
                        max={priceRange.max}
                        onChange={handleMinPriceChange}
                        className="w-1/2 p-2 border-b-2 border-gray-400 focus:outline-none focus:border-gray-600"
                    />
                    <input
                        type="number"
                        value={priceRange.max}
                        min={0}
                        onChange={handleMaxPriceChange}
                        className="w-1/2 p-2 border-b-2 border-gray-400 focus:outline-none focus:border-gray-600"
                    />
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>{priceRange.min} EGP</span>
                    <span>{priceRange.max} EGP</span>
                </div>
            </div>
        </div>
    );
};

export default ShopSidebar;
