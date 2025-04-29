import React from 'react';
import { FaStar } from 'react-icons/fa';

const AverageRating = ({ averageRating = 0, totalReviews = 0 }) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      {/* Average Rating */}
      <div className="flex items-center">
        <h3 className="text-lg font-semibold mr-2">
          Average Rating: {averageRating} ⭐
        </h3>
        {/* Star Icons */}
      </div>

      {/* Total Reviews */}
      <p className="text-gray-600 text-sm">{totalReviews} reviews</p>
    </div>
  );
};

export default AverageRating;
