"use client";
import { MedicineFormData } from "@/app/types/medicinestype";
import { getApi } from "@/components/api/apiCom";
import Spinner, { Spinner2 } from "@/components/shaired/spinner";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
const ShopOverview = () => {
  const [loading, setLoading] = useState(false);
  const [medicine, setMedicine] = useState<MedicineFormData[] | []>([]);
  const getMedicine = async () => {
    const res = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/get-medicine`);
    setMedicine(res?.data);
    if (res.data) {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    getMedicine();
  }, []);
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

        <div className="p-[20px]">
          {loading && (
            <div className="">
              <Spinner2 />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {medicine ? (
            medicine?.splice(0, 6)?.map((medicine) => (
              <div
                key={medicine._id}
                className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
              >
                <h3 className="text-xl font-semibold text-[var(--text-color)] mt-4">
                  {medicine?.name}
                </h3>
                <p className="text-[var(--primary-color)] font-bold mt-2 flex items-center gap-[5px]">
                  <FaBangladeshiTakaSign />
                  {medicine?.price}
                </p>
                <Link
                  href={`/shop/${medicine?._id}`}
                  className="block mt-4 text-center bg-[var(--primary-color)] text-white py-2 rounded-md hover:bg-[var(--hover-color)] hover:text-white transition"
                >
                  View Details
                </Link>
              </div>
            ))
          ) : (
            <>
              <div>
                <Spinner />
              </div>
            </>
          )}
        </div>

        {/* View More Button */}
        <div className="text-center mt-10">
          <Link
            href="/shop"
            className="px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg text-lg font-semibold hover:bg-[var(--hover-color)] transition"
          >
            Browse All Medicine
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ShopOverview;
