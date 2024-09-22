import DecorationImage from "../../assets/Images/Decoration.jpg";
import HeaderWithSubPath from "./HeaderWithSubPath";

const CouponCard = () => {
  const couponData = [
    {
      image: DecorationImage,
      discount: "20% OFF",
      description: "ON DRINKS",
      expiry: "Jul 07, 2020",
    },
    {
      image: DecorationImage,
      discount: "15% OFF",
      description: "ON APPETIZERS",
      expiry: "Aug 10, 2020",
    },
    {
      image: DecorationImage,
      discount: "10% OFF",
      description: "ON DESSERTS",
      expiry: "Sep 15, 2020",
    },
  ];

  return (
    <div className="px-4 sm:px-6">
      <HeaderWithSubPath title="Coupons" />
      <div className="flex flex-wrap justify-center w-full">
        {couponData.map((coupon, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-60 sm:w-64 md:w-72 bg-white rounded-xl shadow p-3 sm:p-4 m-2 overflow-hidden border border-gray-200"
          >
            {/* Circles on Left and Right */}
            <div className="absolute top-1/2 transform -translate-y-1/2 -left-2 w-3 h-3 sm:w-4 sm:h-4 bg-[#e0e1dd] rounded-full shadow-2xl"></div>
            <div className="absolute top-1/2 transform -translate-y-1/2 -right-2 w-3 h-3 sm:w-4 sm:h-4 bg-[#e0e1dd] rounded-full shadow-2xl"></div>

            <div className="flex items-center">
              {/* Coupon Image */}
              <img
                src={coupon.image}
                alt="Coupon Item"
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg object-cover"
              />

              {/* Dashed Divider Line */}
              <div className="h-14 sm:h-16 md:h-20 mx-2 border-l-2 border-dashed border-gray-300"></div>

              {/* Coupon Details */}
              <div>
                <h3 className="font-bold text-sm sm:text-base md:text-lg text-titleColor font-montserrat">
                  {coupon.discount}
                  <div className="text-xs sm:text-sm md:text-base font-normal text-gray-500">
                    {coupon.description}
                  </div>
                </h3>
                <div className="flex justify-between text-xs sm:text-sm md:text-base text-gray-500 mt-2">
                  <span className="pr-2">Before</span>
                  <span>{coupon.expiry}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CouponCard;
