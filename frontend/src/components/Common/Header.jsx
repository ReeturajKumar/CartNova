import React from "react";
import TopBar from "../Layout/topBar";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <>
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
    {/* TopBar */}
    <TopBar />
    {/* Navbar */}
    <Navbar />
  </header>
  <div className="pt-20"></div>
  </>
  );
};

export default Header;
