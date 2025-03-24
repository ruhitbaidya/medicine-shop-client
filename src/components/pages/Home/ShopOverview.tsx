"use client";
import { MedicineFormData } from "@/app/types/medicinestype";
import { getApi } from "@/components/api/apiCom";
import { Spinner2 } from "@/components/shaired/spinner";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ShopOverview = () => {
  const [loading, setLoading] = useState(false);
  const [medicine, setMedicine] = useState<MedicineFormData[]>([]);

  const getMedicine = async () => {
    try {
      setLoading(true);
      const res = await getApi(
        `${process.env.NEXT_PUBLIC_API_URL}/get-medicine`
      );
      if (res?.data) {
        setMedicine(res.data);
      }
    } catch (error) {
      console.error("Error fetching medicines:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMedicine();
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 text-sm font-semibold text-[var(--primary-color)] bg-[var(--primary-light)] rounded-full mb-4">
            Featured Products
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-color)] mb-3">
            Quality{" "}
            <span className="text-[var(--primary-color)]">Medicines</span>
          </h2>
          <p className="text-lg text-[var(--secondary-color)] max-w-2xl mx-auto">
            Trusted healthcare solutions for your wellness journey
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center p-8">
            <Spinner2 />
          </div>
        )}

        {/* Medicine Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {!loading && medicine.length > 0
            ? medicine.slice(0, 6).map((medicine) => (
                <Link href={`/shop/${medicine._id}`} key={medicine._id}>
                  <motion.div
                    variants={item}
                    className="relative bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 group h-full flex flex-col transition-all duration-300 hover:shadow-lg"
                  >
                    {/* Product Content */}
                    <div className="p-6 h-full flex flex-col">
                      <h3 className="text-lg font-bold text-[var(--text-color)] mb-2 line-clamp-2">
                        {medicine.name}
                      </h3>
                      <p className="text-xl font-bold text-[var(--primary-color)] mt-auto">
                        ${medicine.price}
                      </p>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[var(--primary-color)] bg-opacity-0 group-hover:bg-opacity-90 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="text-white font-semibold text-lg">
                        View Details
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))
            : !loading && (
                <div className="col-span-full text-center py-16">
                  <div className="text-[var(--secondary-color)] mb-4">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-[var(--text-color)] mb-2">
                    No medicines available
                  </h3>
                  <p className="text-[var(--secondary-color)]">
                    We are updating our inventory. Please check back soon!
                  </p>
                </div>
              )}
        </motion.div>

        {/* View More Button */}
        {medicine.length > 0 && (
          <div className="text-center mt-14">
            <Link
              href="/shop"
              className="inline-flex items-center px-6 py-3 bg-[var(--primary-color)] text-white font-medium rounded-lg hover:bg-[var(--hover-color)] transition shadow-md"
            >
              Browse All Medicines
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopOverview;
