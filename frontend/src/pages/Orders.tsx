import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Search, Filter, RefreshCw, ChevronDown, Eye } from "lucide-react";

const pageSize = 5;

const Orders: React.FC = () => {
  const { orders, selectedOrder, setSelectedOrder } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status
        ? "Completed"
        : "Pending" === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "date") {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else if (sortBy === "customer") {
      return sortOrder === "asc"
        ? a.customerName.localeCompare(b.customerName)
        : b.customerName.localeCompare(a.customerName);
    } else if (sortBy === "total") {
      return sortOrder === "asc" ? a.total - b.total : b.total - a.total;
    }
    return 0;
  });

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
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(sortedOrders.length / pageSize);

  // Slice orders to only show current page
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-800">Orders</h2>

          <div className="flex items-center space-x-2">
            <button
              className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={18} />
            </button>
            <button className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors">
              <RefreshCw size={18} />
            </button>
          </div>
        </div>

        <div
          className={`mb-6 transition-all duration-300 ${
            showFilters ? "max-h-40" : "max-h-0 overflow-hidden"
          }`}
        >
          <div className="p-4 bg-gray-50 rounded-lg flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Status
              </label>
              <div className="flex flex-wrap gap-2">
                {["all", "pending", "processing", "completed", "cancelled"].map(
                  (status) => (
                    <button
                      key={status}
                      className={`px-3 py-1 text-sm rounded-full ${
                        statusFilter === status
                          ? "bg-amber-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      onClick={() => handleStatusFilter(status)}
                    >
                      {status === "all"
                        ? "All"
                        : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sort By
              </label>
              <div className="flex gap-2">
                <button
                  className={`px-3 py-1 text-sm rounded-full flex items-center ${
                    sortBy === "date"
                      ? "bg-amber-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => handleSort("date")}
                >
                  Date
                  {sortBy === "date" && (
                    <ChevronDown
                      size={14}
                      className={`ml-1 transition-transform ${
                        sortOrder === "asc" ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-full flex items-center ${
                    sortBy === "customer"
                      ? "bg-amber-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => handleSort("customer")}
                >
                  Customer
                  {sortBy === "customer" && (
                    <ChevronDown
                      size={14}
                      className={`ml-1 transition-transform ${
                        sortOrder === "asc" ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-full flex items-center ${
                    sortBy === "total"
                      ? "bg-amber-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() => handleSort("total")}
                >
                  Total
                  {sortBy === "total" && (
                    <ChevronDown
                      size={14}
                      className={`ml-1 transition-transform ${
                        sortOrder === "asc" ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search orders by ID or customer name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
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
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedOrders.map((order) => (
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.items.length} items
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
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        className="p-1 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="mt-4 flex justify-center items-center space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 text-sm rounded border ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No orders found matching your search criteria.
            </p>
          </div>
        )}
      </div>

      {selectedOrder && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Order Details</h3>
              <p className="text-gray-500">#{selectedOrder.orderId}</p>
            </div>

            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedOrder(null)}
            >
              &times;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Customer Information
              </h4>
              <p className="text-gray-800 font-medium">
                {selectedOrder.customerName}
              </p>
              <p className="text-gray-600">
                Customer ID: {selectedOrder.customerId}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Order Information
              </h4>
              <p className="text-gray-600">
                Created: {formatDate(selectedOrder.createdAt)}
              </p>
              {selectedOrder.deliveryDate && (
                <p className="text-gray-600">
                  Delivery: {formatDate(selectedOrder.deliveryDate)}
                </p>
              )}
              <p className="text-gray-600">
                Status:
                <span
                  className={`ml-2 px-2 py-0.5 text-xs rounded-full capitalize ${getStatusClass(
                    selectedOrder.status
                  )}`}
                >
                  {selectedOrder.status ? "Completed" : "Pending"}{" "}
                </span>
              </p>
            </div>
          </div>

          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Order Items
          </h4>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit Price
                  </th>
                  <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedOrder.items.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700">
                      {item.name}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 text-right">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-700 text-right">
                      GHS{(item.unitPrice ?? 0).toFixed(2)}
                    </td>
                    <td className="px-4 py-2 text-sm font-medium text-gray-900 text-right">
                      GHS
                      {((item.quantity ?? 0) * (item.unitPrice ?? 0)).toFixed(
                        2
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-gray-50">
                  <td
                    colSpan={3}
                    className="px-4 py-2 text-sm font-medium text-gray-700 text-right"
                  >
                    Total:
                  </td>
                  <td className="px-4 py-2 text-sm font-bold text-gray-900 text-right">
                    GHS
                    {selectedOrder.items
                      .reduce(
                        (acc, item) =>
                          acc + (item.quantity ?? 0) * (item.unitPrice ?? 0),
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 text-sm font-medium text-white bg-amber-600 rounded-lg hover:bg-amber-700">
              Update Status
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Print Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
