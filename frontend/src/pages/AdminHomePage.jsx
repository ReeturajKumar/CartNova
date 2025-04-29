import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProducts } from './../redux/slice/adminProductSllice';
import { fetchAdminOrders } from './../redux/slice/adminOrderSlice';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { saveAs } from 'file-saver';

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const { products, loading: productLoading, error: productError } = useSelector((state) => state.adminProduct);
  const { orders, totalOrders, totalSales, loading: orderLoading, error: orderError } = useSelector((state) => state.adminOrder);

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders?.slice(indexOfFirstOrder, indexOfLastOrder) || [];
  const totalPages = Math.ceil((orders?.length || 0) / ordersPerPage);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  // Pagination Functions
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  // Aggregate Orders by Date
  const aggregateOrdersByDate = (orders) => {
    const ordersByDate = {};

    orders.forEach(order => {
      const orderDate = new Date(order.createdAt).toLocaleDateString();
      if (!ordersByDate[orderDate]) {
        ordersByDate[orderDate] = 0;
      }
      ordersByDate[orderDate] += 1;
    });

    return Object.keys(ordersByDate).map(date => ({
      date,
      totalOrders: ordersByDate[date],
    }));
  };

  // Aggregate Revenue by Date
  const aggregateRevenueByDate = (orders) => {
    const revenueByDate = {};

    orders.forEach(order => {
      const orderDate = new Date(order.createdAt).toLocaleDateString();
      if (!revenueByDate[orderDate]) {
        revenueByDate[orderDate] = 0;
      }
      revenueByDate[orderDate] += order.totalPrice;
    });

    return Object.keys(revenueByDate).map(date => ({
      date,
      totalRevenue: revenueByDate[date],
    }));
  };

  const chartData = aggregateOrdersByDate(orders);
  const revenueChartData = aggregateRevenueByDate(orders);

  // Custom Bar Shape for Revenue Chart
  const CustomBarShape = (props) => {
    const { x, y, width, height } = props;
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="#82ca9d"
        stroke="rgba(0, 0, 0, 0.1)"
        strokeWidth="2"
        rx="5" // Rounded corners for the bars
      />
    );
  };

  // CSV Export Function
  const downloadCSV = (data, filename) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);
    csvRows.push(headers.join(',')); // Add headers to the CSV

    data.forEach(row => {
      const values = headers.map(header => row[header]);
      csvRows.push(values.join(','));
    });

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    saveAs(blob, filename);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {(productLoading || orderLoading) ? (
        <p>Loading...</p>
      ) : (productError || orderError) ? (
        <p className="text-red-500">{productError || orderError}</p>
      ) : (
        <>
          {/* Numbers Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 shadow rounded-lg bg-white">
              <h2 className="text-xl font-semibold mb-2">Revenue</h2>
              <p className="text-2xl font-bold">${totalSales.toFixed(2)}</p>
            </div>

            <div className="p-4 shadow rounded-lg bg-white">
              <h2 className="text-xl font-semibold mb-2">Total Orders</h2>
              <p className="text-2xl font-bold">{totalOrders}</p>
              <Link to="/admin-panel/orders" className="text-gray-700 hover:underline">
                Manage Orders
              </Link>
            </div>

            <div className="p-4 shadow rounded-lg bg-white">
              <h2 className="text-xl font-semibold mb-2">Total Products</h2>
              <p className="text-2xl font-bold">{products.length}</p>
              <Link to="/admin-panel/products" className="text-gray-700 hover:underline">
                Manage Products
              </Link>
            </div>
          </div>

          {/* Chart Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Total Orders Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Total Orders Overview</h2>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" hide={true} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalOrders" barSize={20} fill="#8884d8" />
                  <Line type="monotone" dataKey="totalOrders" stroke="#82ca9d" />
                </ComposedChart>
              </ResponsiveContainer>
              <button
                onClick={() => downloadCSV(chartData, 'orders_overview.csv')}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Download CSV
              </button>
            </div>

            {/* Revenue Sales Chart */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-4">Revenue Sales Overview</h2>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={revenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" hide={true} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="totalRevenue" barSize={30} shape={CustomBarShape} />
                </ComposedChart>
              </ResponsiveContainer>
              <button
                onClick={() => downloadCSV(revenueChartData, 'revenue_sales.csv')}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
              >
                Download CSV
              </button>
            </div>
          </div>

          {/* Latest Orders Table */}
          <div className="mt-10">
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
                    currentOrders.map((order, index) => (
                      <tr key={order?._id || `order-${index}`} className="hover:bg-gray-50 cursor-pointer">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order?._id || "Unknown ID"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order?.user?.name || "Unknown User"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${order?.totalPrice?.toFixed(2) || "0.00"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order?.isDelivered ? "Delivered" : "Not Delivered"}</td>
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
                  className="px-4 py-2 bg-gray-200 text-sm font-medium rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-200 text-sm font-medium rounded disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminHomePage;
