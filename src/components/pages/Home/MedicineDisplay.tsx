"use client";
// import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { getApi } from "@/components/api/apiCom";
import Link from "next/link";
import { ContextCreate } from "@/Context/ContextProvide";
import { TCardFor } from "@/app/types/medicinestype";
import Image from "next/image";
import { FaPrescription } from "react-icons/fa6";
import { FaCalendarAlt, FaCartPlus } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { mySkelaton } from "@/utils/Skilaton";

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
  discountPercentage: number;
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
        {loading && (
          <div className="grid grid-cols-3 gap-[25px]">{mySkelaton}</div>
        )}
        {/* Medicine Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {medicines &&
            medicines?.map((medicine: Medicine) => (
              <div key={medicine._id} className="">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group relative"
                >
                  <Link href={`shop/${medicine._id}`}>
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
                    </div>

                    {/* Content Container */}
                    <div className="px-5">
                      {/* Medicine Name */}
                      <h3 className="text-xl mt-5 font-bold text-gray-900 group-hover:text-[var(--primary-color)] transition-colors">
                        {medicine.name}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 my-[20px] text-sm line-clamp-2">
                        {medicine.description}
                      </p>

                      {/* Expiry Date */}
                      <div className="flex justify-between items-center gap-2 text-sm text-gray-500 mt-1">
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
                        <div>
                          {medicine.required_prescription ? (
                            <FaPrescription
                              className="text-[var(--primary-color)]"
                              size={20}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                  {/* Price and Actions */}
                  <div className="mt-3 pt-3 border-t border-gray-100 p-5">
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
                </motion.div>
              </div>
            ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/shop">
            <button className="px-8 py-3 text-white bg-[var(--primary-color)]  font-semibold rounded-lg border-2 border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-all shadow-sm hover:shadow-md">
              View All Medicines
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MedicineDisplaySection;
