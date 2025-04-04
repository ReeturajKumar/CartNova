import React from "react";
import Hero from "../components/Layout/Hero";
import GenderCollection from "../components/Products/GenderCollection";
import Brand from "../components/Layout/Brand";
import NewArrivals from "../components/Products/NewArrivals";
import NewArrivalsSection from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import WomenSection from "../components/Products/WomenSection";
import FeaturedCollection from "../components/Products/FeaturedCollection";

const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />

      <h2 className="text-3xl font-bold text-center text-gray-900 mb-4 mt-20">
        Best Sellers of the Week - New Arrivals
      </h2>
      <p className="text-base text-center sm:text-lg lg:text-xl text-gray-600 ">
        Hottest trends of the week—shop bestsellers before they’re gone!
      </p>
      <ProductDetails />


      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4 mt-20">
        Everyday Elegance – Women's Tops Collection
        </h2>
        <p className="text-base text-center sm:text-lg lg:text-xl text-gray-600 mb-8 ">Stay stylish, comfortable, and confident with our trendy tops, perfect for every season!</p>
        <WomenSection />
      </div>
      <FeaturedCollection/>
    </div>
  );
};

export default Home;
