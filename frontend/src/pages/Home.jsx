import React from "react";
import Hero from "../components/Layout/Hero";
import GenderCollection from "../components/Products/GenderCollection";
import Brand from "../components/Layout/Brand";
import NewArrivals from "../components/Products/NewArrivals";
import NewArrivalsSection from "../components/Products/NewArrivals";

const Home = () => {
  return (
    <div>
      <Hero/>
      <GenderCollection/>
      <NewArrivals/>
    </div>
  );
};

export default Home;
