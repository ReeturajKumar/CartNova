import React from "react";
import Hero from "../components/Layout/Hero";
import GenderCollection from "../components/Products/GenderCollection";
import Brand from "../components/Layout/Brand";

const Home = () => {
  return (
    <div>
      <Hero/>
      <Brand/>
      <GenderCollection/>
    </div>
  );
};

export default Home;
