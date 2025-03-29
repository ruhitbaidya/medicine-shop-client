/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getApi } from "@/components/api/apiCom";
import { ContextCreate } from "@/Context/ContextProvide";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import Spinner from "@/components/shaired/spinner";

interface Order {
  createdAt: string;
  orderId: string;
  prescription: string | null;
  status: string;
  updatedAt: string;
  user: string;
  __v: number;
  _id: string;
  medicine: any;
}

const OrderPagesUser = () => {
  const { user } = useContext(ContextCreate);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Memoize getData using useCallback
  const getData = useCallback(async () => {
    if (user?._id) {
      try {
        const res = await getApi(
          `${process.env.NEXT_PUBLIC_API_URL}/getuserorder/${user?._id}`
        );
        if (res.data.length > 0) {
          setOrders(res.data);
        } else {
          toast.error("You have no orders.");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    }
  }, [user?._id]); // Add user._id as a dependency

  useEffect(() => {
    getData();
  }, [getData]); // Add getData to the dependency array

  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Your Order
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : orders && orders.length > 0 ? (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-[#5f63f2] text-white">
              <tr>
                <th className="px-6 py-4 text-left">Order ID</th>
                <th className="px-6 py-4 text-left">Date</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Medicine</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item: Order) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {item.orderId}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : item.status === "shipped"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 h-[50px]">
                    <ul className="overflow-y-auto max-h-[50px]">
                      {item.medicine.map((m: any) => (
                        <li key={m.id._id}>
                          <span className="text-[#5f63f2]">{m?.id?.name}</span>
                          <span className="ml-[10px]">{m?.quantity} pcs</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-600">No orders found.</div>
      )}
    </div>
  );
};

export default OrderPagesUser;
