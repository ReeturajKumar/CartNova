import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import img1 from "../assets/L1.avif";
import { Link } from "react-router-dom";
import {login} from "../redux/slice/authSlice"
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({email, password}));
  };
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white rounded-3xl shadow-sm w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left: Login Form */}
        <div className="p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              Welcome Back to CartNova
            </h1>
            <p className="text-gray-500">
              Login to explore exclusive deals, track your orders, and manage
              your account seamlessly.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none "
                placeholder="john.doe@gmail.com"
              />
            </div>

            <div>
              <label
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none"
                placeholder="**********"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 hover:text-white cursor-pointer"
            >
              Login
            </button>

            <p className="text-center text-sm">
              Don’t have an account?{" "}
              <Link to="/register" className="text-gray-900 font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </form>

          <div className="my-6 flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-4 text-gray-400 text-sm">Or login with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="flex gap-4 justify-center">
            <button className="p-3 border rounded-lg hover:cursor-not-allowed opacity-50">
              <FaFacebookF className="text-gray-900" />
            </button>
            <button className="p-3 border rounded-lg hover:cursor-not-allowed opacity-50">
              <FaGoogle className="text-gray-900" />
            </button>
            <button className="p-3 border rounded-lg hover:cursor-not-allowed opacity-50">
              <FaApple className="text-gray-900" />
            </button>
          </div>
        </div>

        {/* Right: Illustration */}
        <div className="hidden md:flex items-center justify-center p-0 overflow-hidden">
          <img
            src={img1}
            className="h-[590px] w-full object-cover"
            alt="Secure login illustration"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
