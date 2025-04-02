"use client";

import { useContext, useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";
import { MedicineFormData, TCardFor } from "@/app/types/medicinestype";
import { getApi } from "@/components/api/apiCom";
import { ContextCreate } from "@/Context/ContextProvide";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Discount from "@/utils/discountFun";
import { FaCartPlus } from "react-icons/fa";
import SocialShareIcons from "@/utils/SocialShareIcons";
import Image from "next/image";
import ReviewSection from "@/components/pages/Review/ReviewSection";
import Link from "next/link";
import Spinner from "@/components/shaired/spinner";

const MedicineDetails = () => {
  const { user, setCard } = useContext(ContextCreate);
  const { id } = useParams();
  const [datas, setDatas] = useState<MedicineFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getSingalData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getApi(
        `${process.env.NEXT_PUBLIC_API_URL}/getSingalMedicine/${id}`
      );
      if (res?.data) {
        setDatas(res.data);
      } else {
        setError("No data received from the API");
      }
    } catch (error) {
      setError("Error fetching medicine details");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const handelCard = useCallback(
    (data: TCardFor) => {
      setCard((prevCard) => {
        const findOne = prevCard.find((item) => item._id === data._id);
        if (!findOne) {
          return [...prevCard, { ...data, quantity: 1 }];
        }
        return prevCard;
      });
    },
    [setCard]
  );

  useEffect(() => {
    getSingalData();
  }, [getSingalData]);

  const {
    _id,
    name,
    description,
    price,
    image,
    stock_availability,
    required_prescription,
    expiry_date,
    manufacturer_details,
    discountPercentage,
  } = datas || {};

  // Memoize the main content to prevent unnecessary re-renders
  const mainContent = useMemo(() => {
    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          {loading && <Spinner />}
          {datas && (
            <div className="mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Rest of your medicine details JSX */}
              <div className="p-6 border-b border-gray-200">
                <div>
                  <h4 className="text-3xl font-bold text-center text-gray-800">
                    {name}
                  </h4>
                  <p className="text-gray-600 mt-2">{description}</p>
                </div>
                <div className="flex justify-center items-center my-[30px]">
                  <Image
                    src={image as string}
                    width={200}
                    height={200}
                    className="h-[250px] w-auto object-contain"
                    alt={name as string}
                  />
                </div>
                <div className="flex justify-between items-center mt-[20px]">
                  <SocialShareIcons
                    title={name as string}
                    description={description}
                    imageUrl={image}
                  />
                  <button
                    className="btns flex justify-center items-center gap-[15px]"
                    onClick={() =>
                      handelCard({
                        _id: datas._id,
                        discountPercentage: discountPercentage as number,
                        name: name as string,
                        price: price as number,
                        stock_availability: stock_availability as number,
                        required_prescription: required_prescription as boolean,
                        quantity: 1,
                      })
                    }
                    aria-label="Add to cart"
                  >
                    <FaCartPlus size={25} />
                    <b>Add To Card</b>
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">Price</p>
                    <p className="text-xl font-bold text-gray-800 flex items-center gap-[5px]">
                      {(discountPercentage as number) > 0 ? (
                        <>
                          <Discount
                            price={price as number}
                            disPrice={discountPercentage as number}
                          />
                        </>
                      ) : (
                        <>
                          <FaBangladeshiTakaSign />
                          {price}
                        </>
                      )}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">
                      Stock Availability
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                      {stock_availability}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">
                      Prescription Required
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                      {required_prescription ? "✅" : "❌"}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-gray-500">
                      Expiry Date
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                      {new Date(expiry_date as string).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">
                    Manufacturer Details
                  </p>
                  <div className="mt-2">
                    <p className="text-lg font-semibold text-gray-800">
                      {manufacturer_details?.name}
                    </p>
                    <p className="text-gray-600">
                      {manufacturer_details?.address}
                    </p>
                    <p className="text-gray-600">
                      {manufacturer_details?.contact}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Comment section - only render if data is loaded */}
        {!loading && (
          <>
            {user ? (
              <ReviewSection id={_id as string} />
            ) : (
              <p className="text-center font-bold mt-[20px]">
                Please{" "}
                <Link className="text-[#5f63f2]" href="/login">
                  Login
                </Link>{" "}
                Then You Can Review
              </p>
            )}
          </>
        )}
      </div>
    );
  }, [datas, error, loading, handelCard, user, _id]);

  return mainContent;
};

export default MedicineDetails;
