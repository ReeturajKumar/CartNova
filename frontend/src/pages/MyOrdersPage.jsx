import React, { useEffect, useState } from "react";
import img2 from "../assets/D1.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "./../redux/slice/orderSlice";

const ORDERS_PER_PAGE = 4; // 👈 4 orders per page

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  const totalPages = Math.ceil(orders.length / ORDERS_PER_PAGE);

  const currentOrders = orders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>

      {loading ? (
        <p className="text-center text-gray-500 py-20">
          Loading your orders...
        </p>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-lg text-center">
          <img src={img2} alt="No orders" className="w-32 h-32 mb-6" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            You haven't placed any orders yet!
          </h3>
          <p className="text-gray-500 mb-4">
            Explore our latest collections and grab your favorites now.
          </p>
          <a
            href="/"
            className="inline-block bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden bg-white shadow-md">
              <thead className="bg-gray-50">
                <tr className="text-gray-700 text-sm font-semibold">
                  <th className="py-3 px-4 text-left">Product</th>
                  <th className="py-3 px-4 text-left">Order ID</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Shipping</th>
                  <th className="py-3 px-4 text-left">Item</th>
                  <th className="py-3 px-4 text-left">Total</th>
                  <th className="py-3 px-4 text-left">Delivered</th>
                  <th className="py-3 px-4 text-left">Paid</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order) => (
                  <tr
                    key={order._id}
                    onClick={() => handleRowClick(order._id)}
                    className="border-t border-gray-100 hover:bg-gray-50 transition cursor-pointer"
                  >
                    <td className="py-3 px-4">
                      <img
                        src={order.orderItems[0].image}
                        alt={order.orderItems[0].name}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-800">
                      #{order._id}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {`${order.shippingAddress.city}, ${order.shippingAddress.country}`.length > 15
                        ? `${order.shippingAddress.city}, ${order.shippingAddress.country}`.slice(0, 15) + "..."
                        : `${order.shippingAddress.city}, ${order.shippingAddress.country}`}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {order.orderItems[0].name}
                    </td>
                    <td className="py-3 px-4 text-sm font-semibold text-gray-900">
                      ${order.totalPrice}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          order.isDelivered
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {order.isDelivered ? "Delivered" : "Pending"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          order.isPaid
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.isPaid ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
