import React from "react";
import {
  HiShoppingBag,
  HiArrowPathRoundedSquare,
  HiOutlineCreditCard,
} from "react-icons/hi2";

const features = [
  {
    icon: <HiShoppingBag className="w-10 h-10 text-black" />,
    title: "Free International Shipping",
    description: "Free shipping on all orders over $50",
  },
  {
    icon: <HiArrowPathRoundedSquare className="w-10 h-10 text-black" />,
    title: "45 Day Return Policy",
    description: "Money-back guarantee for hassle-free returns.",
  },
  {
    icon: <HiOutlineCreditCard className="w-10 h-10 text-black" />,
    title: "Secure Payment",
    description: "100% secure and encrypted transactions for your safety.",
  },
];

const FeaturesSection = () => {
  return (
    <section
      className="py-12 px-6"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
           
            className="flex flex-col items-center text-center p-6 rounded-lg"
          >
            <div className="p-4 bg-gray-100 rounded-full mb-4">{feature.icon}</div>
            <h4 className="text-lg font-semibold uppercase tracking-wide mb-2">
              {feature.title}
            </h4>
            <p className="text-sm text-gray-700 max-w-xs">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
