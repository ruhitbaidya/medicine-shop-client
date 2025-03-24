"use client";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

interface Medicine {
  id: number;
  name: string;
  price: number;
  description: string;
  rating: number;
  category: string;
}

const MedicineDisplaySection = () => {
  // Demo medicine data
  const medicines: Medicine[] = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      price: 5.99,
      description: "Effective pain reliever and fever reducer",
      rating: 4.2,
      category: "Pain Relief",
    },
    {
      id: 2,
      name: "Pnaonix",
      price: 12.5,
      description: "Supports bone and immune system health",
      rating: 4.7,
      category: "Vitamins",
    },
    {
      id: 3,
      name: "Vitamin D3 2000IU",
      price: 12.5,
      description: "Supports bone and immune system health",
      rating: 4.7,
      category: "Vitamins",
    },
    {
      id: 4,
      name: "Calcium",
      price: 12.5,
      description: "Supports bone and immune system health",
      rating: 4.7,
      category: "Vitamins",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-[var(--background-light)] to-[var(--background-color)]">
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

        {/* Medicine Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {medicines.map((medicine) => (
            <motion.div
              key={medicine.id}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              {/* Medicine Header */}
              <div className="p-6 pb-0">
                <span className="inline-block px-3 py-1 bg-[var(--primary-light)] text-[var(--primary-color)] text-xs font-semibold rounded-full">
                  {medicine.category}
                </span>
              </div>

              {/* Medicine Content */}
              <div className="p-6 pt-4">
                <h3 className="text-xl font-bold text-[var(--text-color)] mb-2">
                  {medicine.name}
                </h3>
                <p className="text-[var(--secondary-color)] mb-4">
                  {medicine.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  {/* Rating */}
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${
                          i < Math.floor(medicine.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-[var(--secondary-color)] ml-1">
                      ({medicine.rating.toFixed(1)})
                    </span>
                  </div>

                  {/* Price */}
                  <span className="text-xl font-bold text-[var(--primary-color)]">
                    ${medicine.price.toFixed(2)}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full py-3 bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg">
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-white text-[var(--primary-color)] font-semibold rounded-lg border-2 border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-all shadow-sm hover:shadow-md">
            View All Medicines
          </button>
        </div>
      </div>
    </section>
  );
};

export default MedicineDisplaySection;
