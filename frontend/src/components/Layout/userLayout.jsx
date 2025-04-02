import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import Main from "../Common/Main";
import { Outlet } from "react-router-dom";

const userLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </>
  );
};

export default userLayout;
