import React, { useState } from "react";

const UserManagement = () => {
  const users = [
    {
      _id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
    },
    {
      _id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Customer",
    },
    {
      _id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Admin",
    },
    {
      _id: 4,
      name: "Sara Lee",
      email: "sara@example.com",
      role: "Customer",
    },
    {
      _id: 5,
      name: "David Kim",
      email: "david@example.com",
      role: "Admin",
    },
    {
      _id: 6,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "Customer",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "customer",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New User:", formData);
    setFormData({ name: "", email: "", role: "customer", password: "" });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 2;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };


  const handleRoleChange = (userId, newRole) => {
    console.log(`Updating role for user ${userId} to ${newRole}`);
  };
  
  
  const handleDelete = (userId) => {
    if(window.confirm("Are you sure you want to delete this user?")) {
      console.log(`Deleting user ${userId}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-6">User Management</h2>

      {/* Add User Form */}
      <div className="rounded-xl mb-5">
        <h3 className="text-xl font-semibold mb-6">Add New User</h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter user name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter user email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter user password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Role
            </label>
            <select
              name="role"
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 cursor-pointer"
            >
              Add User
            </button>
          </div>
        </form>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full text-left text-gray-900\">
            <thead className="bg-gray-300 text-xs uppercase text-gray-700">
              <tr>
                <th className="py-3 px-4">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {currentUsers.map((user) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <select value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none"
                    >
                      <option value="customer">Customer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center p-4">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 text-sm font-medium rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 text-sm font-medium rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
  );
};

export default UserManagement;
