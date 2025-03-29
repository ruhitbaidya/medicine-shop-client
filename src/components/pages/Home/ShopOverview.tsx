"use client";
import Link from "next/link";

import { motion } from "framer-motion";
const medicineCat = ["antibiotic", "drop", "captule", "Syrup", "health", "gel"];
const ShopOverview = () => {
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
    <section className="py-7 bg-gray-100">
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

        {/* Medicine Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {medicineCat.map((medicine, ind) => (
            <Link href={`/search?name=${medicine}`} key={ind}>
              <motion.div
                variants={item}
                className="relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 group h-full flex flex-col transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Background Gradient Layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-60 z-0" />

                {/* Product Content - Same Text */}
                <div className="relative p-6 h-[200px] flex justify-center items-center z-10">
                  <h3 className="text-2xl font-bold text-[var(--text-color)] capitalize text-center leading-tight">
                    {medicine}
                  </h3>
                </div>

                {/* Enhanced Hover Overlay - Same Text */}
                <div className="absolute z-10 inset-0 bg-gradient-to-t from-[var(--primary-color)] to-transparent bg-opacity-0 group-hover:bg-opacity-100 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-white font-semibold text-xl block mb-1">
                      View Product
                    </span>
                    <div className="w-12 h-0.5 bg-white/70 mx-auto mt-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                  </div>
                </div>

                {/* Subtle Corner Accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-[var(--primary-color)] opacity-5 group-hover:opacity-20 transition-opacity duration-500" />
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* View More Button */}

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
      </div>
    </section>
  );
};

export default ShopOverview;
