import React from "react";
import TopBar from "../Layout/topBar";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <>
      <TopBar />

      <div className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <Navbar />
      </div>
    </>
  );
};

export default Header;
