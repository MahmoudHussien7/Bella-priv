import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/Firebaseconfig";
import { setProducts } from "../../Redux/Slices/ProductSlice";
import Navbar from "../Components/Navbar";
import Banner from "../Components/shop/Banner";
import SortDropdown from "../Components/shop/SortDropdown";
import ShopSidebar from "../Components/shop/ShopSidebar";
import Card from "../Components/Card";
import Pagination from "../Components/Pagination"; // Ensure this import is correct

const Shop = () => {
  const postsPerPage = 9;
  const dispatch = useDispatch();
  const { items: products } = useSelector((state) => state.products); // Access products from Redux
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 200, max: 5000 });
  const [maxPrice, setMaxPrice] = useState(priceRange.max);
  const [sortOption, setSortOption] = useState("Sort by Default");
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Fetch products from Firestore and dispatch to Redux
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fetchedProducts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        dispatch(setProducts(fetchedProducts));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch]);

  // Handle pagination and filtering
  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

    filterProducts(searchTerm, maxPrice, sortOption, currentPosts);
  }, [products, currentPage, searchTerm, maxPrice, sortOption]);

  const filterProducts = (searchTerm, maxPrice, sortOption, products) => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = filtered.filter((product) => product.price <= maxPrice);

    switch (sortOption) {
      case "Sort by Popularity":
        // Add sorting logic for popularity if needed
        break;
      case "Sort by Latest":
        // Add sorting logic for latest if needed
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

  const handlePriceChange = (price) => {
    setMaxPrice(price);
    filterProducts(searchTerm, price, sortOption, products);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    filterProducts(term, maxPrice, sortOption, products);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    filterProducts(searchTerm, maxPrice, option, products);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-stone-50 min-h-screen">
      <Navbar />
      <Banner title={"Shop"} />

      <div className="flex flex-col lg:flex-row px-4 m lg:px-7 py-8">
        {/* Main Content Area */}
        <div className="flex flex-col flex-grow items-center w-full">
          <div className="flex justify-between items-center mb-4 w-[86%]">
            <p className="text-gray-600 text-sm">
              Showing {filteredPosts.length} results
            </p>
            <SortDropdown onSortChange={handleSortChange} />
          </div>

          <div className="flex flex-wrap justify-center sm:1/2 md:4/5 md:gap-8 w-[100%]">
            {loading ? (
              <p className="text-center mt-16">Loading...</p>
            ) : (
              filteredPosts.map((product) => (
                <Card
                  key={product.id}
                  title={product.title}
                  price={product.price}
                  imageUrl={product.imageUrl}
                />
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <ShopSidebar
          priceRange={priceRange}
          onPriceChange={handlePriceChange}
          onSearch={handleSearch}
        />
      </div>

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={products.length}
        paginate={paginate}
        currentPage={currentPage}
        className="mt-16"
      />
    </div>
  );
};

export default Shop;
