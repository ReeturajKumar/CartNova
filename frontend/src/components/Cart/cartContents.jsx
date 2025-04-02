import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";

const CartContent = () => {
  const cartProducts = [
    {
      productId: 1,
      name: "Shirt",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 300,
      image: "https://picsum.photos/200?random=1",
    },
    {
      productId: 2,
      name: "T-Shirt",
      size: "M",
      color: "Blue",
      quantity: 2,
      price: 500,
      image: "https://picsum.photos/200?random=2",
    },
    {
      productId: 3,
      name: "Shoes",
      color: "Black",
      size: "M",
      quantity: 1,
      price: 1200,
      image: "https://picsum.photos/200?random=3",
    },
    {
      productId: 4,
      name: "Watch",
      color: "Silver",
      size: "M",
      quantity: 1,
      price: 2500,
      image: "https://picsum.photos/200?random=4",
    },
    {
      productId: 5,
      name: "Backpack",
      color: "Green",
      quantity: 3,
      price: 1500,
      image: "https://picsum.photos/200?random=5",
    },
  ];
  return (
    <div>
      {cartProducts.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3 className="text-lg font-semibold uppercase">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">
                size: {product.size} | color: {product.color}
              </p>

              <div className="flex items-center mt-2 space-x-4 border-gray-300 rounded-lg px-4 py-2 shadow-md bg-white">
                <button className="w-8 h-8 flex items-center justify-center text-xl font-semibold bg-gray-200 hover:bg-gray-300 rounded-md transition">
                  -
                </button>
                <span className="text-lg font-medium">{product.quantity}</span>
                <button className="w-8 h-8 flex items-center justify-center text-xl font-semibold bg-gray-200 hover:bg-gray-300 rounded-md transition">
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>${product.price.toLocaleString()}</p>
            <button><RiDeleteBin3Line className="h-6 w-6 mt-10 text-red-600"/></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
