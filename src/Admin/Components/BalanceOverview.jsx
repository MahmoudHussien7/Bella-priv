import { FaStripeS } from "react-icons/fa";

const BalanceOverview = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6">
      {/* Left Section: Balance and Total Earnings */}
      <div className="flex flex-col lg:flex-row bg-white shadow rounded-lg p-6 w-full lg:w-2/3">
        {/* Balance Card */}
        <div className="flex flex-col flex-1 justify-around p-4 border-r border-gray-200">
     <div></div>

          {/* Balance Info */}
          <div className="text-center mx-auto">
            <div className="text-xl font-medium mb-2 text-titleColor font-montserrat">Balance</div>
            <div className="text-5xl font-bold mb-1 font-montserrat">12.268</div>
            <div className="text-sm text-gray-500 mb-4 font-montserrat">USD (United States)</div>
            <button className="bg-mainColor text-white font-medium  px-4 py-2 rounded-full flex items-center justify-center">
              <i className="fab fa-paypal text-xl mr-2 font-montserrat"></i><span><FaStripeS className="text-xl mr-2 " /></span> Payout with Stripe
            </button>
          </div>
        </div>

        {/* Total Earnings */}
        <div className="flex flex-1 flex-col p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="text-lg font-medium text-titleColor font-montserrat">Total earnings</div>
            <div className="text-gray-500 text-sm font-montserrat">By date <i className="fas fa-chevron-down ml-1"></i></div>
          </div>
          {/* Earnings Graph */}
          <div className="flex flex-col space-y-4">
            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, index) => (
              <div key={index} className="flex items-center">
                <div className="w-full bg-gray-100 rounded-full h-2 mr-7">
                  <div className="bg-mainColor h-2 rounded-full" style={{ width: `${(index + 1) * 15}%` }}></div>
                </div>
                <span className="text-xs text-gray-500 font-montserrat">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section: Payments and Bills */}
      <div className="bg-white shadow rounded-lg p-6 w-full lg:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-medium font-montserrat text-titleColor">Users</div>
          <i className="fas fa-ellipsis-h text-gray-500"></i>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {[
            {  name: 'Maria Miller',  time: '12:43', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
            {  name: 'Sienna Richards', time: 'Yesterday', image: 'https://randomuser.me/api/portraits/women/55.jpg' },
            {  name: 'Diana Lauretaix',  time: '02 Feb', image: 'https://randomuser.me/api/portraits/women/66.jpg' },
            {  name: 'Daniel Montgomery', time: '04 Feb', image: 'https://randomuser.me/api/portraits/men/77.jpg' },
          ].map((transaction, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={transaction.image} alt={transaction.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  
                  <div className="text-sm text-gray-600 font-montserrat">{transaction.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 font-montserrat">{transaction.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* All Transactions Link */}
        <div className="text-blue-600 text-sm mt-4 font-montserrat">See more...</div>
      </div>
    </div>
  );
};

export default BalanceOverview;
