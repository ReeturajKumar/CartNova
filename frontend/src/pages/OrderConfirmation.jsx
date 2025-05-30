import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {CheckCircle2,MapPin,Clock4,ArrowRight,PackageCheck} from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from "../redux/slice/cartSlice";
import axios from "axios";


const OrderConfirmation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {checkout} = useSelector((state) => state.checkout);


  useEffect(() => {
    const clearCartAfterOrder = async () => {
      try {
        if (checkout && checkout._id) {
          await axios.delete(`${import.meta.env.VITE_BASE_URL}/cart/clear-cart`, {
            data: {
              guestId: localStorage.getItem("guestId"), // if guest
              userId: JSON.parse(localStorage.getItem("userInfo"))?._id, // if user
            }
          });
          dispatch(clearCart()); // Clear Redux cart
          localStorage.removeItem("cart"); // Clear localStorage cart
        } else {
          navigate("/my-orders");
        }
      } catch (error) {
        console.error("Error clearing cart after order", error);
      }
    };
  
    clearCartAfterOrder();
  }, [checkout, dispatch, navigate]);
  



  const calculateEstimatedDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    if (isNaN(orderDate.getTime())) {
      return "Invalid order date";
    }
  
    orderDate.setDate(orderDate.getDate() + 7);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return orderDate.toLocaleDateString('en-US', options);
  };

  

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-10 min-h-screen">
      <div className="bg-white rounded-xl p-4 sm:p-10">
        <div className="flex flex-col items-center text-center m8-10">
          <CheckCircle2 size={48} className="text-green-600 mb-2" />
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Thank you for your order!
          </h1>
          <p className="text-gray-600 mt-2">Your order has been successfully placed.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Order Items */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mt-5 mb-4">Order Summary</h2>
            <div className="space-y-4">
              {checkout.checkoutItems.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-gray-100 rounded-lg p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="text-md font-semibold text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-700 font-medium">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <p className="text-sm text-gray-500">Color: {item.color}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-5">Shipping Details</h2>
            <div className="bg-gray-100 p-5 rounded-lg space-y-4">
              <div className="flex items-start gap-3 text-gray-700">
                <MapPin size={20} className="mt-1 text-gray-500" />
                <div>
                  <p className="font-medium leading-snug">
                    {checkout.shippingAddress.address},
                    {checkout.shippingAddress.city}, {checkout.shippingAddress.state} - {checkout.shippingAddress.zipCode}
                    {checkout.shippingAddress.country}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Clock4 size={20} className="text-gray-500" />
                <p>
                  Estimated Delivery: <span className="font-semibold">
                    {calculateEstimatedDelivery(checkout.createdAt)}
                  </span>
                </p>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <PackageCheck size={20} className="text-gray-500" />
                <p>
                  Delivery Method: <span className="font-semibold">Standard Shipping</span>
                </p>

                
              </div>
              
              <div className="flex justify-between items-center">
  <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-4 py-1 rounded-full">
    Status: Preparing for Shipment
  </span>

  <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-4 py-1 rounded-full">
    Payment: Paypal
  </span>
</div>

            </div>

            
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">Order ID: #{checkout._id}</p>
          <Link to={"/"}>
          <button className="inline-flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg text-sm hover:bg-gray-800 transition cursor-pointer">
            Continue Shopping <ArrowRight size={16} />
          </button></Link>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
