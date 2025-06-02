import React from "react";
import { useAppContext } from "../../context/AppContext";
import { ChevronRight } from "lucide-react";

const RecentOrdersTable: React.FC = () => {
  const { orders, setSelectedOrder, setActivePage } = useAppContext();

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 5);

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setActivePage("orders");
  };

  const getStatusClass = (status: boolean) => {
    switch (status) {
      case true:
        return "bg-green-100 text-green-800";
      case false:
        return "bg-amber-100 text-amber-800";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800">Recent Orders</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <tr
                key={order.orderId}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  #{order.orderId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {order.customerName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {formatDate(order.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  GHS
                  {order.items
                    .reduce(
                      (acc, item) =>
                        acc + (item.quantity ?? 0) * (item.unitPrice ?? 0),
                      0
                    )
                    .toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusClass(
                      order.status
                    )}`}
                  >
                    {order.status ? "Completed" : "Pending"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button
                    className="text-amber-600 hover:text-amber-900 flex items-center justify-end w-full"
                    onClick={() => handleViewOrder(order)}
                  >
                    <span className="mr-1">View</span>
                    <ChevronRight size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-gray-200 text-center">
        <button
          className="text-amber-600 hover:text-amber-900 text-sm font-medium"
          onClick={() => setActivePage("orders")}
        >
          View All Orders
        </button>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
