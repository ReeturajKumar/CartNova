import React, { useEffect, useRef, useState } from 'react'
import img1 from "../assets/N1.jpg";
import img2 from "../assets/BS1.avif";
import img3 from "../assets/N3.jpg";
import img4 from "../assets/BS2.jpg";
import img5 from "../assets/N5.jpg";
import img6 from "../assets/Bs3.jpg";
import img7 from "../assets/N7.jpg";
import img8 from "../assets/RP1.jpeg"
import { FaFilter } from 'react-icons/fa';
import FilterSIdebar from '../components/Products/FilterSIdebar';
import SortOption from '../components/Products/SortOption';
import ProductGrid from './../components/Products/ProductGrid';

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  

  const handleClickOutSide = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);
  
  



  useEffect(() => {
   setTimeout(() => {
     const fetchedProducts=[
       { _id: 1, name: "Stylish Jacket", price: 1000, discountPrice: 5000, images: [{ url: img1 }] },
           { _id: 2, name: "Stylish Shirt", price: 1000,discountPrice: 5000, images: [{ url: img2 }] },
           { _id: 3, name: "Stylish Jeans", price: 1000,discountPrice: 5000, images: [{ url: img3 }] },
           { _id: 4, name: "Trendy T-Shirt", price: 1000,discountPrice: 5000, images: [{ url: img4 }] },
           { _id: 5, name: "Stylish Sneakers", price: 1000,discountPrice: 5000, images: [{ url: img5 }] },
           { _id: 6, name: "Trendy Sunglasses", price: 500,discountPrice: 5000, images: [{ url: img6 }] },
           { _id: 7, name: "Classic Hat", price: 700,discountPrice: 5000, images: [{ url: img7 }] },
           { _id: 8, name: "Elegant Watch", price: 1200,discountPrice: 5000, images: [{ url: img8 }] },
     ];
     setProducts(fetchedProducts);
   }, 1000);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row">
    {/* Mobile Filter Button */}
    <button
      onClick={toggleSidebarOpen}
      className="lg:hidden border border-gray-300 p-2 flex justify-center items-center cursor-pointer"
    >
      <FaFilter className="mr-2" /> Filter
    </button>
  
    {/* Sidebar */}
    <div
  ref={sidebarRef}
  className={`
    ${isSidebarOpen ? 'translate-x-0 z-50' : '-translate-x-full'} 
    fixed inset-y-0 left-0 w-64 bg-white 
    transition-transform duration-300 ease-in-out
    overflow-y-auto scrollbar-hide
    lg:translate-x-0 lg:static lg:z-auto

    
  `}
>
  <FilterSIdebar />
</div>

    <div className='flex-grow p-4'>
      <h2 className="text-2xl uppercase mb-4 font-bold">All Collection</h2>

      <SortOption/>

      <ProductGrid products={products} />
      
    </div>
  </div>
  
  )
}

export default CollectionPage