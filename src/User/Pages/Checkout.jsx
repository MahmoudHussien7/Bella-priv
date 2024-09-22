import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder } from "../../Redux/Slices/OrdersSlice";
import { clearCart } from "../../Redux/Slices/CartSlice";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Navbar from "../Components/Navbar";
import PageBanner from "../Components/PageBanner";
import Footer from "../Components/Footer";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckoutForm = ({ totalPrice, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const cart = useSelector((state) => state.cart.items);
  const isCartEmpty = cart.length === 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      setError("Stripe.js has not loaded yet.");
      setProcessing(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
    } else {
      onPaymentSuccess(paymentMethod.id);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-6">
        <CardElement />
      </div>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <button
        type="submit"
        disabled={isCartEmpty || !stripe || processing}
        className={`mt-6 w-full py-5 rounded transition text-white ${
          isCartEmpty || !stripe || processing
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-gray-800 hover:bg-[#B48E61]"
        }`}
      >
        {processing ? "Processing..." : `Pay ${totalPrice.toFixed(2)} EGP`}
      </button>
    </form>
  );
};

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);
  const isCartEmpty = cart.length === 0;

  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const { userDetails } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    paymentMethod: "pickup",
  });

  useEffect(() => {
    if (!userDetails) {
      navigate("/");
    }
  }, [userDetails, navigate]);

  const handlePaymentMethodChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, paymentMethod: e.target.value }));
  };

  const handlePlaceOrder = () => {
    if (!userDetails) {
      alert("Please log in to place an order.");
      return;
    }

    const orderData = {
      cart,
      userId: userDetails.userId,
      paymentMethod: form.paymentMethod,
    };

    dispatch(placeOrder(orderData))
      .unwrap()
      .then(() => {
        dispatch(clearCart());
        localStorage.removeItem("cart");
        setForm({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          paymentMethod: "pickup",
        });

        // Set flag in session storage
        sessionStorage.setItem("showTemporaryPage", "true");

        navigate("/success");
      })
      .catch((error) => {
        console.error("Failed to place order: ", error);
      });
  };

  const handlePaymentSuccess = (paymentMethodId) => {
    handlePlaceOrder(paymentMethodId);
  };

  return (
    <div className="min-h-screen mt-16">
      <Navbar />
      <PageBanner title="Checkout" />

      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="flex flex-col mt-8 lg:flex-row lg:space-x-8">
          {/* Billing Details */}
          <div className="lg:max-w-4xl w-full">
            <div className="rounded p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Billing details
              </h2>

              <form className="space-y-6 border-t-2">
                {!userDetails ? (
                  <div className="text-red-500 text-lg">
                    You need to be logged in to view or update your details.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    {/* Username Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900">
                        Username <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="username"
                        value={userDetails.userName || "Update your data"}
                        className="mt-2 block w-full border border-gray-300 rounded-md py-3 px-3 text-gray-900 focus:outline-none"
                        readOnly
                      />
                    </div>

                    {/* City Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={userDetails.city || "Update your data"}
                        className="mt-2 block w-full border border-gray-300 rounded-md py-3 px-3 text-gray-900 focus:outline-none"
                        readOnly
                      />
                    </div>
                  </div>
                )}

                {userDetails && (
                  <>
                    {/* Phone Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={userDetails.phone || "Update your data"}
                        className="mt-2 block w-full border border-gray-300 rounded-md py-3 px-3 text-gray-900 focus:outline-none"
                        readOnly
                      />
                    </div>

                    {/* User Email Address Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900">
                        User email address{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userDetails.userEmail || "Update your data"}
                        className="mt-2 block w-full border border-gray-300 rounded-md py-3 px-3 text-gray-900 focus:outline-none"
                        readOnly
                      />
                    </div>

                    {/* Address Field */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={userDetails.address || "Update your data"}
                        className="mt-2 block w-full border border-gray-300 rounded-md py-3 px-3 text-gray-900 focus:outline-none"
                        readOnly
                      />
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:max-w-md w-full bg-white shadow-md rounded p-6 mt-8 lg:mt-0 text-sm md:text-base h-fit">
            <h2 className="text-2xl font-semibold pb-6 border-b-2">
              Your order
            </h2>
            <ul className="mb-4 mt-6">
              <li className="flex justify-between mb-2">
                <span className="text-gray-700 font-medium">Product</span>
                <span className="text-gray-700 font-medium">Subtotal</span>
              </li>
              {cart.length > 0 ? (
                cart.map((item) => (
                  <li key={item.id} className="flex justify-between mb-2">
                    <span className="text-gray-700">
                      {item.title} × {item.quantity}
                    </span>
                    <span className="text-gray-900 font-medium">
                      {(item.price * item.quantity).toFixed(2)} EGP
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-gray-700">No items in cart.</li>
              )}
            </ul>
            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Subtotal</span>
                <span>{totalPrice.toFixed(2)} EGP</span>
              </div>
              <div className="flex justify-between text-gray-900 font-semibold mt-2">
                <span>Total</span>
                <span>{totalPrice.toFixed(2)} EGP</span>
              </div>
            </div>
            <div className="mt-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pickup"
                  checked={form.paymentMethod === "pickup"}
                  onChange={handlePaymentMethodChange}
                  className="form-radio text-black"
                />
                <span className="ml-2 text-gray-700">Cash on pickup</span>
              </label>
              <br />
              <label className="inline-flex items-center mt-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="visa"
                  checked={form.paymentMethod === "visa"}
                  onChange={handlePaymentMethodChange}
                  className="form-radio text-black"
                />
                <span className="ml-2 text-gray-700">Pay with stripe</span>
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our privacy policy.
            </p>
            {form.paymentMethod === "visa" ? (
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  totalPrice={totalPrice}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              </Elements>
            ) : (
              <button
                onClick={() => handlePlaceOrder()}
                disabled={isCartEmpty}
                className={`mt-6 w-full py-5 rounded transition text-white ${
                  isCartEmpty
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gray-800 hover:bg-[#B48E61]"
                }`}
              >
                PLACE ORDER
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
