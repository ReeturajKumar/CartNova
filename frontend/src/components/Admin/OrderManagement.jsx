import React from 'react'

const OrderManagement = () => {
  const orders = [
    {
      _id: "123456781",
      user: { name: "Reeturaj Kumar" },
      totalPrice: 1000,
      status: "Processing",
    },
    {
      _id: "123456782",
      user: { name: "Reeturaj Kumar" },
      totalPrice: 1200,
      status: "Delivered",
    },
    {
      _id: "123456783",
      user: { name: "Reeturaj Kumar" },
      totalPrice: 1400,
      status: "Processing",
    },
    {
      _id: "123456784",
      user: { name: "Reeturaj Kumar" },
      totalPrice: 800,
      status: "Delivered",
    },
  ];


  const handleStatusChange = (orderId, status) => {
    console.log(`Order ${orderId} status updated to ${status}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Order Management</h2>

      <div className="overflow-x-auto shadow sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 bg-white text-sm">
          <thead className="bg-gray-300 text-gray-700 uppercase text-xs font-semibold">
            <tr>
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">User</th>
              <th className="px-6 py-3 text-left">Total Price</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-mono text-sm text-gray-900">#{order._id}</td>
                <td className="p-4">{order.user.name}</td>
                <td className="p-4">${order.totalPrice}</td>
                <td className="px-6 py-4">
                  <select
                   value={order.status}
                   onChange={(e) => handleStatusChange(order._id, e.target.value)}
                   className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded block w-full p-2.5'
                  >
                    <option value="Processing">Processing</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Shipped">Shipped</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => handleStatusChange(order._id, "Delivered")} className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 hover:text-white cursor-pointer' >
                    Mark as Delivered
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
