import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import Navbar from "../Components/Navbar";
import PageBanner from "../Components/PageBanner";
import { removeFromCart, adjustQuantity } from "../../Redux/Slices/CartSlice";
import Footer from "../Components/Footer";
import Pagination from "../Components/Pagination"; // Import the Pagination component

const CartPage = () => {
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const { userDetails } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isCartEmpty = cart.length === 0;

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5; // Number of items per page

  // Get current items based on current page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentItems = cart.slice(indexOfFirstPost, indexOfLastPost);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle increment and decrement of quantity
  const handleAdjustQuantity = (id, newQuantity, stockquantity) => {
    if (newQuantity > 0) {
      dispatch(adjustQuantity({ id, quantity: newQuantity, stockquantity }));
    }
  };

  const handleProceedToCheckout = () => {
    if (!userDetails) {
      navigate("/login"); // Redirect to login if userDetails is not available
    } else {
      navigate("/checkout"); // Otherwise, proceed to checkout
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <Navbar />
      <PageBanner title="Cart" />

      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="flex flex-col mt-8 lg:flex-row lg:space-x-8">
          {/* Cart Items */}
          <div className="md:max-w-4xl w-full">
            <div className="bg-white rounded shadow-md overflow-hidden">
              {isCartEmpty ? (
                <p className="text-center py-4">Your cart is empty.</p>
              ) : (
                <>
                  {/* For small screens */}
                  <div className="md:hidden flex flex-col space-y-4 p-4">
                    {currentItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 bg-white border-b last:border-0 hover:bg-gray-50 transition p-4 rounded"
                      >
                        <div className="w-16">
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
                          <div className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </div>
                          <div className="text-sm text-gray-600">
                            Subtotal: {item.price * item.quantity} EGP
                          </div>
                        </div>
                        <button
                          onClick={() => dispatch(removeFromCart(item))}
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
                          <th className="w-22 py-4 text-gray-600"></th>
                          <th className="py-4 text-gray-600 font-semibold text-left">
                            Product
                          </th>
                          <th className="py-4 text-gray-600 font-semibold text-center w-28">
                            Price
                          </th>
                          <th className="py-4 text-gray-600 font-semibold text-center w-28">
                            Quantity
                          </th>
                          <th className="py-4 text-gray-600 font-semibold text-center w-28">
                            Subtotal
                          </th>
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
                                onClick={() => dispatch(removeFromCart(item))}
                                className="text-gray-600 hover:text-red-500 transition"
                              >
                                &#10005;
                              </button>
                            </td>
                            <td className="py-4 h-10 w-20 object-cover">
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
                            <td className="text-center w-28">
                              <div className="inline-flex items-center">
                                <button
                                  onClick={() =>
                                    handleAdjustQuantity(
                                      item.id,
                                      item.quantity + 1,
                                      item.stockquantity
                                    )
                                  }
                                  className="w-6 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                                >
                                  +
                                </button>
                                <span className="w-8 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleAdjustQuantity(
                                      item.id,
                                      item.quantity - 1,
                                      item.stockquantity
                                    )
                                  }
                                  disabled={item.quantity === 1}
                                  className={`w-6 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 ${
                                    item.quantity === 1
                                      ? "cursor-not-allowed opacity-50"
                                      : ""
                                  }`}
                                >
                                  -
                                </button>
                              </div>
                            </td>
                            <td className="text-center w-28 text-gray-600">
                              {item.price * item.quantity} EGP
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
              totalPosts={cart.length}
              paginate={paginate}
              currentPage={currentPage}
            />
          </div>

          {/* Cart Totals */}
          <div className="lg:max-w-sm w-full h-fit bg-white shadow-md rounded p-4 mt-8 lg:mt-0 text-sm md:text-base">
            <h2 className="text-lg font-semibold pb-4">Cart totals</h2>
            <div className="mt-4">
              <div className="flex justify-between border-b pb-2">
                <p className="text-gray-600">Total Items</p>
                <p className="font-semibold">{totalQuantity}</p>
              </div>
              <div className="flex justify-between border-b pb-2 mt-2">
                <p className="text-gray-600">Total Price</p>
                <p className="font-semibold">{totalPrice} EGP</p>
              </div>
            </div>
            <button
              onClick={handleProceedToCheckout}
              disabled={isCartEmpty} // Disable if cart is empty
              className={`mt-4 py-4 rounded text-center block w-full transition ${
                isCartEmpty
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-[#B48E61] text-white"
              }`}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
