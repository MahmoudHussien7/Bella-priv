import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Pagination from "../Components/Pagination";
import Card from "../Components/Card";
import { Link } from "react-router-dom";

const Products = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("../public/db.json");
        const data = await response.json();
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching the products:", error);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-stone-50 min-h-screen">
      <Navbar />

      <div className="mt-16 bg-[#f4f3ef]">
        <div className="bg-product flex justify-center items-center h-72">
          <h2 className="text-5xl md:text-5xl text-gray-700 p-5 font-bold">
            Collection
          </h2>
        </div>
      </div>

      {loading ? (
        <p className="text-center mt-16">Loading...</p>
      ) : (
        <div className="mt-16 flex flex-col lg:flex-row  ">
          <div className="w-auto lg:w-1/6 p-4 bg-[#F4F3EF] shadow-sm rounded-sm mb-6 lg:mb-0">
            {/* Sidebar Content */}
            <div className="border-b border-gray-300 pb-4 mb-4">
              <div tabIndex={0} className="collapse collapse-plus">
                <div className="collapse-title text-xl font-medium text-gray-700">
                  Bedrooms
                </div>
                <div className="collapse-content">
                  <p>
                    <Link
                      to="/products/bedrooms/beds"
                      className="hover:underline"
                    >
                      - Beds
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/products/bedrooms/wardrobe"
                      className="hover:underline"
                    >
                      - Wardrobe
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/products/bedrooms/nightstand"
                      className="hover:underline"
                    >
                      - Nightstand
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-300 pb-4 mb-4">
              <div tabIndex={0} className="collapse collapse-plus">
                <div className="collapse-title text-xl font-medium text-gray-700">
                  Living Rooms
                </div>
                <div className="collapse-content">
                  <p>
                    <Link
                      to="/products/living-rooms/sofa"
                      className="hover:underline"
                    >
                      - Sofa
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/products/living-rooms/tables"
                      className="hover:underline"
                    >
                      - Tables
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/products/living-rooms/chairs"
                      className="hover:underline"
                    >
                      - Chairs
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="border-b border-gray-300 pb-4">
              <div tabIndex={0} className="collapse collapse-plus">
                <div className="collapse-title text-xl font-medium text-gray-700">
                  Decoration
                </div>
                <div className="collapse-content">
                  <p>
                    <Link
                      to="/products/decoration/flowers"
                      className="hover:underline"
                    >
                      - Flowers
                    </Link>
                  </p>
                  <p>
                    <Link
                      to="/products/decoration/lighting"
                      className="hover:underline"
                    >
                      - Lighting
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Products Container */}
          <div className="">
            <div className="flex flex-wrap justify-center gap-16 sm:1/2 md:4/5 md:gap-8 px-4 w-full">
              {currentPosts.map((product) => (
                <Card
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  imageUrl={product.imageUrl}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
        currentPage={currentPage}
        className="mt-16"
      />
    </div>
  );
};

export default Products;
