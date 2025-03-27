"use client";
// import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { getApi } from "@/components/api/apiCom";
import Link from "next/link";
import { ContextCreate } from "@/Context/ContextProvide";
import { TCardFor } from "@/app/types/medicinestype";

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
    if (res.data) {
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
              <motion.div
                key={medicine._id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl flex-col justify-between overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
              >
                {/* Medicine Content */}
                <div className="p-6 pt-4">
                  <h3 className="text-xl font-bold text-[var(--text-color)] mb-2">
                    {medicine.name}
                  </h3>
                  <p className="text-[var(--secondary-color)] mb-4">
                    {medicine.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    {/* Price */}
                    <span className="text-xl font-bold text-[var(--primary-color)]">
                      ${medicine.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handelCard(medicine)}
                    className="w-full py-3 bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
                  >
                    Add to Cart
                  </button>
                </div>
              </motion.div>
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
