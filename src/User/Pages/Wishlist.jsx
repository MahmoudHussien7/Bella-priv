import { useSelector, useDispatch } from "react-redux";
import { toggleFavourite } from "../../Redux/Slices/FavouriteSlice";
import PageBanner from "../Components/PageBanner";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { addToCart } from "../../Redux/Slices/CartSlice";
import Pagination from "../Components/Pagination"; // Import Pagination component
import { useState } from "react";

const Wishlist = () => {
  const favouritemIds = useSelector((state) => state.favourites.items);
  const allProducts = useSelector((state) => state.products.items);
  const dispatch = useDispatch();
  const { userDetails } = useSelector((state) => state.auth);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Number of items per page

  // If userDetails is not available, return early with a message
  if (!userDetails) {
    return (
      <div className="flex flex-col min-h-screen ">
        <Navbar />
        <div className="flex-grow mt-16 mb-3">
          <PageBanner title="Wish List" />
          <div className="bg-white m-auto mt-10 max-w-4xl rounded shadow-md overflow-hidden mb-5">
            <p className="text-center py-10 text-gray-500">
              Please log in to view your wishlist.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Filter products to get only the favourites
  const favourites = allProducts.filter((product) =>
    favouritemIds.includes(product.id)
  );

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentItems = favourites.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddtoCart = (item) => {
    const itemWithQuantity = { ...item, stockquantity: item.quantity };
    dispatch(addToCart(itemWithQuantity));
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <div className="flex-grow mt-16 mb-3">
        <PageBanner title="Wish List" />

        <div className="bg-white m-auto mt-10 max-w-4xl rounded shadow-md overflow-hidden mb-5">
          {favourites.length === 0 ? (
            <p className="text-center py-10 text-gray-500">
              Your wishlist is empty.
            </p>
          ) : (
            <>
              {/* For small screens */}
              <div className="md:hidden flex flex-col space-y-4 p-4">
                {currentItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 bg-white border-b last:border-0 hover:bg-gray-50 transition p-4 rounded"
                  >
                    <div className="w-24">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-grow">
                      <span className="font-medium text-gray-700">
                        {item.title}
                      </span>
                      <div className="text-sm text-gray-600 mt-1">
                        Price: {item.price} EGP
                      </div>
                      <div
                        className={`text-sm mt-1 ${
                          item.quantity === 0
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {item.quantity === 0 ? "Out of stock" : "In stock"}
                      </div>
                      <div className="mt-2">
                        <button
                          onClick={() => handleAddtoCart(item)}
                          disabled={item.quantity === 0}
                          className={`py-2 px-4 rounded shadow ${
                            item.quantity === 0
                              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                              : "bg-black text-white hover:bg-gray-800"
                          }`}
                        >
                          {item.quantity === 0 ? "Add to cart" : "Add to cart"}
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => dispatch(toggleFavourite(item.id))}
                      className="text-gray-600 hover:text-red-500 transition"
                    >
                      &#10005;
                    </button>
                  </div>
                ))}
              </div>

              {/* For medium screens and above */}
              <div className="hidden md:block">
                <table className="min-w-full bg-white border-collapse text-sm md:text-base">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="w-12 py-4 text-gray-600"></th>
                      <th className="w-18 py-4 text-gray-600"></th>
                      <th className="py-4 text-gray-600 font-semibold text-left">
                        Product
                      </th>
                      <th className="py-4 text-gray-600 font-semibold text-center">
                        Price
                      </th>
                      <th className="py-4 text-gray-600 font-semibold text-center">
                        Stock Status
                      </th>
                      <th className="py-4 text-gray-600 font-semibold text-center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item) => (
                      <tr
                        key={item.id}
                        className="border-b last:border-0 hover:bg-gray-50 transition"
                      >
                        <td className="text-center py-4">
                          <button
                            onClick={() => dispatch(toggleFavourite(item.id))}
                            className="text-gray-600 hover:text-red-500 transition"
                          >
                            &#10005;
                          </button>
                        </td>
                        <td className="py-4">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-16 object-cover rounded"
                          />
                        </td>
                        <td className="py-4">
                          <span className="font-medium text-gray-700">
                            {item.title}
                          </span>
                        </td>
                        <td className="text-center text-gray-600">
                          {item.price} EGP
                        </td>
                        <td
                          className={`text-center ${
                            item.quantity === 0
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {item.quantity === 0 ? "Out of stock" : "In stock"}
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() => handleAddtoCart(item)}
                            disabled={item.quantity === 0}
                            className={`py-2 px-4 rounded shadow ${
                              item.quantity === 0
                                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                : "bg-black text-white hover:bg-[#B48E61]"
                            }`}
                          >
                            {item.quantity === 0
                              ? "Add to Cart"
                              : "Add to cart"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={favourites.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
