import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import ShopSidebar from "../Components/shop/ShopSidebar";
import Card from "../Components/Card";
import SortDropdown from "../Components/shop/SortDropdown";
import Banner from "../Components/shop/Banner";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { renderPagination } from "./RenderPagination";

const PAGE_SIZE = 6; // Number of items per page

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]); // All products fetched
  const [filteredProducts, setFilteredProducts] = useState([]); // Products after filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  // Filters and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortOption, setSortOption] = useState("Sort by Default");
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [allProducts, searchTerm, priceRange, sortOption, selectedCategories]);

  const fetchData = async () => {
    setLoading(true);
    const q = query(collection(db, "products"), orderBy("id", "desc"));
    const snapshot = await getDocs(q);
    const productsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAllProducts(productsData);
    setLoading(false);
  };

  const applyFilters = () => {
    let filtered = allProducts;

    // Apply category filters
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    // Apply price range filters
    if (priceRange.min != "") {
      filtered = filtered.filter((product) => product.price >= priceRange.min);
    }
    if (priceRange.max != "") {
      filtered = filtered.filter((product) => product.price <= priceRange.max);
    }

    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortOption === "Sort by Price: ↑") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "Sort by Price: ↓") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    } else {
      // Default sorting (by ID descending)
      filtered = filtered.sort((a, b) => b.id - a.id);
    }

    setFilteredProducts(filtered);
    setTotalPages(Math.ceil(filtered.length / PAGE_SIZE));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handlePriceChange = (min, max) => {
    setPriceRange({ min: min, max: max });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((item) => item !== category)
      : [...selectedCategories, category];

    setSelectedCategories(updatedCategories);
  };

  const indexOfLastProduct = currentPage * PAGE_SIZE;
  const indexOfFirstProduct = indexOfLastProduct - PAGE_SIZE;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="bg-stone-50 min-h-screen mt-16">
      <Navbar />
      <Banner title={"Shop"} />

      <div className="flex flex-col lg:flex-row px-4 md:px-16 lg:px-18 py-8 ">
        <div className="flex flex-col flex-grow items-center w-full ">
          <div className="flex justify-between items-center mb-4 w-[86%]">
            <p className="text-gray-600 text-sm">
              Showing {currentProducts.length} of {filteredProducts.length}{" "}
              products
            </p>
            <SortDropdown onSortChange={handleSortChange} />
          </div>

          {loading ? (
            <div className="flex items-center justify-center object-center w-full mt-[25%]">
              <div className="">
                <span className="loading loading-infinity loading-lg text-mainColor"></span>
              </div>
            </div>
          ) : currentProducts.length === 0 ? (
            <div className="text-center mt-16 text-5xl text-gray-400">
              No Products Found
            </div>
          ) : (
            <div className="flex flex-wrap justify-center sm:w-1/2 md:w-4/5 md:gap-8 w-full lg:w-full animate-fadeIn">
              {currentProducts.map((product) => (
                <Card
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  imageUrl={product.imageUrl}
                  stockquantity={product.quantity}
                />
              ))}
            </div>
          )}
        </div>

        <ShopSidebar
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      <div className="mt-16 mb-16">
        {/* Pagination Controls */}
        {currentProducts.length === 0
          ? ""
          : renderPagination(currentPage, totalPages, handlePageChange)}
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
