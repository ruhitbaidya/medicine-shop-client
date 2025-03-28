"use client";
// import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { getApi } from "@/components/api/apiCom";
import Link from "next/link";
import { ContextCreate } from "@/Context/ContextProvide";
import { TCardFor } from "@/app/types/medicinestype";
import Image from "next/image";
import { RxSewingPinFilled } from "react-icons/rx";
import {
  FaCalendarAlt,
  FaCartPlus,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

interface ManufacturerDetails {
  name: string;
  address: string;
  contact: string;
}

interface Medicine {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stock_availability: number;
  required_prescription: boolean;
  manufacturer_details: ManufacturerDetails;
  expiry_date: string;
}

const MedicineDisplaySection = () => {
  const { card, setCard } = useContext(ContextCreate);
  const [loading, setLoading] = useState<boolean>(true);
  const [medicines, setMedicines] = useState<Medicine[] | []>([]);

  const getMedicines = async () => {
    const res = await getApi(
      `${process.env.NEXT_PUBLIC_API_URL}/get-hight-price-medicine`
    );
    setMedicines(res?.data);

    if (res?.data) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMedicines();
  }, []);
  const handelCard = (data: TCardFor) => {
    const findOne = card.find((item) => item._id === data._id);
    if (!findOne) {
      setCard((prevCard) => [...prevCard, data]);
    }
  };
  return (
    <section className="py-7 bg-gradient-to-b from-[var(--background-light)] to-[var(--background-color)]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[var(--text-color)] mb-4">
            Premium{" "}
            <span className="text-[var(--primary-color)]">Pharmacy</span>
          </h2>
          <p className="text-lg text-[var(--secondary-color)] max-w-2xl mx-auto">
            High-quality medicines for your wellness journey
          </p>
        </div>
        {loading &&
          // Skeleton loader when data is loading
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse"
            >
              {/* Skeleton Header */}
              <div className="p-6 pb-0">
                <div className="h-4 bg-gray-200 rounded-full w-24 mb-4"></div>
              </div>

              {/* Skeleton Content */}
              <div className="p-6 pt-4">
                <div className="h-6 bg-gray-200 rounded-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-full mb-4"></div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-5 bg-gray-200 rounded-full w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        {/* Medicine Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {medicines &&
            medicines?.map((medicine: Medicine) => (
              <Link key={medicine._id} href={`shop/${medicine._id}`}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group relative"
                >
                  {/* Image with Floating Badges */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={medicine.image}
                      width={400}
                      height={400}
                      alt={medicine.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      {medicine.required_prescription && (
                        <span className="bg-red-500/95 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm">
                          <RxSewingPinFilled className="inline mr-1" /> RX Only
                        </span>
                      )}
                      <span
                        className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm ${
                          medicine.stock_availability > 0
                            ? "bg-green-500/95 text-white"
                            : "bg-gray-400/95 text-gray-800"
                        }`}
                      >
                        {medicine.stock_availability > 0 ? (
                          <FaCheckCircle className="inline mr-1" />
                        ) : (
                          <FaTimesCircle className="inline mr-1" />
                        )}
                        {medicine.stock_availability > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-5 flex flex-col gap-3">
                    {/* Medicine Name */}
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[var(--primary-color)] transition-colors">
                      {medicine.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm line-clamp-2 min-h-[40px]">
                      {medicine.description}
                    </p>

                    {/* Expiry Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
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

                    {/* Price and Actions */}
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-[var(--primary-color)] flex items-center">
                          <FaBangladeshiTakaSign className="mr-1" />
                          {medicine.price.toFixed(2)}
                        </span>

                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handelCard(medicine)}
                            disabled={medicine.stock_availability <= 0}
                            className={`p-2 rounded-full transition-colors ${
                              medicine.stock_availability > 0
                                ? "bg-[var(--primary-color)] text-white hover:bg-[var(--primary-dark)]"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                            title="Add to Cart"
                          >
                            <FaCartPlus />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/shop">
            <button className="px-8 py-3 bg-white text-[var(--primary-color)] font-semibold rounded-lg border-2 border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-all shadow-sm hover:shadow-md">
              View All Medicines
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MedicineDisplaySection;
