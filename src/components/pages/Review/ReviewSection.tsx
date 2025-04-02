"use client";
import { ContextCreate } from "@/Context/ContextProvide";
import { useContext, useState } from "react";
import { Rating as ReactRating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { postApi } from "@/components/api/apiCom";
import { toast } from "sonner";
const ReviewSection = ({ id }: { id: string }) => {
  const { user } = useContext(ContextCreate);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState(0);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (id) {
      const res = await postApi(
        `${process.env.NEXT_PUBLIC_API_URL}/create-review`,
        { comment, rating, pid: id, name: user?.name }
      );
      if (res.data._id) {
        setComment("");
        setRating(0);
        setLoading(false);
        toast.success(res.message);
      }
    }
  };
  return (
    <div className="mt-[30px] bg-white py-8">
      <div className="container mx-auto px-[20px]">
        <div className="w-full md:w-[60%] mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Leave a Review
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <ReactRating
                style={{ maxWidth: 150 }}
                value={rating}
                onChange={setRating}
              />
            </div>
            <div>
              <label htmlFor="comment" className="block text-gray-700 mb-2">
                Your Review *
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#4a54e1] focus:border-blue-500 outline-none min-h-[120px]`}
                placeholder="Share your thoughts about this product..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="cursor-pointer bg-[#4a54e1] hover:bg-[#4a54e1] text-white font-medium py-3 px-4 rounded-lg transition duration-200"
            >
              {loading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Submit Review"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
