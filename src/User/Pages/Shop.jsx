import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/Slices/ProductsSlice";
import ShopSidebar from "../Components/shop/ShopSidebar";
import Card from "../Components/Card";
import SortDropdown from "../Components/shop/SortDropdown";
import Banner from "../Components/shop/Banner";
import Navbar from "../Components/Navbar";

const Shop = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.products);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 200, max: 500000 });
  const [maxPrice, setMaxPrice] = useState(priceRange.max);
  const [sortOption, setSortOption] = useState("Sort by Default");
  const [selectedCategories, setSelectedCategories] = useState([]); // Add category state

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredPosts(products);
  }, [products]);

  const handlePriceChange = (price) => {
    setMaxPrice(price);
    filterProducts(searchTerm, price, sortOption, selectedCategories); // Pass selected categories
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterProducts(term, maxPrice, sortOption, selectedCategories); // Pass selected categories
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    filterProducts(searchTerm, maxPrice, option, selectedCategories); // Pass selected categories
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
    filterProducts(searchTerm, maxPrice, sortOption, updatedCategories); // Pass updated categories
  };

  const filterProducts = (searchTerm, maxPrice, sortOption, categories) => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = filtered.filter((product) => product.price <= maxPrice);

    if (categories.length > 0) {
      filtered = filtered.filter((product) =>
        categories.includes(product.category)
      );
    }

    switch (sortOption) {
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
    <div className="bg-stone-50 min-h-screen">
      <Navbar />
      <Banner title={"Shop"} />

      <div className="flex flex-col lg:flex-row px-4 md:px-16 lg:px-18 py-8">
        {/* Main Content Area */}
        <div className="flex flex-col flex-grow items-center w-full">
          <div className="flex justify-between items-center mb-4 w-[86%]">
            <p className="text-gray-600 text-sm">
              Showing {filteredPosts.length} of {products.length} results
            </p>
            <SortDropdown onSortChange={handleSortChange} />
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-wrap justify-center sm:1/2 md:4/5 md:gap-8 w-[100%] animate-fadeIn">
              {filteredPosts.map((product) => (
                <Card
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  imageUrl={product.imageUrl}
                />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <ShopSidebar
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange} // Add category filter handling
        />
      </div>
    </div>
  );
};

export default Shop;
