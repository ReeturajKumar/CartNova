import React, { useEffect, useState } from "react";
import img1 from "../../assets/BS1.avif";
import img2 from "../../assets/BS2.jpg";
import img3 from "../../assets/Bs3.jpg";
import img4 from "../../assets/RP1.jpeg";
import img5 from "../../assets/RP2.jpeg";
import img6 from "../../assets/RP3.avif";
import img7 from "../../assets/RP4.avif";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";

const selectedProduct = {
  name: "Men's Cotton Slim Fit T-Shirt",
  size: ["S", "M", "L", "XL"],
  color: ["Red", "Black"],
  brand: "H&M",
  material: "Cotton",
  quantity: 1,
  price: 3000,
  orignalPrice: 4000,
  image: [
    { url: img1, alt: "Shirt" },
    { url: img2, alt: "Shirt" },
    { url: img3, alt: "Shirt" },
  ],
  desc: "Redefine your style with our premium cotton shirt, crafted for those who appreciate comfort and sophistication. Designed with a modern fit, this shirt offers a perfect balance between smart and casual. The breathable, lightweight fabric ensures all-day ease, while the fine stitching guarantees durability.",
};

const similarProducts = [
  {
    _id: 1,
    name: "Stylish Jacket",
    price: 10000,
    images: [{ url: img4 }],
    discountPrice: 5000,
  },
  {
    _id: 2,
    name: "Stylish Pant",
    price: 10000,
    images: [{ url: img5 }],
    discountPrice: 5000,
  },
  {
    _id: 3,
    name: "Stylish Jeans",
    price: 10000,
    images: [{ url: img6 }],
    discountPrice: 5000,
  },
  {
    _id: 4,
    name: "Stylish Shirt",
    price: 10000,
    images: [{ url: img7 }],
    discountPrice: 5000,
  },
];

const ProductDetails = () => {
  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    if (selectedProduct?.image?.length > 0) {
      setMainImage(selectedProduct.image[0].url);
    }
  }, []);

  const handlesetQuantity = (value) => {
    if (value === "plus") setQuantity((prev) => prev + 1);
    if (value === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color", { duration: 1000 });
      return;
    }
    setIsButtonDisabled(true);
    setTimeout(() => {
      toast.success("Product added to cart", { duration: 1000 });
      setIsButtonDisabled(false);
    }, 500);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 sm:p-8 rounded-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left Section - Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6">
            {selectedProduct.image.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.alt}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer ${
                  mainImage === image.url ? "border-5 border-black" : ""
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Product Image */}
          <div className="md:w-1/2">
            <div className="relative w-full h-auto sm:h-[500px] md:h-[850px] lg:h-[700px] overflow-hidden rounded-lg group">
              <img
                src={mainImage}
                alt={selectedProduct.image[0].alt}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-105 cursor-pointer"
              />
            </div>
          </div>

          {/* Mobile Thumbnails */}
          <div className="md:hidden flex overflow-x-auto space-x-4 mt-4">
            {selectedProduct.image.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.alt}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${
                  mainImage === image.url ? "border-5 border-black" : ""
                }`}
                onClick={() => setMainImage(image.url)}
              />
            ))}
          </div>

          {/* Right Details Section */}
          <div className="md:w-1/2 md:ml-10 mt-6 md:mt-0">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold mb-2">
              {selectedProduct.name}
            </h1>

            <p className="text-md sm:text-lg text-gray-600 line-through">
              {selectedProduct.orignalPrice &&
                `$${selectedProduct.orignalPrice}`}
            </p>

            <p className="text-lg sm:text-2xl font-semibold text-gray-700 mb-3">
              ${selectedProduct.price}
            </p>

            <p className="text-sm sm:text-base text-gray-600 mb-4">
              {selectedProduct.desc}
            </p>

            <div className="mb-4">
              <p className="text-gray-700 font-semibold">Color:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedProduct.color.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full border cursor-pointer transition ${
                      selectedColor === color
                        ? "border-2 border-gray-400"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-gray-700 font-semibold">Size:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedProduct.size.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-2 sm:px-4 py-1 sm:py-2 rounded-md cursor-pointer transition ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 font-semibold">Quantity:</p>
              <div className="flex items-center space-x-2 mt-2">
                <button
                  className="bg-gray-200 px-3 sm:px-4 py-2 rounded-md cursor-pointer"
                  onClick={() => handlesetQuantity("minus")}
                >
                  -
                </button>
                <span className="text-gray-700 text-base sm:text-lg">
                  {quantity}
                </span>
                <button
                  className="bg-gray-200 px-3 sm:px-4 py-2 rounded-md cursor-pointer"
                  onClick={() => handlesetQuantity("plus")}
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`bg-black text-white py-3 px-6 rounded w-full mb-4 font-semibold cursor-pointer hover:bg-gray-800 transition duration-300 ${
                isButtonDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isButtonDisabled ? "Adding to Cart..." : "Add to Cart"}
            </button>

            {/* Characteristics */}
            <div className="mt-6 text-gray-700">
              <h3 className="text-lg font-bold mb-2">Characteristics:</h3>
              <table className="w-full text-left text-sm sm:text-base">
                <tbody>
                  <tr>
                    <td className="font-semibold py-1">Brand:</td>
                    <td className="py-1">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="font-semibold py-1">Material:</td>
                    <td className="py-1">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-4 mt-20">
            Related Products - You May Also Like
          </h2>
          <p className="text-base text-center sm:text-lg lg:text-xl text-gray-600 mb-8">
            Explore similar products handpicked just for you – shop now!
          </p>
          <ProductGrid products={similarProducts} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
