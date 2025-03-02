"use client";
import Image from "next/image";
import Link from "next/link";

const featuredMedicines = [
  {
    id: 1,
    name: "Pain Relief Capsules",
    price: "$12.99",
    image:
      "https://png.pngtree.com/png-clipart/20241216/original/pngtree-medicine-and-drug-health-tablet-isolated-on-transparent-background-png-image_17920907.png",
  },
  {
    id: 2,
    name: "Vitamin Supplements",
    price: "$9.99",
    image:
      "https://png.pngtree.com/png-clipart/20240319/original/pngtree-3d-illustration-pills-and-medicine-bottles-suitable-for-medical-png-image_14626674.png",
  },
  {
    id: 3,
    name: "Cough Syrup",
    price: "$7.99",
    image:
      "https://png.pngtree.com/png-clipart/20240321/original/pngtree-3d-illustration-of-medicine-guide-capsule-png-image_14640448.png",
  },
  {
    id: 4,
    name: "Antibiotic Tablets",
    price: "$14.50",
    image:
      "https://png.pngtree.com/png-clipart/20231016/original/pngtree-medical-pill-capsule-cutout-png-file-png-image_13320362.png",
  },
];

const ShopOverview = () => {
  return (
    <section className="py-12 bg-[var(--background-color)]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[var(--primary-color)]">
            Featured Medicines
          </h2>
          <p className="text-[var(--secondary-color)] mt-2">
            High-quality medicines, delivered to your doorstep.
          </p>
        </div>

        {/* Featured Medicines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {featuredMedicines.map((medicine) => (
            <div
              key={medicine.id}
              className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
            >
              <div className="flex justify-center">
                <Image
                  src={medicine.image}
                  width={150}
                  height={150}
                  alt={medicine.name}
                  className="rounded-md"
                />
              </div>
              <h3 className="text-xl font-semibold text-[var(--text-color)] mt-4">
                {medicine.name}
              </h3>
              <p className="text-[var(--primary-color)] font-bold mt-2">
                {medicine.price}
              </p>
              <Link
                href={`/shop/${medicine.id}`}
                className="block mt-4 text-center bg-[var(--primary-color)] text-white py-2 rounded-md hover:bg-[var(--hover-color)] hover:text-white transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg text-lg font-semibold hover:bg-[var(--hover-color)] transition"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopOverview;
