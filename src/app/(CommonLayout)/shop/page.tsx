/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MedicineFormData, TCardFor } from "@/app/types/medicinestype";
import { getApi, postApi } from "@/components/api/apiCom";
import Spinner from "@/components/shaired/spinner";
import { ContextCreate } from "@/Context/ContextProvide";

import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const Shop = () => {
  const [slideLow, setSlideLow] = useState<number | null>(0);
  const [slideHigh, setSlideHigh] = useState<number | null>(0);
  const { card, setCard } = useContext(ContextCreate);
  const [loading, setLoading] = useState(true);
  const [Mdata, setMData] = useState<MedicineFormData[] | []>([]);
  const getAllMedi = async () => {
    setLoading(true);
    const res = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/get-medicine`);
    console.log(res);
    if (res.data) {
      setMData(res.data);
      setLoading(false);
    }
  };
  const handelCard = (data: TCardFor) => {
    const findOne = card.find((item) => item._id === data._id);
    if (!findOne) {
      setCard((prevCard) => [...prevCard, data]);
    }
  };
  const handelChange = async (val: any) => {
    setLoading(true);
    const res = await postApi(`${process.env.NEXT_PUBLIC_API_URL}/filter`, val);
    if (res?.data) {
      setMData(res.data);
      setLoading(false);
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
              <h4 className="text-center text-4xl">Filter</h4>
              <h5>Sorting</h5>
              <div className="mb-[20px]">
                <select
                  className="border border-[#4a54e1] w-full rounded-lg p-[8px]"
                  name=""
                  id=""
                  onChange={(e) => handelChange({ sort: e.target.value })}
                >
                  <option value="lth">Low To Hight</option>
                  <option value="htl">Heigh To Low</option>
                </select>
              </div>
              <h5>Category</h5>
              <div className="mb-[20px]">
                <select
                  className="border border-[#4a54e1] w-full rounded-lg p-[8px]"
                  name=""
                  id=""
                  onChange={(e) => handelChange({ category: e.target.value })}
                >
                  <option value="CardioCare">CardioCare</option>
                  <option value="ThyroCare">ThyroCare</option>
                  <option value="NeuroCare">NeuroCare</option>
                  <option value="MentalHealth Inc.">MentalHealth Inc.</option>
                  <option value="GastroHealth Inc.">GastroHealth Inc.</option>
                </select>
              </div>
              <h5>Price</h5>
              <div className="mb-[20px]">
                <h5>Heigh Range</h5>
                <span>{slideHigh}</span>
                <input
                  min="0"
                  max="200"
                  step="5"
                  onChange={(e) => setSlideHigh(parseInt(e.target.value))}
                  type="range"
                  className="w-full bg-[#5f63f2]"
                />
              </div>
              <div className="mb-[20px]">
                <h5>Low Range</h5>
                <span>{slideLow}</span>
                <input
                  min="0"
                  max="200"
                  step="5"
                  onChange={(e) => setSlideLow(parseInt(e.target.value))}
                  type="range"
                  className="w-full bg-[#5f63f2]"
                />
              </div>
              <div>
                <button
                  onClick={() => handelChange({ h: slideHigh, l: slideLow })}
                  className="btns w-full"
                >
                  Find
                </button>
              </div>
              <div className="my-[20px]">
                <h5>Prescription</h5>
                <div className="">
                  <input
                    onChange={(e) => handelChange({ pcheck: e.target.checked })}
                    type="checkbox"
                    id="presc"
                    className="mr-[10px]"
                  />
                  <label htmlFor="presc">Checked Prescripption</label>
                </div>
              </div>
            </div>
            <div className="col-span-3 bg-gray-50  p-[20px] border rounded-lg border-[#4a54e1]">
              {loading && (
                <div>
                  <h5 className="text-center">
                    <Spinner />
                  </h5>
                </div>
              )}
              <div>
                {Mdata.length < 1 ? (
                  <p className="text-center text-3xl">
                    Your Filter Medicine Not Found
                  </p>
                ) : (
                  ""
                )}
              </div>
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
                          discountPercentage:
                            medicine.discountPercentage as number,
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
