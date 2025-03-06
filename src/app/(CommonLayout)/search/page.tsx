"use client";
import React, { useContext, useState } from "react";
import { getApi } from "@/components/api/apiCom";
import Spinner from "@/components/shaired/spinner";
import { MedicineFormData, TCardFor } from "@/app/types/medicinestype";
import { ContextCreate } from "@/Context/ContextProvide";
import Link from "next/link";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const SearchPage = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { card, setCard } = useContext(ContextCreate);
  const [Mdata, setData] = useState<MedicineFormData[] | []>([]);
  const handelSearch = async () => {
    setLoading(true);
    const res = await getApi(
      `${process.env.NEXT_PUBLIC_API_URL}/search/${search}`
    );

    setData(res.data);
    setLoading(false);

    console.log(res.data);
  };
  const handelCard = (data: TCardFor) => {
    const findOne = card.find((item) => item._id === data._id);
    if (!findOne) {
      setCard((prevCard) => [...prevCard, data]);
    }
  };
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
                  onClick={handelSearch}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]">
                    {Mdata?.map((medicine) => (
                      <div
                        key={medicine._id}
                        className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
                      >
                        <Link
                          title="Show Details"
                          href={`/shop/${medicine._id}`}
                        >
                          <div>
                            <h3 className="text-xl font-semibold text-[var(--text-color)] mt-4">
                              {medicine?.name}
                            </h3>
                            <p className="text-[var(--primary-color)] font-bold mt-2 flex items-center gap-[5px]">
                              <FaBangladeshiTakaSign />
                              {medicine?.price}
                            </p>
                            <p>
                              Prescription :{" "}
                              {medicine.required_prescription ? "✅" : "❌"}
                            </p>
                            <p>
                              ExP Date :{" "}
                              {new Date(
                                medicine?.expiry_date as string
                              ).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </Link>
                        <button
                          className="btns"
                          onClick={() =>
                            handelCard({
                              _id: medicine._id,
                              name: medicine.name,
                              price: medicine.price,
                              stock_availability: medicine.stock_availability,
                              required_prescription:
                                medicine.required_prescription,
                              quantity: 1,
                            })
                          }
                        >
                          Add To Card
                        </button>
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

export default SearchPage;
