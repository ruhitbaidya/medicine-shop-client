/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { getApi, patchApi } from "../api/apiCom";
import { TCard } from "@/app/types/medicinestype";
import { toast } from "sonner";

const Discount = () => {
  const [loading, setLoading] = useState(false);
  const [disId, setDisId] = useState<string[] | []>([]);
  const [tempId, setTempId] = useState<string[] | []>([]);
  const [removeids, setRemoveIds] = useState<string[] | []>([]);
  const [disPar, setDisPar] = useState<string | null>("");
  const [allProduct, setAllProduct] = useState<TCard[] | []>([]);
  const getAllData = async () => {
    const res = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/get-medicine`);
    console.log(res);
    setAllProduct(res.data);
    if (res.data) {
      const fids: string[] = [];
      res.data.map((item: any) => {
        if (item.discount === true) {
          return fids.push(item._id);
        }
      });
      setTempId(fids);
    }
  };
  console.log(allProduct);
  const handelIdDis = (id: string) => {
    const finial = tempId.find((item) => item === id);
    if (finial) {
      setRemoveIds([...removeids, id]);
      const removeId = tempId.filter((item) => item !== id);
      setTempId(removeId);
      return;
    }
    setDisId([...disId, id]);
  };

  const removerIds = async () => {
    if (removeids.length > 0) {
      const res = await patchApi(
        `${process.env.NEXT_PUBLIC_API_URL}/discount-medicine-remove`,
        { medicineId: removeids }
      );
      console.log(res);
      if (res.data.modifiedCount > 0) {
        setRemoveIds([]);
        toast.success(res.message);
        setLoading(false);
      }
    } else {
      toast.error("id Not Select");
    }
  };
  const handeDiscount = async () => {
    await removerIds();
    if (disId.length > 0 && disPar) {
      setLoading(true);
      const data = { medicineId: disId, discount: disPar };
      const res = await patchApi(
        `${process.env.NEXT_PUBLIC_API_URL}/discount-medicine-set`,
        data
      );
      if (res.data.modifiedCount > 0) {
        setDisPar("0");
        toast.success(res.message);
        setLoading(false);
      }
      console.log(res);
    } else {
      toast.error("select Id and parsent");
    }
  };
  console.log("add", disId);
  console.log("remove", removeids);
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
          <div className="flex justify-between items-center gap-[10px]">
            <div>
              <label className="font-bold" htmlFor="dis">
                Discount % Number
              </label>
              <input
                defaultValue={disPar as string}
                onChange={(e) => setDisPar(e.target.value)}
                className="w-full border focus:outline-none p-[10px] rounded-lg"
                type="number"
                placeholder="Discount % Number"
              />
            </div>
            <div>
              <button
                onClick={handeDiscount}
                className="py-[10px] px-[20px] bg-indigo-600 text-white rounded-lg mt-[25px]"
              >
                {loading ? (
                  <p className="text-white">Loading.....</p>
                ) : (
                  "Set Discount"
                )}
              </button>
            </div>
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
                      defaultChecked={item.discount}
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
