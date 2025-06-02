import React from "react";
import { useAppContext } from "../../context/AppContext";
import { ShoppingCart, DollarSign, TrendingUp, Clock } from "lucide-react";

const DashboardSummaryCards: React.FC = () => {
  const { dashboardSummary } = useAppContext();

  const cards = [
    {
      title: "Total Orders",
      value: dashboardSummary.totalOrders,
      icon: <ShoppingCart size={20} />,
      color: "bg-blue-500",
    },
    {
      title: "Total Revenue",
      value: `GHS${dashboardSummary.totalRevenue.toFixed(2)}`,
      icon: <DollarSign size={20} />,
      color: "bg-green-500",
    },
    {
      title: "Average Order",
      value: `GHS${dashboardSummary.averageOrderValue.toFixed(2)}`,
      icon: <TrendingUp size={20} />,
      color: "bg-amber-500",
    },
    {
      title: "Pending Orders",
      value: dashboardSummary.pendingOrders,
      icon: <Clock size={20} />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">{card.title}</p>
              <h3 className="text-2xl font-bold mt-2 text-gray-800">
                {card.value}
              </h3>
            </div>
            <div className={`${card.color} p-3 rounded-full text-white`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardSummaryCards;
