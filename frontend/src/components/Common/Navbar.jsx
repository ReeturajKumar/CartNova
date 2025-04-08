import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/cartDrawer";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleNav = () => {
    setMenuOpen(!menuOpen);
  };
  const toggleCartDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-8">
        {/* Logo in Left */}
        <div>
          <NavLink to="/">
            <img
              src="/logo2.png"
              alt=""
              width={160}
              height={50}
              className="shadow-2xl"
            />
          </NavLink>
        </div>

        {/* Center - Navigation links */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/collection/all"
            className={({ isActive }) =>
              isActive
                ? "text-black text-sm font-medium uppercase"
                : "text-gray-700 hover:text-black text-sm font-medium uppercase"
            }
          >
            Men
          </NavLink>
          <NavLink
            to="/collection/women"
            className={({ isActive }) =>
              isActive
                ? "text-black text-sm font-medium uppercase"
                : "text-gray-700 hover:text-black text-sm font-medium uppercase"
            }
          >
            Women
          </NavLink>
          <NavLink
            to="/collection/topwear"
            className={({ isActive }) =>
              isActive
                ? "text-black text-sm font-medium uppercase"
                : "text-gray-700 hover:text-black text-sm font-medium uppercase"
            }
          >
            Top Wear
          </NavLink>
          <NavLink
            to="/collection/bottomwear"
            className={({ isActive }) =>
              isActive
                ? "text-black text-sm font-medium uppercase"
                : "text-gray-700 hover:text-black text-sm font-medium uppercase"
            }
          >
            Bottom Wear
          </NavLink>
        </div>

        {/* Right */}
        <div className="flex items-center space-x-6">
          <NavLink to="/profile" className="hover:text-black">
            <HiOutlineUserCircle className="h-6 w-6 text-gray-700" />
          </NavLink>
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black cursor-pointer"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              4
            </span>
          </button>

          {/* Search icon */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>
          <button className="md:hidden cursor-pointer" onClick={toggleNav}>
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>

      <CartDrawer open={open} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNav} className="cursor-pointer">
            <IoMdCloseCircleOutline className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <NavLink
              to="/collection/all"
              onClick={toggleNav}
              className={({ isActive }) =>
                isActive
                  ? "block text-black"
                  : "block text-gray-600 hover:text-black"
              }
            >
              Men
            </NavLink>
            <NavLink
              to="/collection/women"
              onClick={toggleNav}
              className={({ isActive }) =>
                isActive
                  ? "block text-black"
                  : "block text-gray-600 hover:text-black"
              }
            >
              Women
            </NavLink>
            <NavLink
              to="/collection/topwear"
              onClick={toggleNav}
              className={({ isActive }) =>
                isActive
                  ? "block text-black"
                  : "block text-gray-600 hover:text-black"
              }
            >
              Top Wear
            </NavLink>
            <NavLink
              to="/collection/bottomwear"
              onClick={toggleNav}
              className={({ isActive }) =>
                isActive
                  ? "block text-black"
                  : "block text-gray-600 hover:text-black"
              }
            >
              Bottom Wear
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
