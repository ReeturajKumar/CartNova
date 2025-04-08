import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <Link key={index} to={`/product/${product._id}`} className="block">
          <div className="bg-white rounded-lg p-4">
            <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 mb-4 overflow-hidden rounded-lg">
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
              <p className="text-gray-950 font-semibold">
                ${product.discountPrice}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
