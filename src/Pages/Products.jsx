import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Pagination from "../Components/Pagination";

const Products = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(9); // Fixed posts per page

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-stone-50">
      <Navbar />

      <div className=" mt-24 bg-[#f4f3ef] ">
        <div className="bg-product flex justify-center items-center h-72 ">
          <h2 className="text-5xl  md:text-5xl text-gray-700 p-5 font-bold">
            Collection
          </h2>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-10 ">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-3/4">
              {currentPosts.map((data, index) => (
                <div
                  key={index}
                  className="bg-white p-4 shadow-lg rounded-lg animate-fadeIn transition-all duration-300 hover:scale-105  "
                >
                  <div className="h-48 flex items-center justify-center ">
                    <p className="text-gray-700 text-lg font-semibold">
                      {data.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      )}
    </div>
  );
};

export default Products;
