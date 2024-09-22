import HeaderWithSubPath from "../Components/HeaderWithSubPath";
import StatisticsCards from "../Components/StatisticsCards";
import BalanceOverview from "../Components/BalanceOverview";
import CouponCard from "../Components/CouponCard";

const Statistics = () => {
  return (
    <div className="space-y-6">
      <HeaderWithSubPath title="Dashboard" breadcrumb="Home / Dashboard" />
      <StatisticsCards />
      <BalanceOverview />
      <CouponCard />
    </div>
  );
};

export default Statistics;
