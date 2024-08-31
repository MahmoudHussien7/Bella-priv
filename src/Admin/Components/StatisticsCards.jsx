const StatisticsCards = () => {
  return (
    <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
      <div className="bg-white shadow-md rounded-lg p-3 sm:p-4 flex flex-col items-start justify-between w-full">
        <div className="text-xs sm:text-sm font-medium text-gray-600">
          Earned
        </div>
        <div className="text-xl sm:text-2xl font-bold text-gray-900">
          1.268 USD
        </div>
        <div className="text-xs sm:text-sm text-green-600">+247 ⬈</div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-3 sm:p-4 flex flex-col items-start justify-between w-full">
        <div className="text-xs sm:text-sm font-medium text-gray-600">
          Spent
        </div>
        <div className="text-xl sm:text-2xl font-bold text-gray-900">
          268 USD
        </div>
        <div className="text-xs sm:text-sm text-red-600">-110 ⬊</div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-3 sm:p-4 flex flex-col items-start justify-between w-full">
        <div className="text-xs sm:text-sm font-medium text-gray-600">
          Users
        </div>
        <div className="text-xl sm:text-2xl font-bold text-gray-900">
          868 DAY
        </div>
        <div className="text-xs sm:text-sm text-green-600">+97 ⬈</div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-3 sm:p-4 flex flex-col items-start justify-between w-full">
        <div className="text-xs sm:text-sm font-medium text-gray-600">
          Conversion
        </div>
        <div className="text-xl sm:text-2xl font-bold text-gray-900">
          26.31 %
        </div>
        <div className="text-xs sm:text-sm text-green-600">+15.9% ⬈</div>
      </div>
    </div>
  );
};

export default StatisticsCards;
