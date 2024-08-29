

const StatisticsCards = () => {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Earned Card */}
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start justify-between">
        <div className="text-sm font-medium text-gray-600 font-montserrat">Earned</div>
        <div className="text-2xl font-bold font-montserrat text-gray-900">1.268 USD</div>
        <div className="text-sm text-green-600 font-montserrat">+247 ⬈</div>
      </div>
      
      {/* Spent Card */}
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start justify-between">
        <div className="text-sm font-medium font-montserrat text-gray-600">Spent</div>
        <div className="text-2xl font-bold font-montserrat text-gray-900">268 USD</div>
        <div className="text-sm text-red-600 font-montserrat">-110 ⬊</div>
      </div>
      
      {/* Users Card */}
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start justify-between">
        <div className="text-sm font-medium font-montserrat text-gray-600">Users</div>
        <div className="text-2xl font-bold font-montserrat text-gray-900">868 DAY</div>
        <div className="text-sm text-green-600 font-montserrat">+97 ⬈</div>
      </div>
      
      {/* Conversion Card */}
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start justify-between">
        <div className="text-sm font-medium font-montserrat text-gray-600">Conversion</div>
        <div className="text-2xl font-bold font-montserrat text-gray-900">26.31 %</div>
        <div className="text-sm text-green-600 font-montserrat">+15.9% ⬈</div>
      </div>
    </div>
  );
};

export default StatisticsCards;
