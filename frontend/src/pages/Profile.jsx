import React, { useState } from 'react';
import { FaUser, FaTag } from 'react-icons/fa';
import img1 from '../assets/U1.png';
import MyOrdersPage from './MyOrdersPage';

const ProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState('personal');

  return (
    <div className="flex flex-col lg:flex-row p-4 sm:p-6 lg:p-10 gap-4">
      {/* Sidebar */}
      <div className="w-full lg:w-72 bg-white shadow-sm p-4 rounded-lg">
        <div className="text-center mb-6">
          <img src={img1} className="w-20 h-20 rounded-full mx-auto" alt="" />
          <h2 className="mt-2 text-lg font-semibold text-gray-800">Hello, Reeturaj Kumar</h2>
        </div>

        <nav className="space-y-4">
          <div>
            <h3 className="text-sm font-bold text-gray-500 mb-1">ACCOUNT</h3>
            <div
              onClick={() => setActiveTab('personal')}
              className={`flex items-center gap-2 text-sm cursor-pointer p-2 rounded-md ${
                activeTab === 'personal'
                  ? 'bg-gray-100 text-black font-semibold'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <FaUser /> Personal Info
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-500 mb-1">MY ORDERS</h3>
            <div
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 text-sm cursor-pointer p-2 rounded-md ${
                activeTab === 'orders'
                  ? 'bg-gray-100 text-black font-semibold'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <FaTag /> My Orders
            </div>
          </div>

          <div className="pt-6">
            <button className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition duration-300 text-sm">
              Log Out
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {activeTab === 'personal' ? (
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-semibold">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-500">First Name</label>
                <input
                  type="text"
                  value="Reeturaj"
                  disabled
                  className="w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-100 text-sm"
                />
              </div>

              <div>
                <label className="text-sm text-gray-500">Last Name</label>
                <input
                  type="text"
                  value="Kumar"
                  disabled
                  className="w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-100 text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-500">Email Address</label>
                <input
                  type="email"
                  value="reeturajvats587@gmail.com"
                  disabled
                  className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-sm"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-500">Mobile Number</label>
                <input
                  type="text"
                  value="+916299045761"
                  disabled
                  className="w-full border border-gray-300 rounded-md p-2 bg-gray-100 text-sm"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm">
            <MyOrdersPage />
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfileDashboard;
