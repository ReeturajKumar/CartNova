import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { updateCart, removeFromCart } from "../../redux/slice/cartSlice";


const CartContent = ({cart,userId,guestId}) => {
  const dispatch = useDispatch();


  // adding and sub to cart
  const handleAddToCart = (productId,delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity > 0) {
      dispatch(updateCart({ productId, quantity: newQuantity, size, color, guestId, userId }));

    }
    
  }

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, quantity: 0, size, color, guestId, userId }));
  }
  return (
    <div>
      {cart.products.map((product, index) => (
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

              <div className="flex items-center mt-2 space-x-4 border-gray-300 rounded-lg px-4 py-2 shadow-sm bg-white w-[8rem]">
                <button 
                onClick={() => handleAddToCart(product.productId, -1, product.quantity, product.size, product.color)} 
                className="w-8 h-8 flex items-center justify-center text-xl font-semibold bg-gray-200 hover:bg-gray-300 rounded-md transition">
                  -
                </button>
                <span className="text-lg font-medium">{product.quantity}</span>
                <button 
                onClick={() => handleAddToCart(product.productId, 1, product.quantity, product.size, product.color)}
                className="w-8 h-8 flex items-center justify-center text-xl font-semibold bg-gray-200 hover:bg-gray-300 rounded-md transition">
                  +
                </button>
              </div>
            </div>
          </div>
          <div>
            <p>${product.price.toLocaleString()}</p>
            <button onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)}><RiDeleteBin3Line className="h-6 w-6 mt-10 text-red-600"/></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContent;
