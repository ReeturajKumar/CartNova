import React from "react";
import { Link } from "react-router-dom";
import img1 from "../../assets/W1.avif";
import img2 from "../../assets/W2.avif";
import img3 from "../../assets/W3.avif";
import img4 from "../../assets/W4.avif";
import img5 from "../../assets/W5.avif";
import img6 from "../../assets/W6.jpg";
import img7 from "../../assets/W7.jpg";
import img8 from "../../assets/W8.jpg";

const placeHolderProducts = [
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
    _id: 3, // Fixed duplicate _id
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
  {
    _id: 5,
    name: "Stylish Jacket",
    price: 10000,
    images: [{ url: img8 }],
    discountPrice: 5000,
  },
  {
    _id: 6,
    name: "Stylish Pant",
    price: 10000,
    images: [{ url: img1 }],
    discountPrice: 5000,
  },
  {
    _id: 7,
    name: "Stylish Jeans",
    price: 10000,
    images: [{ url: img2 }],
    discountPrice: 5000,
  },
  {
    _id: 8,
    name: "Stylish Shirt",
    price: 10000,
    images: [{ url: img3 }],
    discountPrice: 5000,
  },
];

const WomenSection = () => {
  return (
    <section className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {placeHolderProducts.map((product) => (
          <Link key={product._id} to={`/product/${product._id}`} className="block">
            <div className="bg-white rounded-lg p-4">
              <div className="w-full h-96 mb-4 overflow-hidden rounded-lg">
                <img
                  src={product.images[0].url}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-500 ease-in-out transform hover:scale-105 cursor-pointer"
                />
              </div>

              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center justify-between">
                <p className="text-gray-600 font-medium tracking-tighter line-through">
                  ${product.price}
                </p>
                <p className="text-gray-950 font-semibold">${product.discountPrice}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default WomenSection;
