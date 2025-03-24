"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const MedicineDiscountSection = () => {
  // Countdown timer state (24 hours)
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const seconds = prev.seconds - 1;
        const minutes = seconds < 0 ? prev.minutes - 1 : prev.minutes;
        const hours = minutes < 0 ? prev.hours - 1 : prev.hours;

        return {
          hours: hours < 0 ? 23 : hours,
          minutes: minutes < 0 ? 59 : minutes,
          seconds: seconds < 0 ? 59 : seconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const discountMedicines = [
    {
      id: 1,
      name: "Vitamin D3 2000IU",
      originalPrice: 1200,
      discountPrice: 899,
      discount: "25% OFF",
    },
    {
      id: 2,
      name: "Omega-3 Fish Oil",
      originalPrice: 1500,
      discountPrice: 999,
      discount: "33% OFF",
    },
    {
      id: 3,
      name: "Multivitamin Capsules",
      originalPrice: 800,
      discountPrice: 599,
      discount: "25% OFF",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-[var(--primary-light)] to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Timer */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-4">
            <span className="px-4 py-1 text-sm font-semibold text-white bg-[var(--primary-color)] rounded-full">
              Flash Sale
            </span>
            <div className="ml-4 flex items-center bg-white shadow-sm rounded-full px-4 py-1">
              <span className="text-[var(--primary-color)] font-bold mr-1">
                Ends in:
              </span>
              <span className="bg-[var(--primary-color)] text-white px-2 py-1 rounded mx-1 min-w-[24px] text-center">
                {timeLeft.hours.toString().padStart(2, "0")}
              </span>
              <span className="text-[var(--primary-color)]">:</span>
              <span className="bg-[var(--primary-color)] text-white px-2 py-1 rounded mx-1 min-w-[24px] text-center">
                {timeLeft.minutes.toString().padStart(2, "0")}
              </span>
              <span className="text-[var(--primary-color)]">:</span>
              <span className="bg-[var(--primary-color)] text-white px-2 py-1 rounded mx-1 min-w-[24px] text-center">
                {timeLeft.seconds.toString().padStart(2, "0")}
              </span>
            </div>
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
          {discountMedicines.map((medicine) => (
            <motion.div
              key={medicine.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 relative"
            >
              {/* Discount Ribbon */}
              <div className="absolute top-0 left-0 bg-[var(--primary-color)] text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                {medicine.discount}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[var(--text-color)] mb-3">
                  {medicine.name}
                </h3>

                {/* Price Display */}
                <div className="flex items-end gap-3 my-4">
                  <p className="text-2xl font-bold text-[var(--primary-color)]">
                    ${medicine.discountPrice}
                  </p>
                  <p className="text-md text-gray-500 line-through">
                    ${medicine.originalPrice}
                  </p>
                </div>

                {/* Timer for this product */}
                <div className="flex items-center text-sm text-[var(--secondary-color)] mb-4">
                  <svg
                    className="w-4 h-4 mr-1 text-[var(--primary-color)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>
                    Offer ends in {timeLeft.hours}h {timeLeft.minutes}m
                  </span>
                </div>

                {/* Add to Cart Button */}
                <Link
                  href={`/shop/${medicine.id}`}
                  className="block w-full py-2.5 px-4 bg-[var(--primary-color)] hover:bg-[var(--hover-color)] text-white text-center font-medium rounded-lg transition-colors"
                >
                  Get This Deal
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/shop/discounts"
            className="inline-flex items-center px-6 py-2.5 border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white font-medium rounded-lg transition-all"
          >
            View All Special Offers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MedicineDiscountSection;
