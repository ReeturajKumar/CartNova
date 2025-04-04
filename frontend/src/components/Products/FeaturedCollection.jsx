import React from "react";
import img1 from "../../assets/F1.webp";
import img2 from "../../assets/F2.jpg";
import img3 from "../../assets/F3.webp";
import img4 from "../../assets/F4.jpg";

const FeaturedCollection = () => {
  return (
    <section className="py-20 px-6 lg:px-32">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-12 rounded-3xl  overflow-hidden p-10">
        {/* Text Section */}
        <div className="lg:w-1/2 w-full h-auto text-center lg:text-left">
          <h3 className="text-lg font-semibold text-gray-600 uppercase mb-3 tracking-widest">
            Featured Collection
          </h3>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Elevate Your Style with This Week’s Top Picks
          </h2>
          <p className="text-gray-500 italic text-xl mb-4">
            "Style isn’t just fashion, it’s a statement."
          </p>
          <p className="text-lg text-gray-600 mb-6">
            Handpicked styles trending now, made to enhance your fashion
            statement effortlessly.
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-left">
            <div className="flex items-center gap-3">
              <span className="text-white text-2xl">🆕</span>
              <span className="text-gray-600 font-medium">New Arrivals</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white text-2xl">✨</span>
              <span className="text-gray-600 font-medium">Premium Quality</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white text-2xl">🚚</span>
              <span className="text-gray-600 font-medium">Fast Shipping</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white text-2xl">✅</span>
              <span className="text-gray-600 font-medium">Trusted Brands</span>
            </div>
          </div>

          {/* Optional Stats */}
          <div className="flex justify-center lg:justify-start items-center gap-8 mb-6">
            <div>
              <h3 className="text-3xl font-bold text-gray-800">10K+</h3>
              <p className="text-gray-900 text-sm">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-800">500+</h3>
              <p className="text-gray-900 text-sm">New Styles Weekly</p>
            </div>
          </div>

          <button className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 hover:text-white cursor-pointer">
            Shop the Collection
          </button>
        </div>

        {/* Image Section with Creative Layout */}
        <div className="lg:w-1/2 w-full grid grid-cols-2 gap-4 relative group">
          <div className="w-full h-full overflow-hidden  rounded-lg">
            <img
              src={img1}
              alt="Collection 1"
              className="w-[400px] h-[300px] object-cover rounded-xl shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
            />
          </div>
          <div className="w-full h-full overflow-hidden  rounded-lg">
            <img
              src={img2}
              alt="Collection 2"
              className="w-[400px] h-[300px] object-cover rounded-xl shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
            />
          </div>
          <div className="w-full h-full overflow-hidden rounded-lg">
            <img
              src={img3}
              alt="Collection 3"
              className="w-full h-full object-cover rounded-xl shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
            />
          </div>
          <div className="w-full h-full overflow-hidden  rounded-lg">
            <img
              src={img4}
              alt="Collection 4"
              className="w-full h-full object-cover rounded-xl shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
