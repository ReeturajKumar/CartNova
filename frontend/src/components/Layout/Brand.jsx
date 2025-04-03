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
    <div className="bg-black py-6 flex justify-center overflow-hidden">
      <div className="w-full max-w-7xl overflow-hidden relative">
        {/* Infinite Scrolling Wrapper */}
        <div className="flex gap-8 sm:gap-10 animate-scroll group-hover:pause-animation">
          {[...images, ...images].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Brand Logo ${index + 1}`}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-contain transition-transform hover:scale-110 duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brand;
