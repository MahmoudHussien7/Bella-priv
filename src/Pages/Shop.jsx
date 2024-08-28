import { useState, useEffect } from "react";
import db from "../../public/db.json";
import ShopSidebar from "../Components/shop/ShopSidebar";
import Card from "../Components/Card";
import SortDropdown from "../Components/shop/SortDropdown";
import Banner from "../Components/shop/Banner";

const Shop = () => {
  const [currentPosts, setCurrentPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 200, max: 5000 });
  const [maxPrice, setMaxPrice] = useState(priceRange.max);
  const [sortOption, setSortOption] = useState("Sort by Default");

  useEffect(() => {
    setCurrentPosts(db);
    setFilteredPosts(db);
  }, []);

  const handlePriceChange = (price) => {
    setMaxPrice(price);
    filterProducts(searchTerm, price, sortOption);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterProducts(term, maxPrice, sortOption);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    filterProducts(searchTerm, maxPrice, option);
  };

  const filterProducts = (searchTerm, maxPrice, sortOption) => {
    let filtered = currentPosts;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = filtered.filter((product) => product.price <= maxPrice);

    switch (sortOption) {
      case "Sort by Popularity":
        // Add logic
        break;
      case "Sort by Latest":
        // Add logic
        break;
      case "Sort by Price: ↑":
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case "Sort by Price: ↓":
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredPosts(filtered);
  };

  return (
    <div className="bg-stone-50 min-h-screen ">
      <Banner title={"Shop"} />

      <div className="flex flex-col lg:flex-row px-4 md:px-16 lg:px-20 py-8">
        {/* Main Content Area */}
        <div className="flex flex-col flex-grow items-center w-full">
          <div className="flex justify-between items-center mb-4 w-[80%]">
            <p className="text-gray-600 text-sm">Showing 1–12 of 25 results</p>
            <SortDropdown onSortChange={handleSortChange} />
          </div>

          <div className="flex flex-wrap justify-between sm:1/2 md:4/5 md:gap-8 w-[80%]">
            {filteredPosts.map((product) => (
              <Card
                key={product.id}
                title={product.title}
                price={product.price}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <ShopSidebar
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
          onSearch={handleSearch}
        />
      </div>
    </div>
  );
};

export default Shop;
