"use client";
import { useEffect, useState } from "react";
import { getApi } from "../api/apiCom";
import { TCard } from "@/app/types/medicinestype";

const Discount = () => {
  const [disId, setDisId] = useState<string[] | []>([]);
  const [allProduct, setAllProduct] = useState<TCard[] | []>([]);
  const getAllData = async () => {
    const res = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/get-medicine`);
    setAllProduct(res.data);
  };
  console.log(allProduct);
  const handelIdDis = (id: string) => {
    const finial = disId.find((item) => item === id);
    if (finial) {
      const removeId = disId.filter((item) => item !== id);
      setDisId(removeId);
      return;
    }
    setDisId([...disId, id]);
  };
  console.log(disId);
  useEffect(() => {
    getAllData();
  }, []);
  return (
    <div>
      <div>
        <div className="flex justify-between items-center my-[30px]">
          <div>
            <h2 className="text-2xl font-bold">Set Discount Price</h2>
            <h3 className="font-bold">
              Select Product{" "}
              <span className="text-indigo-800">{disId.length}</span>
            </h3>
          </div>
          <div>
            <label className="font-bold" htmlFor="dis">
              Discount % Number
            </label>
            <input
              className="w-full border focus:outline-none p-[10px] rounded-lg"
              type="number"
              placeholder="Discount % Number"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Checked
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {allProduct?.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      onChange={() => handelIdDis(item?._id as string)}
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {item?.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${item?.price}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Discount;
