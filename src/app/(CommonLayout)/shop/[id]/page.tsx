"use client";
import { MedicineFormData, TCardFor } from "@/app/types/medicinestype";
import { getApi } from "@/components/api/apiCom";
import ReviewComponent from "@/components/pages/Review/Review";
import { ContextCreate } from "@/Context/ContextProvide";
import { useContext, useEffect, useState } from "react";

const MedicineDetails = ({ params }: { params: { id: string } }) => {
  const { card, setCard } = useContext(ContextCreate);
  const [datas, setDatas] = useState<MedicineFormData | null>(null);
  const { id } = params;
  console.log(id);
  const getSingalData = async () => {
    const res = await getApi(
      `${process.env.NEXT_PUBLIC_API_URL}/getSingalMedicine/${id}`
    );
    setDatas(res?.data);
  };
  const handelCard = (data: TCardFor) => {
    const findOne = card.find((item) => item._id === data._id);
    if (!findOne) {
      setCard((prevCard) => [...prevCard, { ...data, quantity: 1 }]);
    }
  };
  useEffect(() => {
    getSingalData();
  }, []);
  return (
    <div>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className=" mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="p-6 border-b border-gray-200">
              <h4 className="text-3xl font-bold text-center text-gray-800">
                {datas?.name}
              </h4>
              <p className="text-center text-gray-600 mt-2">
                {datas?.description}
              </p>
              <div className="flex justify-end items-center">
                <button
                  className="btns"
                  onClick={() =>
                    handelCard({
                      _id: datas?._id,
                      name: datas?.name as string,
                      price: datas?.price as number,
                      stock_availability: datas?.stock_availability as number,
                      required_prescription:
                        datas?.required_prescription as boolean,
                      quantity: 1,
                    })
                  }
                >
                  Add To Card
                </button>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Price */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">Price</p>
                  <p className="text-xl font-bold text-gray-800">
                    ${datas?.price}
                  </p>
                </div>

                {/* Stock Availability */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">
                    Stock Availability
                  </p>
                  <p className="text-xl font-bold text-gray-800">
                    {datas?.stock_availability}
                  </p>
                </div>

                {/* Prescription Required */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">
                    Prescription Required
                  </p>
                  <p className="text-xl font-bold text-gray-800">
                    {datas?.required_prescription ? "✅" : "❌"}
                  </p>
                </div>

                {/* Expiry Date */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-500">
                    Expiry Date
                  </p>
                  <p className="text-xl font-bold text-gray-800">
                    {new Date(
                      datas?.expiry_date as string
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Manufacturer Details */}
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">
                  Manufacturer Details
                </p>
                <div className="mt-2">
                  <p className="text-lg font-semibold text-gray-800">
                    {datas?.manufacturer_details?.name}
                  </p>
                  <p className="text-gray-600">
                    {datas?.manufacturer_details?.address}
                  </p>
                  <p className="text-gray-600">
                    {datas?.manufacturer_details?.contact}
                  </p>
                </div>
              </div>

              {/* Created and Updated At */}
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">
                  Last Updated
                </p>
                <p className="text-gray-600">
                  {new Date(datas?.updated_at as string).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReviewComponent />
    </div>
  );
};

export default MedicineDetails;
