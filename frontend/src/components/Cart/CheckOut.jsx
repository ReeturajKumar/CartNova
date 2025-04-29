import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from 'react-redux';
import { createCheckOutSession } from './../../redux/slice/checkOutSlice';
import axios from "axios";


const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {cart,loading,error} = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [checkOutId, setCheckOutId] = useState(null);
  const [shippingAddress, setshippingAddress] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });


  useEffect(() => {
    if (!cart || !cart.products || cart.productslength === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckOut = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      try {
        const res = await dispatch(createCheckOutSession({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: "PayPal",
          totalPrice: cart.totalPrice
        }));
        if (res.payload && res.payload._id) {
          setCheckOutId(res.payload._id);
        }
      } catch (error) {
        console.error("Error during checkout creation:", error);
      }
    }
  };
  

  const handlePaymentSuccess = async (details) => {
   try {
    const response = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/checkout/update-status/${checkOutId}/payment`,
      {
        paymentStatus : "Paid",
        paymentDetails : details,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken"),
        },
      }
    )
    if (response.status === 200) {
      await handleFinalizeCheckOut(checkOutId);
    }
   } catch (error) {
     console.log(error);
   }
  };


  const handleFinalizeCheckOut = async (checkOutId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/checkout/update-status/${checkOutId}/finalize`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("userToken"),
          },
        }
      );
      if (response.status === 200) {
        navigate("/order-confirmation");
      }
    } catch (error) {
      console.log(error);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;  
  }

  if (!cart || !cart.products || cart.products.length === 0) {
    return <div>Your Cart is empty</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tight">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">CheckOut</h2>
        <form onSubmit={handleCreateCheckOut}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={user?.email}
              className="w-full p-2 rounded bg-gray-100"
              disabled
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setshippingAddress({
                    ...shippingAddress,
                    firstName: e.target.value,
                  })
                }
                className="w-full p-2 rounded border focus:outline-none "
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setshippingAddress({
                    ...shippingAddress,
                    lastName: e.target.value,
                  })
                }
                className="w-full p-2 rounded border focus:outline-none "
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              value={shippingAddress.address}
              onChange={(e) =>
                setshippingAddress({
                  ...shippingAddress,
                  address: e.target.value,
                })
              }
              className="w-full p-2 rounded border focus:outline-none "
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                value={shippingAddress.city}
                onChange={(e) =>
                  setshippingAddress({
                    ...shippingAddress,
                    city: e.target.value,
                  })
                }
                className="w-full p-2 rounded border focus:outline-none "
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Postal Code
              </label>
              <input
                type=""
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setshippingAddress({
                    ...shippingAddress,
                    postalCode: e.target.value,
                  })
                }
                className="w-full p-2 rounded border focus:outline-none "
                required
              />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              State
            </label>
            <input
              type="text"
              value={shippingAddress.state}
              onChange={(e) =>
                setshippingAddress({
                  ...shippingAddress,
                  state: e.target.value,
                })
              }
              className="w-full p-2 rounded border focus:outline-none "
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              value={shippingAddress.country}
              onChange={(e) =>
                setshippingAddress({
                  ...shippingAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 rounded border focus:outline-none "
              required
            />
          </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="number"
              value={shippingAddress.phoneNumber}
              onChange={(e) =>
                setshippingAddress({
                  ...shippingAddress,
                  phoneNumber: e.target.value,
                })
              }
              className="w-full p-2 rounded border focus:outline-none "
              required
            />
          </div>

          <div className="mb-6">
            {!checkOutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 hover:text-white cursor-pointer"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">
                  <PayPalButton
                    amount={cart.totalPrice}
                    onSuccess={handlePaymentSuccess}
                    onError={(err) => console.log("Payment Faildef" + err)}
                  />
                </h3>
              </div>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white text-black rounded-xl p-6 sticky top-6 border border-gray-200">
        <h3 className="text-xl font-semibold mb-5">Order Summary</h3>

        {/* Products List */}
        <div className="space-y-5 mb-6">
          {cart.products.map((product, index) => (
            <div key={index} className="flex items-start justify-between">
              <div className="flex gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-20 object-cover rounded border border-gray-100"
                />
                <div className="text-sm space-y-1">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  ${product.price.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Qty: {product.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Promo Code */}
        <div className="mb-4">
          <label htmlFor="promo" className="text-sm font-medium block mb-1">
            Promo Code
          </label>
          <div className="flex border rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 px-3 py-2 text-sm focus:outline-none"
            />
            <button className="bg-black text-white px-4 text-sm hover:bg-gray-800 transition">
              Apply
            </button>
          </div>
        </div>

        {/* Cart Note */}
        <div className="mb-6">
          <label htmlFor="note" className="text-sm font-medium block mb-1">
            Order Note
          </label>
          <textarea
            rows="6"
            placeholder="Add special instructions"
            className="w-full border rounded-md p-2 text-sm focus:outline-none"
          ></textarea>
        </div>

        {/* Pricing Breakdown */}
        <div className="text-sm space-y-2 border-t border-gray-200 pt-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${cart.totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between text-base font-semibold">
          <span>Total</span>
          <span>${cart.totalPrice.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
