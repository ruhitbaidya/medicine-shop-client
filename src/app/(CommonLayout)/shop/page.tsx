/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MedicineFormData, TCardFor } from "@/app/types/medicinestype";
import { getApi } from "@/components/api/apiCom";
import { ContextCreate } from "@/Context/ContextProvide";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
const Shop = () => {
  const { card, setCard } = useContext(ContextCreate);
  const [loading, setLoading] = useState(false);
  const [Mdata, setMData] = useState<MedicineFormData[] | []>([]);
  const getAllMedi = async () => {
    setLoading(true);
    const res = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/get-medicine`);
    setMData(res.data);
    if (res.data) {
      setLoading(false);
    }
  };
  const handelCard = (data: TCardFor) => {
    const findOne = card.find((item) => item._id === data._id);
    if (!findOne) {
      setCard((prevCard) => [...prevCard, data]);
    }
  };
  useEffect(() => {
    getAllMedi();
  }, []);
  return (
    <>
      <div className="mt-[30px]">
        <div className="container mx-auto px-[10px]">
          <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-[25px]">
            <div
              className={`col-span-1 lg:block  bg-gray-50  p-[20px] border rounded-lg border-[#4a54e1]`}
            >
              <h4 className="text-center">Filter</h4>
              <p>Sorting</p>
              <div>
                <select
                  className="border border-[#4a54e1] w-full rounded-lg p-[8px]"
                  name=""
                  id=""
                >
                  <option value="">Low To Hight</option>
                  <option value="">Heigh To Low</option>
                </select>
              </div>
              <p>Category</p>
              <div>
                <select
                  className="border border-[#4a54e1] w-full rounded-lg p-[8px]"
                  name=""
                  id=""
                >
                  <option value="">HasuGrou</option>
                  <option value="">HasuGrou</option>
                  <option value="">HasuGrou</option>
                  <option value="">HasuGrou</option>
                  <option value="">HasuGrou</option>
                  <option value="">HasuGrou</option>
                  <option value="">HasuGrou</option>
                  <option value="">Heigh To Low</option>
                </select>
              </div>
              <p>Price</p>
              <div>
                <p>Low To Hight</p>
                <input type="range" className="w-full" />
              </div>
              <div>
                <p>heigh To Low</p>
                <input type="range" className="w-full" />
              </div>
              <div>
                <p>Prescription</p>
                <div className="">
                  <input type="checkbox" id="presc" className="mr-[10px]" />
                  <label htmlFor="presc">Checked Prescripption</label>
                </div>
              </div>
            </div>
            <div className="col-span-3 bg-gray-50  p-[20px] border rounded-lg border-[#4a54e1]">
              {loading && (
                <div>
                  <p className="text-center">Loading......</p>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[25px]">
                {Mdata.map((medicine) => (
                  <div
                    key={medicine._id}
                    className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-2"
                  >
                    <Link title="Show Details" href={`/shop/${medicine._id}`}>
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
                          required_prescription: medicine.required_prescription,
                          quantity: 1,
                        })
                      }
                    >
                      Add To Card
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
