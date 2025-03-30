"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaPills,
  FaFlask,
  FaHeartbeat,
  FaCapsules,
  FaPrescriptionBottleAlt,
  FaEyeDropper,
  FaLaptopMedical,
  FaBacterium,
  FaLeaf,
  FaArrowRight,
  FaStethoscope,
  FaFirstAid,
  FaAllergies,
  FaThermometerHalf,
} from "react-icons/fa";

const medicineCategories = [
  { name: "antibiotics", icon: <FaBacterium className="text-3xl" /> },
  { name: "eye care", icon: <FaEyeDropper className="text-3xl" /> },
  { name: "capsules", icon: <FaCapsules className="text-3xl" /> },
  { name: "syrups", icon: <FaPrescriptionBottleAlt className="text-3xl" /> },
  { name: "cardiac", icon: <FaHeartbeat className="text-3xl" /> },
  { name: "ointments", icon: <FaFlask className="text-3xl" /> },
  { name: "tablets", icon: <FaPills className="text-3xl" /> },
  { name: "devices", icon: <FaLaptopMedical className="text-3xl" /> },
  { name: "herbal", icon: <FaLeaf className="text-3xl" /> },
  { name: "first aid", icon: <FaFirstAid className="text-3xl" /> },
  { name: "allergy", icon: <FaAllergies className="text-3xl" /> },
  { name: "thermometers", icon: <FaThermometerHalf className="text-3xl" /> },
];

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
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 text-sm font-medium text-[#4a54e1] bg-blue-50 rounded-full mb-4 shadow-sm"
          >
            <FaStethoscope className="inline mr-2" />
            Pharmacy Categories
          </motion.span>
          <motion.h2
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Your <span className="text-[#4a54e1]">Healthcare</span> Solutions
          </motion.h2>
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Trusted medical products for your wellness journey
          </motion.p>
        </div>

        {/* Medicine Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {medicineCategories.map((medicine, ind) => (
            <Link href={`/search?name=${medicine.name}`} key={ind}>
              <motion.div
                variants={item}
                whileHover={{ scale: 1.03 }}
                className="relative bg-white rounded-xl -z-0 overflow-hidden shadow-sm hover:shadow-md border border-gray-100 group h-full flex flex-col transition-all duration-300"
              >
                {/* Background Gradient Layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-80 z-0" />

                {/* Product Content */}
                <div className="relative p-6 h-[200px] flex flex-col justify-center items-center z-10 gap-3">
                  <div className="p-4 bg-white rounded-full shadow-sm border-2 border-[#4a54e1] border-opacity-20">
                    {medicine.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#4a54e1] capitalize text-center leading-tight">
                    {medicine.name}
                  </h3>
                  <div className="absolute bottom-4 w-8 h-1 rounded-full bg-white/50 group-hover:w-16 transition-all duration-300"></div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute z-10 inset-0 bg-gradient-to-t from-[#4a54e1]/70 to-transparent flex items-end justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="text-center transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 pb-6">
                    <span className="text-white font-medium text-sm block mb-1 tracking-wider">
                      SHOP {medicine.name.toUpperCase()}
                    </span>
                    <div className="w-6 h-0.5 bg-white/80 mx-auto mt-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href="/shop"
            className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-[#4a54e1] to-[#4a54e1] text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 shadow-md hover:scale-[1.02] group"
          >
            Explore Full Pharmacy
            <FaArrowRight className="ml-3 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopOverview;
