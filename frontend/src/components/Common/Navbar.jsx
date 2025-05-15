import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineUserCircle, HiOutlineShoppingBag } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/cartDrawer";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import userimg from "../../assets/U1.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount = cart?.products?.reduce(
    (acc, curr) => acc + curr.quantity,
    0
  );

  const toggleNav = () => {
    setMenuOpen(!menuOpen);
  };
  const toggleCartDrawer = () => {
    setOpen(!open);
  };

  const menCategories = [
    {
      title: "Topwear",
      subcategories: [
        "T-Shirts",
        "Casual Shirts",
        "Formal Shirts",
        "Sweatshirts",
        "Sweaters",
        "Jackets",
        "Blazers & Coats",
        "Suits",
        "Rain Jackets",
      ],
    },
    {
      title: "Bottomwear",
      subcategories: [
        "Jeans",
        "Casual Trousers",
        "Formal Trousers",
        "Shorts",
        "Track Pants & Joggers",
      ],
    },
    {
      title: "Footwear",
      subcategories: [
        "Casual Shoes",
        "Sports Shoes",
        "Formal Shoes",
        "Sneakers",
        "Sandals & Floaters",
        "Flip Flops",
        "Socks",
      ],
    },
    {
      title: "Sports & Activewear",
      subcategories: [
        "Sports Shoes",
        "Active T-Shirts",
        "Trackpants & Shorts",
        "Jackets & Sweatshirts",
        "Accessories",
        "Swimwear",
      ],
    },
    {
      title: "Accessories",
      subcategories: [
        "Wallets",
        "Belts",
        "Perfumes",
        "Caps",
        "Gloves",
        "Helmets",
      ],
    },
  ];

  const womenCategories = [
    {
      title: "Indian & Fusion Wear",
      subcategories: [
        "Kurtas & Suits",
        "Kurtis, Tunics & Tops",
        "Sarees",
        "Ethnic Wear",
        "Leggings, Salwars & Churidars",
        "Skirts & Palazzos",
        "Dress Materials",
        "Lehenga Cholis",
        "Dupattas & Shawls",
        "Jackets",
        "Belts, Scarves & More",
      ],
    },
    {
      title: "Western Wear",
      subcategories: [
        "Dresses",
        "Tops",
        "Tshirts",
        "Jeans",
        "Trousers & Capris",
        "Shorts & Skirts",
        "Co-ords",
        "Playsuits",
        "Jumpsuits",
        "Shrugs",
        "Sweaters & Sweatshirts",
      ],
    },
    {
      title: "Lingerie & Sleepwear",
      subcategories: [
        "Bra",
        "Briefs",
        "Shapewear",
        "Sleepwear & Loungewear",
        "Swimwear",
        "Camisoles & Thermals",
      ],
    },
    {
      title: "Beauty & Personal Care",
      subcategories: [
        "Makeup",
        "Skincare",
        "Premium Beauty",
        "Lipsticks",
        "Fragrances",
      ],
    },
    {
      title: "Jewellery",
      subcategories: ["Fashion Jewellery", "Fine Jewellery", "Earrings"],
    },
  ];

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-4 px-8">
        {/* Logo */}
        <div>
          <NavLink to="/">
            <img
              src="/logo2.png"
              alt="Logo"
              width={160}
              height={50}
              className="shadow-2xl"
            />
          </NavLink>
        </div>

        {/* Center Links */}
        <div className="hidden md:flex space-x-6 relative">
          {/* MEN Link with Flyout */}
          <div className="relative group">
            <NavLink
              to="/collection/all?gender=Men"
              className={({ isActive }) =>
                isActive
                  ? "text-black text-sm font-medium uppercase"
                  : "text-gray-700 hover:text-black text-sm font-medium uppercase"
              }
            >
              Men
            </NavLink>
            {/* Men Dropdown */}
            <div className="absolute ml-38 top-full transform -translate-x-1/2 mt-4 w-[90vw] max-w-7xl bg-white p-8 rounded-lg shadow-xl hidden group-hover:block z-50">
              <div className="grid grid-cols-5 gap-8">
                {menCategories.map((category) => (
                  <div key={category.title}>
                    <h3 className="text-gray-950 font-bold mb-3">
                      {category.title}
                    </h3>
                    <ul className="space-y-2">
                      {category.subcategories.map((item) => (
                        <li
                          key={item}
                          className="text-gray-700 hover:text-black hover:underline text-sm cursor-pointer"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* WOMEN Link with Flyout */}
          {/* WOMEN Link with Flyout */}
          <div className="relative group">
            <NavLink
              to="/collection/all?gender=Women"
              className={({ isActive }) =>
                isActive
                  ? "text-black text-sm font-medium uppercase"
                  : "text-gray-700 hover:text-black text-sm font-medium uppercase"
              }
            >
              Women
            </NavLink>
            {/* Women Dropdown */}
            <div className="absolute ml-30 top-full transform -translate-x-1/2 mt-4 w-[90vw] max-w-7xl bg-white p-8 rounded-lg shadow-xl hidden group-hover:block z-50">
              <div className="grid grid-cols-5 gap-8">
                {womenCategories.map((category) => (
                  <div key={category.title}>
                    <h3 className="text-gray-950 font-bold mb-3">
                      {category.title}
                    </h3>
                    <ul className="space-y-2">
                      {category.subcategories.map((item) => (
                        <li
                          key={item}
                          className="text-gray-700 hover:text-black hover:underline text-sm cursor-pointer"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Wear Link with Flyout */}
          <div className="relative group">
            <NavLink
              to="/collection/all?category=Top Wear"
              className={({ isActive }) =>
                isActive
                  ? "text-black text-sm font-medium uppercase"
                  : "text-gray-700 hover:text-black text-sm font-medium uppercase"
              }
            >
              Top Wear
            </NavLink>
            {/* Top Wear Dropdown */}
          </div>

          {/* Bottom Wear Link with Flyout */}
          <div className="relative group">
            <NavLink
              to="/collection/all?category=Bottom Wear"
              className={({ isActive }) =>
                isActive
                  ? "text-black text-sm font-medium uppercase"
                  : "text-gray-700 hover:text-black text-sm font-medium uppercase"
              }
            >
              Bottom Wear
            </NavLink>
            {/* Bottom Wear Dropdown */}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-6">
          <NavLink to="/profile" className="hover:text-black">
            {user ? (
              <img
                src={userimg}
                alt="User"
                className="h-8 w-8 rounded-full object-cover border border-gray-300"
              />
            ) : (
              <HiOutlineUserCircle className="h-6 w-6 text-gray-700" />
            )}
          </NavLink>
          <button
            onClick={toggleCartDrawer}
            className="relative hover:text-black cursor-pointer"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Search */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>
          {/* Mobile Menu Icon */}
          <button className="md:hidden cursor-pointer" onClick={toggleNav}>
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer open={open} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNav} className="cursor-pointer">
            <IoMdCloseCircleOutline className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <NavLink
              to="/collection/all?gender=Men"
              onClick={toggleNav}
              className={({ isActive }) =>
                isActive
                  ? "block text-black"
                  : "block text-gray-600 hover:text-black"
              }
            >
              Men
            </NavLink>
            <NavLink
              to="/collection/all?gender=Women"
              onClick={toggleNav}
              className={({ isActive }) =>
                isActive
                  ? "block text-black"
                  : "block text-gray-600 hover:text-black"
              }
            >
              Women
            </NavLink>
            <NavLink
              to="/collection/all?category=Top Wear"
              onClick={toggleNav}
              className={({ isActive }) =>
                isActive
                  ? "block text-black"
                  : "block text-gray-600 hover:text-black"
              }
            >
              Top Wear
            </NavLink>
            <NavLink
              to="/collection/all?category=Bottom Wear"
              onClick={toggleNav}
              className={({ isActive }) =>
                isActive
                  ? "block text-black"
                  : "block text-gray-600 hover:text-black"
              }
            >
              Bottom Wear
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
