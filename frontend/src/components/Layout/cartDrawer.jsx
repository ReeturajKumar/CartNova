import React from 'react'
import { IoMdCloseCircleOutline } from "react-icons/io";
import CartContent from '../Cart/cartContents';
import { useNavigate } from 'react-router-dom';

const CartDrawer = ({open,toggleCartDrawer}) => {

  const navigate = useNavigate();

  const handleCheckOut = () => {
    navigate('/checkout');
  }


  return (
    <div className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col z-50 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className='flex justify-end p-4'>
        <button onClick={toggleCartDrawer} className='cursor-pointer' >
          <IoMdCloseCircleOutline className='h-6 w-6 text-gray-600' />
        </button>
      </div>


      {/* cart content */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className='text-xl font-semibold mb-4 uppercase'>Your Cart</h2>
        <CartContent/>
      </div>

      {/* checkout button */}
      <div className="p-4 bg-white sticky bottom-0">
        <button
        onClick={handleCheckOut}
         className='w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 hover:text-white cursor-pointer' >Go to Checkout</button>
        <p className='text-xs tracking-tight text-gray-500 mt-2 text-center'>
          Shipping, taxes and discounts calculated at checkout
        </p>
      </div>
    </div>
  )
}

export default CartDrawer