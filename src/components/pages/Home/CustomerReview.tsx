"use client";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Alice Johnson",
    rating: 5,
    review: "Excellent service! Fast delivery and high-quality medicine.",
  },
  {
    id: 2,
    name: "Mark Smith",
    rating: 4.5,
    review:
      "Great experience. The packaging was good, and the products were genuine.",
  },
  {
    id: 3,
    name: "Emily Davis",
    rating: 4,
    review: "Good service, but delivery took a bit longer than expected.",
  },
  {
    id: 4,
    name: "Michael Brown",
    rating: 5,
    review: "Highly recommend! Their customer support is amazing.",
  },
  {
    id: 5,
    name: "Sophia Wilson",
    rating: 4.5,
    review:
      "Very convenient. Ordering process was smooth, and I got what I needed.",
  },
  {
    id: 6,
    name: "James Anderson",
    rating: 5,
    review: "Best pharmacy online! I will definitely order again.",
  },
];

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex text-yellow-400">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={`full-${index}`} />
      ))}
      {halfStar && <FaStarHalfAlt />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={`empty-${index}`} />
      ))}
    </div>
  );
};

const CustomerReviews = () => {
  return (
    <section className="py-7 bg-[var(--background-color)]">
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[var(--primary-color)]">
            Customer Reviews
          </h2>
          <p className="text-[var(--secondary-color)] mt-2">
            What our customers say about us.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <div className="text-lg font-semibold text-[var(--text-color)]">
                {review.name}
              </div>
              <div className="mt-2">{renderStars(review.rating)}</div>
              <p className="text-[var(--secondary-color)] mt-3">
                {review.review}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
