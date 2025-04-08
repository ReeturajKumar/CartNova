import React, { useEffect, useState } from 'react';
import img1 from '../assets/BS1.avif';
import img2 from '../assets/D1.png';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    setTimeout(() => {
      const mockOrders = [
        // Uncomment these to test with orders:
        {
          id: 1,
          createdAt: new Date(),
          shippingAddress: { city: 'Delhi', country: 'India' },
          orderItems: [{ name: 'Stylish Jacket', images: img1 }],
          totalPrice: 1000,
          isPaid: true,
          isDelivered: true,
        },
        {
          id: 2,
          createdAt: new Date(),
          shippingAddress: { city: 'Delhi', country: 'India' },
          orderItems: [{ name: 'Stylish Jacket', images: img1 }],
          totalPrice: 1000,
          isPaid: true,
          isDelivered: false,
        }
      ];

      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>

      {loading ? (
        <p className="text-center text-gray-500 py-20">Loading your orders...</p>
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
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-3 px-4">
                    <img
                      src={order.orderItems[0].images}
                      alt={order.orderItems[0].name}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-800">#{order.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {order.createdAt.toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {order.shippingAddress.city}, {order.shippingAddress.country}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">{order.orderItems[0].name}</td>
                  <td className="py-3 px-4 text-sm font-semibold text-gray-900">${order.totalPrice}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {order.isDelivered ? 'Delivered' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        order.isPaid ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {order.isPaid ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrdersPage;
