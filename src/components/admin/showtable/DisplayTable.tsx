"use client";

import { deleteApi, getApi } from "@/components/api/apiCom";
import { useEffect, useState } from "react";
import { MedicineFormData } from "../addmedicine/AddMedicine";
import UpdateMedicineModal from "../addmedicine/UpdateMedicneModal";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

export default function MedicineTable() {
  const [medicines, setMedicine] = useState<MedicineFormData[] | []>([]);

  const dataGets = async () => {
    const res = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/get-medicine`);
    setMedicine(res?.data);
  };

  const handelDelete = async (id: string | undefined) => {
    const result = await deleteApi(
      `${process.env.NEXT_PUBLIC_API_URL}/delete-medicne/${id}`
    );
    setMedicine(medicines.filter((item) => item._id !== id));
    if (result.data.deletedCount > 0) {
      toast.success(result.message);
    }
  };

  useEffect(() => {
    dataGets();
  }, []);
  console.log(medicines);
  return (
    <div className="overflow-x-auto p-4 bg-gray-100 rounded-lg shadow-sm">
      {/* Table for Larger Screens */}
      <div className="hidden md:block">
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
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-800">
                  {medicine.expiry_date}
                </td>
                <td className="px-6 py-4 text-sm text-gray-800 flex justify-between items-center">
                  <div className="flex justify-between items-center gap-[10px]">
                    <UpdateMedicineModal id={medicine._id} />
                    <button
                      onClick={() => handelDelete(medicine?._id)}
                      className="py-[8px] px-[15px] text-white rounded-lg bg-red-400"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for Smaller Screens */}
      <div className="md:hidden space-y-4">
        {medicines?.map((medicine: MedicineFormData, index: number) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="space-y-2">
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Name:</span> {medicine.name}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Price:</span> ${medicine.price}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Stock:</span>{" "}
                {medicine.stock_availability}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Manufacturer:</span>{" "}
                {medicine.manufacturer_details.name}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Expiry Date:</span>{" "}
                {medicine.expiry_date}
              </p>
              <div className="flex justify-between items-center gap-[10px] mt-2">
                <UpdateMedicineModal id={medicine._id} />
                <button
                  onClick={() => handelDelete(medicine?._id)}
                  className="py-[8px] px-[15px] text-white rounded-lg bg-red-400"
                >
                  <MdDelete size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
