import React from 'react'
import { FaBoxOpen, FaClipboardList, FaStore, FaUser } from 'react-icons/fa'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { MdAdminPanelSettings } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate('/');
  }

  return (
    <div className="h-full flex flex-col justify-between p-6">
      <div>
        <div className="mb-6">
          <Link to="/admin-panel" className="text-2xl font-bold">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-3 text-gray-800">
              <MdAdminPanelSettings size={26} className="text-black" />
              <span>Admin Dashboard</span>
            </h2>
          </Link>
        </div>

        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/admin-panel/users"
            className={({ isActive }) =>
              isActive
                ? 'text-black font-semibold py-3 px-4 rounded flex items-center space-x-2'
                : 'text-gray-700 hover:bg-gray-800 hover:text-white py-3 px-4 rounded flex items-center space-x-2'
            }
          >
            <FaUser /> <span>Users</span>
          </NavLink>

          <NavLink
            to="/admin-panel/products"
            className={({ isActive }) =>
              isActive
                ? 'text-black font-semibold py-3 px-4 rounded flex items-center space-x-2'
                : 'text-gray-700 hover:bg-gray-800 hover:text-white py-3 px-4 rounded flex items-center space-x-2'
            }
          >
            <FaBoxOpen /> <span>Products</span>
          </NavLink>

          <NavLink
            to="/admin-panel/orders"
            className={({ isActive }) =>
              isActive
                ? 'text-black font-semibold py-3 px-4 rounded flex items-center space-x-2'
                : 'text-gray-700 hover:bg-gray-800 hover:text-white py-3 px-4 rounded flex items-center space-x-2'
            }
          >
            <FaClipboardList /> <span>Orders</span>
          </NavLink>

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-black font-semibold py-3 px-4 rounded flex items-center space-x-2'
                : 'text-gray-700 hover:bg-gray-800 hover:text-white py-3 px-4 rounded flex items-center space-x-2'
            }
          >
            <FaStore /> <span>Shop</span>
          </NavLink>
        </nav>
      </div>

      <div className="mt-6">
        <button
          onClick={handleLogOut}
          className="flex items-center justify-center gap-3 w-full bg-black text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-900 transition-all duration-300 shadow-md cursor-pointer"
        >
          <IoMdLogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
