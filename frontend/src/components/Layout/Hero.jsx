import React from "react";
import Banner from "../../assets/Hero4.jpg";
import Brand from "./Brand";

const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[90vh] overflow-hidden">
        <img
          src={Banner}
          alt="Hero Banner"
          className="w-full h-full object-cover object-center"
        />
      </div>
        <Brand />
    </>
  );
};

export default Hero;
