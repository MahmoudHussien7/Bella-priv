import PageBanner from "../Components/PageBanner";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
const Checkout = () => {
  return (
    <div className="min-h-screen   mt-16">
      <Navbar />

      {/* Checkout Banner */}
      <PageBanner title="Checkout" />

      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="flex flex-col mt-8 lg:flex-row lg:space-x-8">
          {/* Billing Details */}
          <div className="lg:max-w-4xl w-full">
            <div className=" rounded p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 ">
                Billing details
              </h2>
              <form className="space-y-6 border-t-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="mt-2 block w-full border border-gray-300 rounded-md py-3 px-3 text-gray-900 bg-white focus:ring-black focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900">
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="mt-2 block w-full border border-gray-300 rounded-md py-3 px-3 text-gray-900 bg-white focus:ring-black focus:border-black"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    className="mt-2 block w-full border border-gray-300 rounded-md py-3 px-3 text-gray-900 bg-white focus:ring-black focus:border-black"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    userEmail address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="userEmail"
                    className="mt-2 block w-full border border-gray-300 rounded-md py-3 px-3 text-gray-900 bg-white focus:ring-black focus:border-black"
                  />
                </div>
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
              <li className="flex justify-between mb-2">
                <span className="text-gray-700">Becca bed × 1</span>
                <span className="text-gray-900 font-medium">21,000EGP</span>
              </li>
            </ul>
            <div className="border-t border-gray-300 pt-4">
              <div className="flex justify-between text-gray-700">
                <span className="font-semibold">Subtotal</span>
                <span>21,000EGP</span>
              </div>
              <div className="flex justify-between text-gray-900 font-semibold mt-2">
                <span>Total</span>
                <span>21,000EGP</span>
              </div>
            </div>
            <div className="mt-6">
              <label className="inline-flex items-center">
                <input type="radio" className="form-radio text-black" />
                <span className="ml-2 text-gray-700">Cash on pickup</span>
              </label>
              <br />
              <label className="inline-flex items-center mt-3">
                <input type="radio" className="form-radio text-black" />
                <span className="ml-2 text-gray-700">Pay with stripe</span>
              </label>
              <p className="text-sm text-gray-500 mt-2">
                {/* Pay with cash upon delivery. */}
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our privacy policy.
            </p>
            <button className="mt-6 w-full bg-gray-800 hover:bg-[#B48E61] text-white py-5 rounded  transition">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
