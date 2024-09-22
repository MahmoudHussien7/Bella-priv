import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import successImage from "../../assets/Images/404-bg.jpg";

const Success = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    sessionStorage.removeItem("showTemporaryPage");
    navigate("/");
  };
  useEffect(() => {
    // Check sessionStorage for the flag
    const showTemporaryPage = sessionStorage.getItem("showTemporaryPage");
    if (showTemporaryPage !== "true") {
      navigate("/"); // Redirect to home if the flag is not set
    }
  }, [navigate]);
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${successImage})` }}
    >
      <div
        className="text-center p-4 sm:p-6 md:p-8 shadow-md rounded w-11/12 sm:w-10/12 md:max-w-lg"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.3)", // Adjust the opacity here
        }}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6">
          Thank you for your purchase.
        </p>
        <button
          onClick={handleGoHome}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-md hover:bg-[#B48E61] transition duration-300"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
