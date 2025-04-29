import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchProductsByFilters, setFilters } from "../../redux/slice/productsSlice";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSeearchToggle = () => {
    setOpen(!open);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchTerm }));
    dispatch(fetchProductsByFilters({ search: searchTerm }));
    navigate("/collection/all?search=" + searchTerm);
    setOpen(false);
  };
  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        open ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
      }`}
    >
      {open ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-center w-full"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              value={searchTerm}
              placeholder="Search for products, brands and more"
              className="bg-[#F0F0F0] px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-800 cursor-pointer"
            >
              <HiMagnifyingGlass className="h-6 w-6 text-gray-700" />
            </button>
          </div>
          <button
            type="button"
            onClick={handleSeearchToggle}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-800"
          >
            <HiMiniXMark className="h-6 w-6 text-gray-700 cursor-pointer" />
          </button>
        </form>
      ) : (
        <button onClick={handleSeearchToggle} className="cursor-pointer">
          <HiMagnifyingGlass className="h-6 w-6 text-gray-700" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
