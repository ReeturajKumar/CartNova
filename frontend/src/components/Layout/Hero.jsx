import React from "react";
import Banner from "../../assets/Hero4.jpg";
import Brand from "./Brand";

const Hero = () => {
  return (
    <div className="relative w-full min-h-[50vh] md:min-h-[70vh] lg:min-h-[90vh]">
      <img
        src={Banner}
        alt="Hero Banner"
        className="w-full h-full object-cover"
      />
            <Brand/>
    </div>
  );
};

export default Hero;
