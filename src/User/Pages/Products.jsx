import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import CollectionCard from "../Components/CollectionCard";
import { fetchProducts } from "../../Redux/Slices/ProductsSlice"; // Update this path if necessary
import Footer from "../Components/Footer";
import PageBanner from "../Components/PageBanner";
import { renderPagination } from "../Pages/RenderPagination"; // Adjust this import

const Products = () => {
  const PAGE_SIZE = 9; // Number of items per page
  const dispatch = useDispatch();
  const { items: allProducts, loading } = useSelector(
    (state) => state.products
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(allProducts);
  }, [allProducts]);

  // Get current products based on currentPage
  const indexOfLastProduct = currentPage * PAGE_SIZE;
  const indexOfFirstProduct = indexOfLastProduct - PAGE_SIZE;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

  const handlePageChange = (page) => {
    if (page === currentPage || page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="bg-stone-50 min-h-screen ">
      <Navbar />

      <div className="mt-16 bg-[#f4f3ef] px-[7%] animate-fadeIn">
        <PageBanner title="Collection" />
      </div>

      {loading ? (
        <div className="text-center mt-16 ">
          <div className="flex items-center justify-center w-full mt-[25%]">
            <div className="">
              <span className="loading loading-infinity loading-lg text-mainColor"></span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center mb-16 animate-fadeIn">
          {/* Products Container */}
          <div className="flex flex-wrap justify-center gap-16 sm:w-1/2 md:w-4/5 md:gap-8 lg:w-11/12 w-full">
            {currentProducts.map((product) => (
              <CollectionCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                imageUrl={product.imageUrl}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          {renderPagination(currentPage, totalPages, handlePageChange)}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Products;
