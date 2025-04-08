import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSIdebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const naviagate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 50,
    maxPrice: 25000,
  });

  const [priceRange, setPriceRange] = useState([50, 25000]);

  const categories = ["Top Wear", "Bottom Wear"];

  const colors = [
    "Red",
    "Blue",
    "Black",
    "Green",
    "Yellow",
    "Gray",
    "Pink",
    "Brown",
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  const materials = ["Cotton", "Silk", "Leather", "Synthetic", "Wool", "Nylon"];

  const brands = [
    "H&M",
    "Zara",
    "Levis",
    "Puma",
    "Nike",
    "Adidas",
    "Polo",
    "Lacoste",
    "Tommy Hilfiger",
    "Gucci",
    "Versace",
    "Prada",
    "Dolce & Gabbana",
  ];

  const genders = ["Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
  gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 50,
      maxPrice: params.maxPrice || 25000,
    });
    setPriceRange([params.minPrice || 50, params.maxPrice || 25000]);
  }, [searchParams]);



  const handleFilterChange = (e) => {
    const { name, value,checked,type } = e.target;
    // console.log({name,value,checked,type});

    let newFilter = { ...filters };
    if(type === "checkbox"){
      if(checked){
        newFilter[name] = [...(newFilter[name]|| []),value];
      }else{
        newFilter[name] = newFilter[name].filter((item) => item !== value);
      }
    }
    else{
      newFilter[name] = value;
    }
    setFilters(newFilter);
    updateURLParams(newFilter);

  }

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();
    Object.keys(newFilters).forEach((key) => {
      if(Array.isArray(newFilters[key]) && newFilters[key].length > 0){
        params.append(key, newFilters[key].join(","));
      }  else if(newFilters[key]){
        params.append(key, newFilters[key]);
      }
    });
    setSearchParams(params);
    naviagate(`?${params.toString()}`);
  }



  return (
    <div className="p-4">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Filter</h3>

      {/* Category Section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Category</label>
        {categories.map((category) => (
          <div key={category} className="flex items-center mb-2">
            <input
              type="radio"
              name="category"
              value={category}
              onChange={handleFilterChange}
              checked={filters.category === category}
              className="mr-1 h-4 w-4 text-gray-800 border-gray-300 accent-black "
            />
            <span className="text-gray-800">{category}</span>
          </div>
        ))}
      </div>

      {/* Gender  Section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Gender</label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-2">
            <input
              type="radio"
              name="gender"
              value={gender}
              onChange={handleFilterChange}
              checked={filters.gender === gender}
              className="mr-1 h-4 w-4 text-gray-800 border-gray-300 accent-black "
            />
            <span className="text-gray-800">{gender}</span>
          </div>
        ))}
      </div>

      {/* Color  Section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Colors</label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <div key={color} className="flex items-center mb-2">
              <button
                key={color}
                name="color"
                value={color}
                onClick={handleFilterChange}
                className={`h-8 w-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${filters.color === color ? "ring-2 ring-gray-400" : ""}`}
                style={{ backgroundColor: color.toLocaleLowerCase() }}
              ></button>
            </div>
          ))}
        </div>
      </div>

      {/* Size  Section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Size</label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-2">
            <input
              type="checkbox"
              name="size"
              value={size}
              onChange={handleFilterChange}
              checked={filters.size.includes(size)}
              className="mr-1 h-4 w-4 text-gray-800 border-gray-300 accent-black "
            />
            <span className="text-gray-800">{size}</span>
          </div>
        ))}
      </div>

      {/* Material  Section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Material</label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-2">
            <input
              type="checkbox"
              name="material"
              value={material}
              onChange={handleFilterChange}
              checked={filters.material.includes(material)}
              className="mr-1 h-4 w-4 text-gray-800 border-gray-300 accent-black "
            />
            <span className="text-gray-800">{material}</span>
          </div>
        ))}
      </div>

      {/* Brands  Section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Brands</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-2">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              checked={filters.brand.includes(brand)}
              className="mr-1 h-4 w-4 text-gray-800 border-gray-300 accent-black "
            />
            <span className="text-gray-800">{brand}</span>
          </div>
        ))}
      </div>

      {/* Price  Section */}
      <div className="mb-6">
        <label className="block text-gray-600 font-medium mb-2">Price Range</label>
        <input
          type="range"
          name="priceRange"
          min={50}
          max={25000}
         
          className="w-full h-2 bg-gray-300 rounded-lg  appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>$50</span> 
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
};

export default FilterSIdebar;
