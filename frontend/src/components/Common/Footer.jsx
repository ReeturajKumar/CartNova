import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io5";
import { RiTwitterXLine } from "react-icons/ri";

const Footer = () => {
  const paymentLogos = [
    {
      name: "Visa",
      src: "https://i.pinimg.com/736x/0f/86/07/0f86075d899c9069b235c23b792d70ef.jpg",
    },
    {
      name: "MasterCard",
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXnXkBmw2uSAI7UPnfI8ZWleOP_9jguz46rQ&s",
    },
    {
      name: "PayPal",
      src: "https://w7.pngwing.com/pngs/782/863/png-transparent-paypal-logo-paypal-logo-paypal-blue-text-trademark.png",
    },
    {
      name: "Google Pay",
      src: "https://icon2.cleanpng.com/lnd/20241224/vo/a2c1516eae4cb9a792e8ef0f908ceb.webp",
    },
  ];

  return (
    <footer className=" text-gray-700 relative">
      {/* Newsletter Section (Floating, But Well-Placed) */}
      <div className="bg-black text-white py-6 px-6 md:px-12 rounded-xl shadow-lg w-11/12 md:w-4/5 mx-auto flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6 relative top-16 md:top-20 ">
        {/* Left Side - Text Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Join Our Newsletter 🎉
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-lg mt-2">
            Subscribe to get updates on our latest products, exclusive offers,
            and expert styling tips delivered straight to your inbox.
          </p>
        </div>

        {/* Right Side - Input & Button */}
        <div className="w-full md:w-1/2 flex flex-col md:items-end">
          <input
            type="email"
            placeholder="Enter your email address"
            className=" bg-white w-full px-4 py-3 text-gray-800 outline-none border-none rounded-full focus:ring-2 focus:outline-none"
          />
          <button className="bg-white text-black px-6 py-3 font-medium rounded-full transition w-full mt-3">
            Subscribe Now
          </button>
        </div>
      </div>

      {/* Main Footer (With Proper Spacing) */}
      <div className="bg-[#F0F0F0] w-full mx-auto pt-16 pb-6 px-6 sm:pt-20 md:pt-36">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
          {/* Company Info */}
          <div>
            <div className="font-bold text-lg w-[150px]">
              <img src="/logo2.png" alt="" />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              A futuristic, sleek, and modern e-commerce brand with
              innovation-driven design.
            </p>
            <div className="flex space-x-4 mt-4 text-gray-500 flex-wrap">
              <a href="#">
                <TbBrandMeta className="h-5 w-5" />
              </a>
              <a href="#">
                <IoLogoInstagram className="h-5 w-5" />
              </a>
              <a href="#">
                <RiTwitterXLine className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {["Company", "Help", "FAQ", "Resources"].map((section) => (
            <div key={section}>
              <h4 className="font-semibold text-gray-800">{section}</h4>
              <ul className="mt-2 space-y-2 text-sm text-gray-600">
                {section === "Company" && (
                  <>
                    <li>
                      <a href="#">About</a>
                    </li>
                    <li>
                      <a href="#">Features</a>
                    </li>
                    <li>
                      <a href="#">Works</a>
                    </li>
                    <li>
                      <a href="#">Career</a>
                    </li>
                  </>
                )}
                {section === "Help" && (
                  <>
                    <li>
                      <a href="#">Customer Support</a>
                    </li>
                    <li>
                      <a href="#">Delivery Details</a>
                    </li>
                    <li>
                      <a href="#">Terms & Conditions</a>
                    </li>
                    <li>
                      <a href="#">Privacy Policy</a>
                    </li>
                  </>
                )}
                {section === "FAQ" && (
                  <>
                    <li>
                      <a href="#">Account</a>
                    </li>
                    <li>
                      <a href="#">Manage Deliveries</a>
                    </li>
                    <li>
                      <a href="#">Orders</a>
                    </li>
                    <li>
                      <a href="#">Payments</a>
                    </li>
                  </>
                )}
                {section === "Resources" && (
                  <>
                    <li>
                      <a href="#">Free eBooks</a>
                    </li>
                    <li>
                      <a href="#">Development Tutorial</a>
                    </li>
                    <li>
                      <a href="#">How to - Blog</a>
                    </li>
                    <li>
                      <a href="#">YouTube</a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className=" bg-[#F0F0F0] border-t border-gray-300 py-4 px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
        {/* Copyright on the left */}
        <p className="text-center md:text-left">
          CartNova © {new Date().getFullYear()}, All Rights Reserved
        </p>

        {/* Payment logos on the right */}
        <div className="flex space-x-4 mt-2 md:mt-0 cursor-pointer">
          {paymentLogos.map((logo) => (
            <img
              key={logo.name}
              src={logo.src}
              alt={`${logo.name} logo`}
              className="h-6 opacity-80 hover:opacity-100 transition"
            />
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
