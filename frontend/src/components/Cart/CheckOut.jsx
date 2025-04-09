import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const cart = {
  products: [
    {
      name: "Product 1",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 300,
      image: "https://picsum.photos/200?random=1",
    },
    {
      name: "Product 2",
      size: "M",
      color: "Red",
      quantity: 1,
      price: 300,
      image: "https://picsum.photos/200?random=1",
    },
  ],
  totalPrice: 600,
};

const CheckOut = () => {
  const navigate = useNavigate();
  const [checkOutId,setCheckOutId] = useState(null)
  const [shppmentAddress, setShppmentAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });



  const handleCreateCheckOut = (e) => {
    e.preventDefault();
    setCheckOutId(123)
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
              value="reeturaj@gmail.com"
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
                value={shppmentAddress.firstName}
                onChange={(e) =>
                  setShppmentAddress({
                    ...shppmentAddress,
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
                value={shppmentAddress.lastName}
                onChange={(e) =>
                  setShppmentAddress({
                    ...shppmentAddress,
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
              value={shppmentAddress.address}
              onChange={(e) =>
                setShppmentAddress({
                  ...shppmentAddress,
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
                value={shppmentAddress.city}
                onChange={(e) =>
                  setShppmentAddress({
                    ...shppmentAddress,
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
                value={shppmentAddress.zipCode}
                onChange={(e) =>
                  setShppmentAddress({
                    ...shppmentAddress,
                    zipCode: e.target.value,
                  })
                }
                className="w-full p-2 rounded border focus:outline-none "
                required
              />
            </div>
          </div>


          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              value={shppmentAddress.country}
              onChange={(e) =>
                setShppmentAddress({
                  ...shppmentAddress,
                  country: e.target.value,
                })
              }
              className="w-full p-2 rounded border focus:outline-none "
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="number"
              value={shppmentAddress.phoneNumber}
              onChange={(e) =>
                setShppmentAddress({
                  ...shppmentAddress,
                  phoneNumber: e.target.value,
                })
              }
              className="w-full p-2 rounded border focus:outline-none "
              required
            />
          </div>


          <div className="mb-6">
            {
              !checkOutId ? (
                <button type="submit"  className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 hover:text-white cursor-pointer' >Continue to Payment</button>
              ): (
                <div>
                  <h3 className="text-lg mb-4">
                    Pay with Paypal
                  </h3>
                </div>
              )
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckOut;
