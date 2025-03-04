"use client";

import { getApi } from "@/components/api/apiCom";
import { useEffect, useState } from "react";
import { MedicineFormData } from "../addmedicine/AddMedicine";

export default function MedicineTable() {
  const [medicines, setMedicine] = useState<MedicineFormData[] | []>([]);
  const dataGets = async () => {
    const res = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/get-medicine`);
    setMedicine(res?.data);
  };

  useEffect(() => {
    dataGets();
  }, []);
  return (
    <div className="overflow-x-auto p-4 bg-gray-100 rounded-lg shadow-sm">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-[#5f63f2] text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Price
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Manufacturer
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Expiry Date
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {medicines?.map((medicine: MedicineFormData, index: number) => (
            <tr
              key={index}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="px-6 py-4 text-sm text-gray-800">
                {medicine.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                ${medicine.price}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {medicine.stock_availability}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                <div>
                  <p className="font-medium">
                    {medicine.manufacturer_details.name}
                  </p>
                  <p className="text-gray-600">
                    {medicine.manufacturer_details.address}
                  </p>
                  <p className="text-gray-600">
                    {medicine.manufacturer_details.contact}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {medicine.expiry_date}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                <button className="btns w-full mb-[10px]">Update</button>
                <button className="py-[12px] rounded-lg bg-red-400 w-full mb-[10px]">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
