import React, { useEffect, useState } from "react";
import Hero from "../components/Layout/Hero";
import GenderCollection from "../components/Products/GenderCollection";
import Brand from "../components/Layout/Brand";
import NewArrivals from "../components/Products/NewArrivals";
import NewArrivalsSection from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import WomenSection from "../components/Products/WomenSection";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from "../redux/slice/productsSlice";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();
  const {products,loading,error} = useSelector((state)=>state.products);
  const [bestSellerProducts, setBestSellerProducts] = useState(null);

  useEffect(() => {
    dispatch(fetchProductsByFilters({
      gender: "Women",
      category: "Bottom Wear",
      limit:8,
    }));

    // Fetch best seller products from the backend
    const fetchBestSeller= async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/products/best-seller`);
        setBestSellerProducts(response.data);
      } catch (error) {
        console.log(error); 
      }
    }

    fetchBestSeller();
  }, [dispatch]);
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrivals />

      <div className="px-4 sm:px-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3 sm:mb-4 mt-16 sm:mt-20">
          Best Sellers of the Week - New Arrivals
        </h2>
        <p className="text-sm sm:text-base lg:text-xl text-center text-gray-600">
          Hottest trends of the week—shop bestsellers before they’re gone!
        </p>
      </div>
      {bestSellerProducts ? (
        <ProductDetails productId={bestSellerProducts._id} />
      ) : (
        <p className="text-center">Loading...</p>
      ) }

      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4 mt-20">
          Everyday Elegance – Women's Tops Collection
        </h2>
        <p className="text-base text-center sm:text-lg lg:text-xl text-gray-600 mb-8 ">
          Stay stylish, comfortable, and confident with our trendy tops, perfect
          for every season!
        </p>
        <WomenSection products = {products} loading={loading} error={error} />
      </div>
      <FeaturedCollection />

      <div className="px-4 sm:px-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-3 sm:mb-4 mt-10 sm:mt-8">
          Why Shop With Us – Benefits You Can Trust
        </h2>
        <p className="text-sm sm:text-base lg:text-xl text-center text-gray-600">
          Enjoy secure payments, fast delivery, and stress-free returns always
        </p>
      </div>

      <FeaturesSection />
    </div>
  );
};

export default Home;
