import React from "react";
import Hero from "../components/Layout/Hero";
import GenderCollection from "../components/Products/GenderCollection";
import Brand from "../components/Layout/Brand";
import NewArrivals from "../components/Products/NewArrivals";
import NewArrivalsSection from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";

const Home = () => {
  return (
    <div>
      <Hero/>
      <GenderCollection/>
      <NewArrivals/>

      <h2 className="text-3xl font-bold text-center text-gray-900 mb-4 mt-20">Best Sellers of the Week - New Arrivals</h2>
      <p className="text-base text-center sm:text-lg lg:text-xl text-gray-600 ">Hottest trends of the week—shop bestsellers before they’re gone!</p>
      <ProductDetails/>
    </div>
  );
};

export default Home;
