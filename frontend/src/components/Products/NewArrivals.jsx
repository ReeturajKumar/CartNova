import React, { useRef, useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/products/new-arrival`
        )
        setNewArrivals(response.data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      }
    };

    fetchNewArrivals();
  }, []);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.children[0].offsetWidth + 24;
      const scrollAmount =
        direction === "left" ? -itemWidth * 2 : itemWidth * 2;

      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    scrollRef.current?.addEventListener("scroll", checkScrollPosition);
    return () =>
      scrollRef.current?.removeEventListener("scroll", checkScrollPosition);
  }, [newArrivals]);

  return (
    <section className="max-w-7xl mx-auto px-4">
      {/* Header Section */}
      <div className="text-center mb-10 relative">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Explore New Arrivals
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8">
        Discover trendy runway styles to elevate your look and stand out.
        </p>

        {/* Navigation Buttons */}
        <div className="absolute right-0 bottom-[-30px] flex space-x-2 ">
          {canScrollLeft && (
            <button
              onClick={() => handleScroll("left")}
              className="p-2 sm:p-3 lg:p-4 rounded border bg-white text-black shadow-md transition-all hover:bg-gray-200"
            >
              <FiChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => handleScroll("right")}
              className="p-2 sm:p-3 lg:p-4 rounded border bg-white text-black shadow-md transition-all hover:bg-gray-200"
            >
              <FiChevronRight className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
            </button>
            
          )}
        </div>
      </div>

      {/* Scrollable Product List */}
      <div
        ref={scrollRef}
        className="overflow-x-scroll flex space-x-6 relative scroll-smooth custom-scrollbar-hide"
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="snap-start min-w-[100%] sm:min-w-[80%] md:min-w-[48%] lg:min-w-[32%] xl:min-w-[25%] relative"
          >
            {/* Image Wrapper with Zoom Effect */}
            <div className="overflow-hidden rounded-lg group">
              <img
                src={product.images[0]?.url}
                alt={product.name}
                className="w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[500px] xl:h-[550px] object-cover cursor-pointer rounded-lg transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Product Details */}
            <div className="absolute bottom-5 left-5 right-5 bg-white/10 backdrop-blur-xl text-white p-3 sm:p-4 rounded-lg shadow-md border border-white/20">
              <Link to={`/product/${product._id}`} className="block text-center">
                <h4 className="text-md sm:text-lg lg:text-xl font-bold tracking-wider uppercase">
                  {product.name}
                </h4>
                <p className="text-sm sm:text-md mt-1 font-semibold text-gray-200">
                  ${product.price}
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
