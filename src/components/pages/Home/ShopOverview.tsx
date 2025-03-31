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

// First, define your CSS variables (add this to your global CSS file)
// :root {
//   --primary-color: #4a54e1;      // Professional blue
//   --primary-light: #e0e2f8;     // Light blue
//   --primary-dark: #3a42b8;      // Darker blue
//   --text-color: #2d3748;        // Dark gray for text
//   --text-light: #718096;        // Light gray for secondary text
// }

const medicineCategories = [
  {
    name: "Antibiotics",
    icon: (
      <FaPills className="text-3xl" style={{ color: "var(--primary-color)" }} />
    ),
    bgColor: "bg-[var(--primary-light)]",
    borderColor: "border-[var(--primary-color)]",
  },
  {
    name: "Cardiac Care",
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
    name: "Syrups",
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
            <Link href={`/search?name=${category.name}`} key={index}>
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
