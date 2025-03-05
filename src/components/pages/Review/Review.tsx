"use client"; // Mark this as a client component

import { useState } from "react";

const ReviewComponent = () => {
  // State for the review input
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "John Doe",
      text: "Great medicine! Works perfectly for my acid reflux.",
      date: "2023-07-01",
    },
    {
      id: 2,
      name: "Jane Smith",
      text: "Very effective and affordable. Highly recommended!",
      date: "2023-07-02",
    },
  ]);

  // Handle review submission
  const handleSubmitReview = () => {
    if (review.trim() === "") {
      alert("Please write a review before submitting.");
      return;
    }

    // Add the new review to the list
    const newReview = {
      id: reviews.length + 1,
      name: "Anonymous", // Replace with the logged-in user's name
      text: review,
      date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
    };

    setReviews([...reviews, newReview]);
    setReview(""); // Clear the input field
  };

  return (
    <div className=" mx-auto mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Review Input Section */}
      <div className="p-6 border-b border-gray-200">
        <h4 className="text-2xl font-bold text-gray-800">Leave a Review</h4>
        <textarea
          className="w-full mt-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Write your review..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <button
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          onClick={handleSubmitReview}
        >
          Submit Review
        </button>
      </div>

      {/* Display Reviews Section */}
      <div className="p-6">
        <h4 className="text-2xl font-bold text-gray-800 mb-4">User Reviews</h4>
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800 font-semibold">{review.name}</p>
              <p className="text-gray-600 mt-1">{review.text}</p>
              <p className="text-sm text-gray-500 mt-2">
                Reviewed on {review.date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewComponent;
