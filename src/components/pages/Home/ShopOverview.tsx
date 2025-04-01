"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaPills,
  FaHeartbeat,
  FaCapsules,
  FaPrescriptionBottleAlt,
  FaEyeDropper,
  FaFirstAid,
} from "react-icons/fa";

const medicineCategories = [
  {
    name: "Antibiotics",
    category: "Infection",
    icon: (
      <FaPills className="text-3xl" style={{ color: "var(--primary-color)" }} />
    ),
    bgColor: "bg-[var(--primary-light)]",
    borderColor: "border-[var(--primary-color)]",
  },
  {
    name: "Cardiac Care",
    category: "Heart",
    icon: (
      <FaHeartbeat
        className="text-3xl"
        style={{ color: "var(--primary-color)" }}
      />
    ),
    bgColor: "bg-[var(--primary-light)]",
    borderColor: "border-[var(--primary-color)]",
  },
  {
    name: "Eye Care",
    category: "Support",
    icon: (
      <FaEyeDropper
        className="text-3xl"
        style={{ color: "var(--primary-color)" }}
      />
    ),
    bgColor: "bg-[var(--primary-light)]",
    borderColor: "border-[var(--primary-color)]",
  },
  {
    name: "First Aid",
    category: "health",
    icon: (
      <FaFirstAid
        className="text-3xl"
        style={{ color: "var(--primary-color)" }}
      />
    ),
    bgColor: "bg-[var(--primary-light)]",
    borderColor: "border-[var(--primary-color)]",
  },
  {
    name: "Capsules",
    category: "General",
    icon: (
      <FaCapsules
        className="text-3xl"
        style={{ color: "var(--primary-color)" }}
      />
    ),
    bgColor: "bg-[var(--primary-light)]",
    borderColor: "border-[var(--primary-color)]",
  },
  {
    name: "Syrup",
    category: "Vitamins",
    icon: (
      <FaPrescriptionBottleAlt
        className="text-3xl"
        style={{ color: "var(--primary-color)" }}
      />
    ),
    bgColor: "bg-[var(--primary-light)]",
    borderColor: "border-[var(--primary-color)]",
  },
];

const ShopOverview = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span className="inline-block px-4 py-2 text-sm font-medium text-[var(--primary-color)] bg-[var(--primary-light)] rounded-full mb-4">
            Medical Categories
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-color)] mb-4">
            Essential{" "}
            <span className="text-[var(--primary-color)]">Medicine</span>{" "}
            Categories
          </h2>
          <p className="text-[var(--text-light)] max-w-2xl mx-auto">
            Browse our carefully curated selection of medical essentials
          </p>
        </div>

        {/* Medicine Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {medicineCategories.map((category, index) => (
            <Link href={`/search?name=${category.category}`} key={index}>
              <motion.div
                whileHover={{ y: -5 }}
                className={`${category.bgColor} rounded-lg overflow-hidden shadow-sm hover:shadow-md border ${category.borderColor} h-full transition-all duration-300 p-6 flex flex-col items-center`}
              >
                <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-color)] text-center mb-2">
                  {category.name}
                </h3>
                <div className="mt-2 text-sm text-[var(--primary-color)] hover:text-[var(--primary-dark)] transition-colors">
                  Shop Now →
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        {/* View More Button */}
        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center px-[45px] py-[15px] bg-[var(--primary-color)]  text-white font-medium rounded-lg transition-all duration-300 shadow hover:shadow-md"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopOverview;
