import React from "react";
import img1 from "../../assets/B1.jpg";
import img2 from "../../assets/B2.png";
import img3 from "../../assets/B3.png";
import img4 from "../../assets/B4.png";
import img5 from "../../assets/B5.png";
import img6 from "../../assets/B6.jpg";
import img7 from "../../assets/B7.png";
import img8 from "../../assets/B8.jpg";
import img9 from "../../assets/B9.jpg";
import img10 from "../../assets/B10.jpg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];

const Brand = () => {
  return (
<div className="bg-black py-3 sm:py-4 md:py-6 flex justify-center overflow-hidden">
  <div className="w-full max-w-7xl overflow-hidden relative">
    {/* Infinite Scrolling Wrapper */}
    <div className="flex gap-6 sm:gap-8 md:gap-10 animate-scroll group-hover:pause-animation">
      {[...images, ...images].map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Brand Logo ${index + 1}`}
          className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 object-contain shrink-0"
        />
      ))}
    </div>
  </div>
</div>

  );
};

export default Brand;
