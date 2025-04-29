import React from "react";

const categories = [
  {
    title: "Topwear",
    items: ["T-Shirts", "Casual Shirts", "Formal Shirts", "Sweatshirts", "Sweaters", "Jackets", "Blazers & Coats", "Suits", "Rain Jackets"],
  },
  {
    title: "Bottomwear",
    items: ["Jeans", "Casual Trousers", "Formal Trousers", "Shorts", "Track Pants & Joggers"],
  },
  {
    title: "Innerwear & Sleepwear",
    items: ["Briefs & Trunks", "Boxers", "Vests", "Sleepwear & Loungewear", "Thermals"],
  },
  {
    title: "Footwear",
    items: ["Casual Shoes", "Sports Shoes", "Formal Shoes", "Sneakers", "Sandals & Floaters", "Flip Flops", "Socks"],
  },
  {
    title: "Fashion Accessories",
    items: ["Wallets", "Belts", "Perfumes & Body Mists", "Caps & Hats", "Phone Cases", "Helmets"],
  }
];

const MegaMenu = () => {
  return (
    <div className="absolute left-0 top-full bg-white shadow-lg w-full flex justify-center">
      <div className="max-w-6xl w-full grid grid-cols-5 gap-8 p-8">
        {categories.map((cat, idx) => (
          <div key={idx}>
            <h3 className="text-pink-600 font-bold mb-3">{cat.title}</h3>
            <ul className="space-y-2">
              {cat.items.map((item, index) => (
                <li key={index} className="text-gray-700 text-sm hover:underline cursor-pointer">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;
