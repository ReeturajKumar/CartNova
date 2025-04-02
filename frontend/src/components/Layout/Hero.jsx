import React from "react";
import Banner from "../../assets/Hero4.jpg";

const Hero = () => {
  return (
    <div className="relative w-full h-screen">
      <img
        src={Banner}
        alt="Hero Banner"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Hero;
