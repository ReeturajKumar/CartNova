import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiBars3BottomRight, HiOutlineBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/cartDrawer";
import { IoMdClose, IoMdCloseCircleOutline } from "react-icons/io";

const Navbar = () => {

  
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleNav = () => {
      setMenuOpen(!menuOpen);
    }
    const toggleCartDrawer = () => {
      setOpen(!open);
    }

  return (
    <>
      <nav className=" container mx-auto flex items-center justify-between py-4 px-8 ">
        {/* Logo in Left */}
        <div>
          <Link to="/">
            <img
              src="/logo2.png"
              alt=""
              width={160}
              height={50}
              className="shadow-2xl"
            />
          </Link>
        </div>

        {/* Center - NAvigation link */}
        <div className="hidden md:flex space-x-6">
          <Link
            to="#"
            className=" text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="#"
            className=" text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="#"
            className=" text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Top Wear
          </Link>
          <Link
            to="#"
            className=" text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Bottom Wear
          </Link>
        </div>

        {/* Right */}

        <div className="flex items-center space-x-6">
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUserCircle className="h-6 w-6 text-gray-700" />
          </Link>
          <button onClick={toggleCartDrawer} className="relative hover:text-black cursor-pointer">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
              4
            </span>
          </button>

          {/* serach icon */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>
          <button className="md:hidden cursor-pointer" onClick={toggleNav}>
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CartDrawer open={open} toggleCartDrawer={toggleCartDrawer}/>


      {/* mobile navigation */}
      <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex justify-end p-4">
        <button onClick={toggleNav} className="cursor-pointer">
          <IoMdCloseCircleOutline className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Menu</h2>
        <nav className="space-y-4">
          <Link to="#" onClick={toggleNav} className="block text-gray-600 hover:text-black">
          Men
          </Link>
          <Link to="#" onClick={toggleNav} className="block text-gray-600 hover:text-black">
          Women
          </Link>
          <Link to="#" onClick={toggleNav} className="block text-gray-600 hover:text-black">
          Top Wear
          </Link>
          <Link to="#" onClick={toggleNav} className="block text-gray-600 hover:text-black">
          Bottom Wear
          </Link>
        </nav>
      </div>
      </div>
    </>
  );
};

export default Navbar;
