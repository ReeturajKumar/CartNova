import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      <div className="flex md:hidden p-4 bg-white text-black z-20">
        <button onClick={toggleSidebarOpen}>
          <FaBars size={24} className="text-black cursor-pointer" />
        </button>
        <h1 className="ml-4 text-xl font-extrabold">Admin Dashboard</h1>
      </div>

      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-[#c5c5c5] bg-opacity-50 md:hidden"
          onClick={toggleSidebarOpen}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`bg-white w-64 min-h-screen text-black absolute md:relative transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:block z-20`}
      >
        <AdminSidebar/>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-6 overflow-auto bg-gray-200">
       <Outlet/>
      </div>
    </div>
  );
};

export default AdminLayout;
