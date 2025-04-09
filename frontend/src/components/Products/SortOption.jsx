import React from 'react'
import { useSearchParams } from 'react-router-dom';

const SortOption = () => {

  const [searchParams, setSearchParams] = useSearchParams();


  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };



  return (
    <div className="mb-6 flex items-center justify-end">
    <label htmlFor="sort" className="mr-2 text-sm font-medium text-gray-700">
      Sort by:
    </label>
    <select
      id="sort"
      onChange={handleSortChange}
      value={searchParams.get("sortBy") || ""}
      className="border border-gray-300 bg-white text-gray-800 text-sm rounded-lg px-4 py-2 shadow-sm focus:outline-none transition duration-200 "
    >
      <option value="">Default</option>
      <option value="priceAsc">Price: Low to High</option>
      <option value="priceDesc">Price: High to Low</option>
      <option value="popularity">Popularity</option>
    </select>
  </div>
  
  )
}

export default SortOption