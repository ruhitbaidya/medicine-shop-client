"use client";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { getApi } from "@/components/api/apiCom";
import Spinner from "@/components/shaired/spinner";
import { MedicineFormData, TCardFor } from "@/app/types/medicinestype";
import { ContextCreate } from "@/Context/ContextProvide";
import Link from "next/link";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { FaCalendarAlt, FaCartPlus, FaPrescription } from "react-icons/fa";

const SearchContent = () => {
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { card, setCard } = useContext(ContextCreate);
  const [Mdata, setData] = useState<MedicineFormData[] | []>([]);
  const handelSearch = async (search: string) => {
    setLoading(true);
    const res = await getApi(
      `${process.env.NEXT_PUBLIC_API_URL}/search/${search}`
    );
    setData(res.data);
    setLoading(false);
  };
  const handelCard = (data: TCardFor) => {
    const findOne = card.find((item) => item._id === data._id);
    if (!findOne) {
      setCard((prevCard) => [...prevCard, data]);
    }
  };
  useEffect(() => {
    const texts = params.get("name") || undefined;
    if (texts) {
      handelSearch(texts);
    }
  }, [params]);

  return (
    <div>
      <div>
        <div className="py-[60px]">
          <div className="container mx-auto px-[10px]">
            <div>
              <h2 className="text-center text-3xl mb-[20px] font-bold text-black">
                Search Your Medicine
              </h2>
            </div>
            <div className="w-[100%] lg:w-[60%] mx-auto">
              <div className="relative">
                <input
                  onChange={(e) => setSearch(e.target.value)}
                  className="border border-[#4a54e1] w-full p-[20px] focus:outline-none rounded-lg"
                  type="text"
                  placeholder="Search By Category"
                />
                <button
                  onClick={() => handelSearch(search)}
                  className="absolute top-2 right-2 btns"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-[10px] min-h-[60vh] pb-[50px] ">
          <div>
            <div>
              {loading ? (
                <Spinner />
              ) : (
                <>
                  {Mdata.length < 1 ? (
                    <p className="text-center text-2xl">
                      No Result Found In Your Search
                    </p>
                  ) : (
                    ""
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]">
                    {Mdata?.map((medicine) => (
                      <div
                        key={medicine._id}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200"
                      >
                        <Link
                          title="Show Details"
                          href={`/shop/${medicine._id}`}
                          className="block"
                        >
                          {/* Medicine Image */}
                          <div className="h-48 bg-gray-50 relative overflow-hidden">
                            <Image
                              src={medicine.image || "/default-medicine.jpg"}
                              alt={medicine.name}
                              fill
                              className="object-contain p-4"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>

                          {/* Card Content */}
                          <div className="p-4">
                            <h3 className="text-lg font-bold text-gray-800 line-clamp-2">
                              {medicine?.name}
                            </h3>

                            {/* Price */}
                            <div className="mt-2 flex items-center gap-1">
                              <FaBangladeshiTakaSign className="text-[var(--primary-color)]" />
                              <span className="text-lg font-bold text-[var(--primary-color)]">
                                {medicine?.price}
                              </span>
                              {(medicine?.discountPercentage as number) > 0 ? (
                                <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">
                                  {medicine.discountPercentage}% OFF
                                </span>
                              ) : (
                                ""
                              )}
                            </div>

                            {/* Details */}
                            <div className="mt-3 space-y-2 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <FaPrescription
                                  className={
                                    medicine.required_prescription
                                      ? "text-green-500"
                                      : "text-gray-400"
                                  }
                                />
                                <span>
                                  {medicine.required_prescription
                                    ? "Prescription required"
                                    : "No prescription needed"}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FaCalendarAlt className="text-gray-400" />
                                <span>
                                  Exp:{" "}
                                  {new Date(
                                    medicine?.expiry_date as string
                                  ).toLocaleDateString("en-US", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>

                        {/* Add to Cart Button */}
                        <div className="px-4 pb-4">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handelCard({
                                _id: medicine._id,
                                discountPercentage:
                                  medicine.discountPercentage as number,
                                name: medicine.name,
                                price: medicine.price,
                                stock_availability: medicine.stock_availability,
                                required_prescription:
                                  medicine.required_prescription,
                                quantity: 1,
                              });
                            }}
                            className="w-full py-2 bg-[var(--primary-color)] hover:bg-[var(--primary-dark)] text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                          >
                            <FaCartPlus />
                            Add To Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <SearchContent />
    </Suspense>
  );
};

export default SearchPage;
