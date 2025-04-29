import React, { useEffect, useState } from 'react';
import { FaUser, FaTag } from 'react-icons/fa';
import img1 from '../assets/U1.png';
import MyOrdersPage from './MyOrdersPage';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slice/authSlice';
import { clearCart } from '../redux/slice/cartSlice';

const ProfileDashboard = () => {
  const {user} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('personal');


  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/login');
  };

  return (
    <div className="flex flex-col lg:flex-row p-4 sm:p-6 lg:p-10 gap-4">
      {/* Sidebar */}
      <div className="w-full lg:w-72 bg-white shadow-sm p-4 rounded-lg">
        <div className="text-center mb-6">
          <img src={img1} className="w-20 h-20 rounded-full mx-auto" alt="" />
          <h2 className="mt-2 text-lg font-semibold text-gray-800">Hello, {user?.name}</h2>
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
           {user && user.role === 'admin' && (
              <button 
              className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition duration-300 text-sm">
                <Link to="/admin-panel">Admin Panel</Link>
              </button>
           )}
          </div>

          <div className="pt-6">
            <button 
            onClick={handleLogout}
            className="w-full bg-black text-white py-2 rounded-md font-semibold hover:bg-gray-800 transition duration-300 text-sm">
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
              <div className='md:col-span-2'>
                <label className="text-sm text-gray-500">First Name</label>
                <input
                  type="text"
                  value={user?.name}
                  disabled
                  className="w-full mt-1 border border-gray-300 rounded-md p-2 bg-gray-100 text-sm"
                />
              </div>


              <div className="md:col-span-2">
                <label className="text-sm text-gray-500">Email Address</label>
                <input
                  type="email"
                  value={user?.email}
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
