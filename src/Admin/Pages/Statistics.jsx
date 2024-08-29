import HeaderWithSubPath from '../Components/HeaderWithSubPath';
import StatisticsCards from '../Components/StatisticsCards';
import BalanceOverview from '../Components/BalanceOverview';
import CouponCard from '../Components/CouponCard';

const Statistics = () => {
  return (
    <div >
      {/* Header with breadcrumb */}
      <HeaderWithSubPath title="Dashboard" breadcrumb="Home / Dashboard" />

      {/* Statistics Components */}
      <StatisticsCards />
      <BalanceOverview />
      <CouponCard />
    </div>
  );
};

export default Statistics;
