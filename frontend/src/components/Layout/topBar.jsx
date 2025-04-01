import React from 'react'
import {TbBrandMeta} from 'react-icons/tb'
import { IoLogoInstagram } from "react-icons/io5";
import { RiTwitterXLine } from "react-icons/ri";

const TopBar = () => {
  return (
    <div className='bg-[#ea2e0e] text-white'>
      <div className="container mx-auto flex items-center justify-between py-4 px-5 h-10">
        <div className='hidden md:flex items-center space-x-4'>
          <a href="#" className='hover:text-gray-300'>
            <TbBrandMeta className='h-5 w-5'/>
          </a>
          <a href="#" className='hover:text-gray-300'>
            <IoLogoInstagram className='h-5 w-5'/>
          </a>
          <a href="#" className='hover:text-gray-300'>
            <RiTwitterXLine  className='h-4 w-4'/>
          </a>
        </div>
        <div className='text-sm text-center flex-grow'>
          <span>
            We Ship WorldWide - Fast and Reliable Shipping!
          </span>
        </div>
        <div className='text-sm text-center hidden md:block'>
          <a href="tel:+91 6299-0457-61" className='hover:text-gray-300'>
            +91 6299-0457-61
          </a>
        </div>
      </div>
    </div>
  )
}

export default TopBar