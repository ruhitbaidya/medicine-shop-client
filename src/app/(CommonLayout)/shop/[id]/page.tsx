"use client"; // Place this at the very top

import { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation"; // Import useParams hook
import { MedicineFormData, TCardFor, Tuser } from "@/app/types/medicinestype";
import { getApi } from "@/components/api/apiCom";
import { ContextCreate } from "@/Context/ContextProvide";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Discount from "@/utils/discountFun";
import { FaCartPlus } from "react-icons/fa";
import SocialShareIcons from "@/utils/SocialShareIcons";
import Image from "next/image";
import ReviewSection from "@/components/pages/Review/ReviewSection";
const MedicineDetails = () => {
  const { user } = useContext(ContextCreate);
  const [founUser, setFoundUser] = useState<Tuser | null>(null);
  const { id } = useParams(); // Get the `id` directly from the dynamic route params
  const { card, setCard } = useContext(ContextCreate);
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

  const handelCard = (data: TCardFor) => {
    const findOne = card.find((item) => item._id === data._id);
    if (!findOne) {
      setCard((prevCard) => [...prevCard, { ...data, quantity: 1 }]);
    }
  };

  useEffect(() => {
    getSingalData();
    setFoundUser(user);
  }, [getSingalData, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
    updated_at,
    discountPercentage,
  } = datas || {};

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div>
              <h4 className="text-3xl font-bold text-center text-gray-800">
                {name}
              </h4>
              <p className="text-gray-600 mt-2">{description}</p>
            </div>
            <div className="flex justify-center items-center">
              <Image
                src={image as string}
                width={200}
                height={200}
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
                    _id: datas?._id,
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
                <p className="text-sm font-medium text-gray-500">Expiry Date</p>
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
                <p className="text-gray-600">{manufacturer_details?.address}</p>
                <p className="text-gray-600">{manufacturer_details?.contact}</p>
              </div>
            </div>

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Last Updated</p>
              <p className="text-gray-600">
                {new Date(updated_at as string).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/** start comment sections */}
      {founUser && <ReviewSection id={_id as string} />}
    </div>
  );
};

export default MedicineDetails;
