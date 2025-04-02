import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io5";
import { RiTwitterXLine } from "react-icons/ri";

const TopBar = () => {
  return (
    <div className="bg-black text-white h-10 w-full">
      <div className="container mx-auto flex items-center justify-between px-3 md:px-6 h-10">
        {/* Social Media Icons - Shown only on md+ screens */}
        <div className="hidden md:flex items-center space-x-4">
          <a href="#" className="hover:text-gray-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <RiTwitterXLine className="h-5 w-5" />
          </a>
        </div>

        {/* Shipping Message - Always Centered */}
        <div className="text-xs sm:text-sm text-center flex-grow md:flex md:justify-center pl-4">
          <span >We Ship Worldwide - Fast and Reliable Shipping!</span>
        </div>

        {/* Contact Info - Hidden on small screens */}
        <div className="hidden md:block text-xs sm:text-sm">
          <a href="tel:+916299045761" className="hover:text-gray-300">
            +91 6299-0457-61
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
