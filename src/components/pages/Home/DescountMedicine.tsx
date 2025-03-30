/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getApi } from "@/components/api/apiCom";
import Discount from "@/utils/discountFun";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaPrescription } from "react-icons/fa6";
const MedicineDiscountSection = () => {
  const [discountMedicines, setdiscountMedicines] = useState<any | null>([]);

  const getDiscountMedicine = async () => {
    const res = await getApi(
      `${process.env.NEXT_PUBLIC_API_URL}/discount-medicine`
    );
    console.log(res);
    setdiscountMedicines(res.data);
  };

  useEffect(() => {
    getDiscountMedicine();
  }, []);
  return (
    <section className="py-7 bg-gradient-to-r from-[var(--primary-light)] to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Timer */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <span className="px-4 py-1 text-sm font-semibold text-white bg-[var(--primary-color)] rounded-full">
              Flash Sale
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-color)] mb-3">
            Todays{" "}
            <span className="text-[var(--primary-color)]">Special Offers</span>
          </h2>
          <p className="text-lg text-[var(--secondary-color)] max-w-2xl mx-auto">
            Limited time discounts on essential medicines
          </p>
        </div>

        {/* Discount Products Grid - No Scroll */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {discountMedicines.map((medicine: any) => (
            <motion.div
              key={medicine?._id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 relative transition-all duration-300 hover:shadow-xl"
            >
              {/* Discount Ribbon - More prominent */}
              {medicine.discount && (
                <div className="absolute top-0 right-0  bg-[var(--primary-color)] text-white text-sm font-bold px-4 py-1 rounded-bl-lg z-[5] shadow-md">
                  {medicine.discountPercentage}% OFF!
                </div>
              )}

              {/* Product Image */}
              <div className="h-48 overflow-hidden bg-gray-100 relative">
                <Image
                  src={medicine.image || "/default-medicine.jpg"}
                  alt={medicine.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Card Content */}
              <div className="p-5">
                {/* Category Tag */}
                <div className="flex justify-between items-center">
                  <span className="inline-block bg-blue-100 text-[var(--primary-color)] text-xs px-2 py-1 rounded-full">
                    {medicine.manufacturer_details.name || "Healthcare"}
                  </span>
                  {medicine.required_prescription ? (
                    <FaPrescription
                      className="text-[var(--primary-color)]"
                      size={20}
                    />
                  ) : (
                    ""
                  )}
                </div>

                {/* Product Name */}
                <h3 className="text-xl font-bold text-gray-900 mt-2 line-clamp-2">
                  {medicine.name}
                </h3>
                <p className="line-clamp-2">{medicine.description}</p>
                {/* Price Display */}

                <div className="flex justify-between items-center">
                  <Discount
                    price={medicine.price}
                    disPrice={medicine.discountPercentage}
                  />
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-400" />
                    <span>
                      Expires:{" "}
                      {new Date(medicine.expiry_date).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/shop/${medicine._id}`}
                    className="flex-1 py-2.5 px-4 bg-[var(--primary-color)] hover:opacity-90 text-white text-center font-medium rounded-lg transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MedicineDiscountSection;
