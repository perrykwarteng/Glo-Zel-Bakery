import React from "react";
import { useAppContext } from "../../context/AppContext";
import { BarChart, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";

const SalesChart: React.FC = () => {
  const { productSales, timeRange, setTimeRange } = useAppContext();

  // Sort products by revenue
  const sortedProducts = [...productSales].sort(
    (a, b) => b.revenue - a.revenue
  );

  // Calculate the max revenue for proper scaling
  const maxRevenue = Math.max(
    ...sortedProducts.map((product) => product.revenue)
  );

  // Helper function to get the percentage of the bar
  const getBarPercentage = (revenue: number) => {
    return (revenue / maxRevenue) * 100;
  };

  const timeRangeOptions = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "year", label: "This Year" },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <BarChart size={20} className="text-amber-600 mr-2" />
          <h2 className="text-lg font-bold text-gray-800">Product Sales</h2>
        </div>

        <div className="flex items-center space-x-2">
          {timeRangeOptions.map((option) => (
            <button
              key={option.value}
              className={`px-3 py-1 rounded-md text-sm ${
                timeRange === option.value
                  ? "bg-amber-100 text-amber-800 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => setTimeRange(option.value as any)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              $
              {sortedProducts
                .reduce((acc, curr) => acc + curr.revenue, 0)
                .toFixed(2)}
            </h3>
            <p className="text-gray-500 text-sm">Total Revenue</p>
          </div>

          <div className="flex items-center space-x-1 text-green-600">
            <TrendingUp size={18} />
            <span className="font-medium">+12.5%</span>
          </div>
        </div>

        <div className="space-y-4">
          {sortedProducts.map((product) => (
            <div key={product.productId} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-gray-800 font-medium">
                    {product.productName}
                  </span>
                  <span className="text-gray-500 text-sm ml-2">
                    ({product.quantity} sold)
                  </span>
                </div>
                <div className="text-gray-800 font-medium">
                  ${product.revenue.toFixed(2)}
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-amber-500 h-2.5 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${getBarPercentage(product.revenue)}%` }}
                ></div>
              </div>

              <div className="flex items-center text-xs">
                <span
                  className={`flex items-center ${
                    Math.random() > 0.3 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {Math.random() > 0.3 ? (
                    <ArrowUp size={12} className="mr-1" />
                  ) : (
                    <ArrowDown size={12} className="mr-1" />
                  )}
                  {Math.floor(Math.random() * 20) + 1}%
                </span>
                <span className="text-gray-500 ml-2">vs previous period</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
