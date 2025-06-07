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
  const [currentPage, setCurrentPage] = useState(1);

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

  const getStatusClass = (status: boolean) => {
    return status
      ? "bg-green-100 text-green-800"
      : "bg-amber-100 text-amber-800";
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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "completed"
        ? order.status === true
        : statusFilter === "pending"
        ? order.status === false
        : order.status?.toString().toLowerCase() === statusFilter;

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
      const totalA = a.items.reduce(
        (sum, item) => sum + (item.quantity ?? 0) * (item.unitPrice ?? 0),
        0
      );
      const totalB = b.items.reduce(
        (sum, item) => sum + (item.quantity ?? 0) * (item.unitPrice ?? 0),
        0
      );
      return sortOrder === "asc" ? totalA - totalB : totalB - totalA;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedOrders.length / pageSize);

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
                      {status.charAt(0).toUpperCase() + status.slice(1)}
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
                {["date", "customer", "total"].map((field) => (
                  <button
                    key={field}
                    className={`px-3 py-1 text-sm rounded-full flex items-center ${
                      sortBy === field
                        ? "bg-amber-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => handleSort(field)}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                    {sortBy === field && (
                      <ChevronDown
                        size={14}
                        className={`ml-1 transition-transform ${
                          sortOrder === "asc" ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>
                ))}
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
                {[
                  "Order ID",
                  "Customer",
                  "Date",
                  "Items",
                  "Total",
                  "Status",
                ].map((header) => (
                  <th
                    key={header}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
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
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    #{order.orderId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {order.items.length} items
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    GHS
                    {order.items
                      .reduce(
                        (acc, item) =>
                          acc + (item.quantity ?? 0) * (item.unitPrice ?? 0),
                        0
                      )
                      .toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status ? "Completed" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <div className="flex justify-end">
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

        {totalPages > 1 && (
          <div className="flex justify-between items-center p-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <div className="space-x-1">
              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 text-sm rounded border ${
                      page === currentPage
                        ? "bg-amber-100 font-bold"
                        : "border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
            </div>
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
        )}

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
                  {selectedOrder.status ? "Completed" : "Pending"}
                </span>
              </p>
            </div>
          </div>

          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Order Items
          </h4>
          <ul className="divide-y divide-gray-200">
            {selectedOrder.items.map((item, index) => (
              <li key={index} className="py-2">
                <div className="flex justify-between items-center text-sm">
                  <span>{item.name}</span>
                  <span>
                    {item.quantity} × GHS{item.unitPrice?.toFixed(2)} = GHS
                    {((item.quantity ?? 0) * (item.unitPrice ?? 0)).toFixed(2)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center text-sm font-semibold text-gray-800 mt-4">
            <span>Total</span>
            <span>
              GHS
              {selectedOrder.items
                .reduce(
                  (total, item) =>
                    total + (item.quantity ?? 0) * (item.unitPrice ?? 0),
                  0
                )
                .toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
