import PageBanner from "../Components/PageBanner";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
const ContactUs = () => {
  return (
    <div className="bg-white min-h-screen mt-16">
      <Navbar />

      {/* Header Section */}
      <PageBanner title="Contact Us" bg_image="/ciri-hm-bg.jpg" />

      {/* Contact Form Section */}
      <div className="container max-w-7xl mx-auto px-4 py-12 mt-10 flex flex-col lg:flex-row gap-12">
        {/* Contact Form */}
        <div className="flex-1 space-y-6">
          <p className="text-3xl text-gray-700">
            If you have any questions or concerns about this privacy policy or
            our practices, please contact us at <br /> info@Bella.store
          </p>
          <form className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Full name"
                className="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none focus:ring-0  sm:text-sm bg-transparent"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Phone number"
                className="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none sm:text-sm bg-transparent"
              />
            </div>
            <div>
              <input
                type="userEmail"
                placeholder="userEmail Address"
                className="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none sm:text-sm bg-transparent"
              />
            </div>
            <div>
              <textarea
                placeholder="Leave a message"
                className="mt-1 block w-full px-3 py-2 border-b border-gray-300 focus:outline-none sm:text-sm bg-transparent"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="inline-flex justify-center py-3 px-6 border border-gray-300 shadow-sm text-sm font-medium  text-black bg-transparent hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send a message
            </button>
          </form>
        </div>

        {/* Google Map Section */}
        <div className="flex-1 mt-8 lg:mt-0 sm:ml-0 lg:ml-8">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3455.424120810197!2d31.429572075342982!3d29.99597597494805!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjnCsDU5JzQ1LjUiTiAzMcKwMjUnNTUuNyJF!5e0!3m2!1sen!2seg!4v1726742788334!5m2!1sen!2seg"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            className="rounded-md shadow-md"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
