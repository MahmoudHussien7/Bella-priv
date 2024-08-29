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
    <div className="p-6">
      <HeaderWithSubPath
            title="Coupons" 
          />
      <div className="flex overflow-x-auto space-x-4 p-4">
        {couponData.map((coupon, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 w-72 bg-white rounded-xl shadow p-4 m-2 overflow-hidden border border-gray-200"
          >
            {/* Circles on Left and Right */}
            <div className="absolute top-1/2 transform -translate-y-1/2 -left-2 w-4 h-4 bg-[#e0e1dd] rounded-full shadow-2xl"></div>
            <div className="absolute top-1/2 transform -translate-y-1/2 -right-2 w-4 h-4 bg-[#e0e1dd] rounded-full shadow-2xl"></div>

            <div className="flex items-center">
              {/* Coupon Image */}
              <img
                src={coupon.image}
                alt="Coupon Item"
                className="w-20 h-20 rounded-lg object-cover"
              />

              {/* Dashed Divider Line */}
              <div className="h-20 mx-2 border-l-2 border-dashed border-gray-300"></div>

              {/* Coupon Details */}
              <div>
                <h3 className="font-bold text-lg text-titleColor font-montserrat">
                  {coupon.discount}{" "}
                  <div className="text-sm font-normal text-gray-500">
                    {coupon.description}
                  </div>
                </h3>
                <div className="flex justify-between text-sm text-gray-500 mt-2">
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
