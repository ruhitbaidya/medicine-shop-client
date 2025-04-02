"use client";
import { getApi } from "@/components/api/apiCom";
import { mySkelaton } from "@/utils/Skilaton";
import { Rating as ReactRating } from "@smastrom/react-rating";
import { useEffect, useState } from "react";
import "@smastrom/react-rating/style.css";
type TRating = {
  _id: string;
  comment: string;
  name: string;
  rating: number;
};
const CustomerReviews = () => {
  const [review, setReview] = useState<TRating[] | []>([]);
  const [loading, setLoading] = useState(false);
  const getReview = async () => {
    const res = await getApi(
      `${process.env.NEXT_PUBLIC_API_URL}/get-all-review`
    );
    if (res.data.length > 0) {
      setLoading(false);
      setReview(res.data);
    }
    console.log(res);
  };

  useEffect(() => {
    setLoading(true);
    getReview();
  }, []);
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
        {loading ? (
          <>
            <div className="grid grid-cols-3 gap-[25px]">{mySkelaton}</div>
          </>
        ) : (
          <></>
        )}
        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {review &&
            review.slice(0, 6).map((item) => (
              <div
                key={item?._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
              >
                <div className="text-lg font-semibold text-[var(--text-color)]">
                  {item?.name}
                </div>
                <div className="mt-2">
                  <div>
                    <ReactRating
                      style={{ maxWidth: 150 }}
                      value={item?.rating}
                    />
                  </div>
                </div>
                <p className="text-[var(--secondary-color)] mt-3">
                  {item?.comment}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
