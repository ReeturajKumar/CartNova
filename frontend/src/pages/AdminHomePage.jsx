import React, { useState } from "react";
import { Link } from "react-router-dom";

const AdminHomePage = () => {
  const orders = [
    {
      _id: "123456781",
      user: { name: "Reeturaj Kumar" },
      totalPrice: 1000,
      isDelivered: false,
    },
    {
      _id: "123456782",
      user: { name: "Reeturaj Kumar" },
      totalPrice: 1200,
      isDelivered: true,
    },
    {
      _id: "123456783",
      user: { name: "Reeturaj Kumar" },
      totalPrice: 1400,
      isDelivered: false,
    },
    {
      _id: "123456784",
      user: { name: "Reeturaj Kumar" },
      totalPrice: 800,
      isDelivered: true,
    },
    {
      _id: "123456785",
      user: { name: "Reeturaj Kumar" },
      totalPrice: 950,
      isDelivered: true,
    },
    {
      _id: "123456786",
      user: { name: "Reeturaj Kumar" },
      totalPrice: 400,
      isDelivered: false,
    },
    {
      _id: "123456787",
      user: { name: "Reeturaj Kumar" },
      totalPrice: 600,
      isDelivered: false,
    },
    {
      _id: "123456788",
      user: { name: "Reeturaj Kumar" },
      totalPrice: 720,
      isDelivered: true,
    },
    {
      _id: "123456789",
      user: { name: "Reeturaj Kumar" },
      totalPrice: 300,
      isDelivered: false,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 shadow rounded-lg bg-white">
          <h2 className="text-xl font-semibold mb-2">Revenue</h2>
          <p className="text-2xl font-bold">$1000</p>
        </div>

        <div className="p-4 shadow rounded-lg bg-white">
          <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
          <p className="text-2xl font-bold">{orders.length}</p>
          <Link to="/admin-panel/orders" className="text-gray-700 hover:underline">
            Manage Orders
          </Link>
        </div>

        <div className="p-4 shadow rounded-lg bg-white">
          <h2 className="text-xl font-semibold mb-2">Total Products</h2>
          <p className="text-2xl font-bold">100</p>
          <Link to="/admin-panel/products" className="text-gray-700 hover:underline">
            Manage Products
          </Link>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Latest Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase">Total Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentOrders.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-sm text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                currentOrders.map(order => (
                  <tr key={order._id}  className="hover:bg-gray-50 cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order.totalPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.isDelivered ? "Delivered" : "Not Delivered"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-sm font-medium rounded disabled:opacity-50 cursor-pointer"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-sm font-medium rounded disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
