// src/pages/CartPage.js
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Components/Navbar";
import PageBanner from "../Components/PageBanner";
import { removeFromCart, adjustQuantity } from "../../Redux/Slices/CartSlice";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  // Handle increment and decrement of quantity
  const handleAdjustQuantity = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(adjustQuantity({ id, quantity: newQuantity }));
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <PageBanner title="Cart" />

      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="flex flex-col mt-8 lg:flex-row lg:space-x-8">
          {/* Cart Items */}
          <div className="md:max-w-4xl w-full">
            <div className="bg-white rounded shadow-md overflow-hidden">
              {cart.length === 0 ? (
                <p className="text-center py-4">Your cart is empty.</p>
              ) : (
                <table className="min-w-full bg-white border-collapse text-sm md:text-base">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="w-12 py-4 text-gray-600"></th>
                      <th className="w-22 py-4 text-gray-600"></th>
                      <th className="py-4 text-gray-600 font-semibold text-left">
                        Product
                      </th>
                      <th className="py-4 text-gray-600 font-semibold text-center">
                        Price
                      </th>
                      <th className="py-4 text-gray-600 font-semibold text-center">
                        Quantity
                      </th>
                      <th className="py-4 text-gray-600 font-semibold text-center">
                        Subtotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
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
                        <td className="text-center">
                          <div className="inline-flex items-center space-x-2">
                            <button
                              onClick={() =>
                                handleAdjustQuantity(
                                  item.id,

                                  item.quantity + 1
                                )
                              }
                              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                            >
                              +
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() =>
                                handleAdjustQuantity(
                                  item.id,

                                  item.quantity - 1
                                )
                              }
                              disabled={item.quantity === 1}
                              className={`px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 ${
                                item.quantity === 1
                                  ? "cursor-not-allowed opacity-50"
                                  : ""
                              }`}
                            >
                              -
                            </button>
                          </div>
                        </td>
                        <td className="text-center text-gray-600">
                          {item.price * item.quantity} EGP
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Cart Totals */}
          <div className="lg:max-w-sm w-full bg-white shadow-md rounded p-4 mt-8 lg:mt-0 text-sm md:text-base">
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
            <Link
              to="/checkout"
              className="mt-4 bg-gray-800 text-white py-4 rounded hover:bg-gray-700 transition text-center block w-full"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
