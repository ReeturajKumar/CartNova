import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { submitReview } from '../../redux/slice/productsSlice';
import AverageRating from "./AvrageRating"
import { FaStar } from 'react-icons/fa';

const ProductReview = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);

  const dispatch = useDispatch();

  const handleStarClick = (star) => {
    setRating(star);
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/${productId}`);
      const data = await response.json();
      if (response.ok) {
        const reviewsData = data.reviews || [];
        setReviews(reviewsData);

        // Calculate Average Rating
        if (reviewsData.length > 0) {
          const totalRating = reviewsData.reduce((sum, review) => sum + review.rating, 0);
          const avgRating = totalRating / reviewsData.length;
          setAverageRating(avgRating.toFixed(1)); // one decimal
        } else {
          setAverageRating(0);
        }
      } else {
        toast.error(data?.message || 'Failed to fetch reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Something went wrong while fetching reviews');
    }
  };

  const handleSubmit = async () => {
    if (rating === 0 || !comment.trim()) {
      toast.error('Please provide a rating and comment');
      return;
    }

    const reviewData = {
      rating,
      comment,
      name: "Anonymous",
    };

    setSubmittingReview(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products/${productId}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify(reviewData),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(submitReview(reviewData));
        toast.success('Your review has been submitted!');
        setRating(0);
        setComment('');
        setSubmitted(true);
        fetchReviews(); // Re-fetch reviews after submitting
      } else {
        toast.error(data?.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Something went wrong');
    } finally {
      setSubmittingReview(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>

      {/* Average Rating Component */}
      <AverageRating averageRating={averageRating} totalReviews={reviews.length} />

      {/* Star Rating */}
      <div className="flex items-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
            onClick={() => handleStarClick(star)}
            size={24}
          />
        ))}
      </div>

      {/* Review Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        rows="4"
        className="w-full border border-gray-300 p-3 rounded-md mb-4"
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={rating === 0 || !comment.trim() || submittingReview}
        className={`w-full py-2 text-white rounded-md ${
          rating === 0 || !comment.trim() || submittingReview
            ? 'bg-gray-400'
            : 'bg-black hover:bg-gray-800'
        }`}
      >
        {submittingReview ? 'Submitting...' : 'Submit Review'}
      </button>

      {/* Success Message */}
      {submitted && (
        <p className="mt-4 text-green-500">Your review has been submitted successfully!</p>
      )}

      {/* List of Reviews */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">User Reviews:</h3>
        {reviews.length === 0 ? (
          <p>No reviews yet!</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="border-b py-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center font-bold text-sm">
                  {review.name?.[0]}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">{review.name}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="mt-2 ml-10">{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductReview;
