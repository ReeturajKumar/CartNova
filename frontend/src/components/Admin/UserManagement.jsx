import React, { useState } from "react";

const UserManagement = () => {
  const users = [
    {
      name: "John Doe",
      email: "YQF9F@example.com",
      role: "Admin",
    },
    {
      name: "John Doe",
      email: "YQF9F@example.com",
      role: "Admin",
    },
    {
      name: "John Doe",
      email: "YQF9F@example.com",
      role: "Admin",
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
    setFormData({ name: "", email: "", role: "customer", password: "" });
    console.log(formData);
  };
  return (
    <div className="max-w-7xl mx-auto p-5">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>
      <div className="rounded-xl p-4">
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
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none "
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
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none "
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
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none "
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
              className="p-3 border border-gray-300 rounded-lg w-full focus:outline-none "
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
    </div>
  );
};

export default UserManagement;
