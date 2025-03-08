/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getApi } from "@/components/api/apiCom";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type users = {
  _id: string;
  name: string;
  email: string;
  phone: string;
};

const CustomerOrders = () => {
  const [customers, setCustomers] = useState<users[] | null>([]);
  const [orders, setOrders] = useState<any | null>([]);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all users
  const fetchAllUsers = async () => {
    try {
      const res = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/getallUser`);
      if (res.data) {
        setCustomers(res.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users.");
    }
  };

  // Fetch order details for a specific user
  const openOrderModal = async (userId: string) => {
    try {
      const res = await getApi(
        `${process.env.NEXT_PUBLIC_API_URL}/getIdOrder/${userId}`
      );
      if (res.data.length > 0) {
        setSelectedOrder(userId);
        setOrders(res.data);
        setIsModalOpen(true);
      } else {
        toast.error("No orders found for this user.");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="p-4 md:p-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Customer Orders
      </h1>

      {/* Table for Larger Screens */}
      <div className="hidden md:block">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#5f63f2] text-white">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-center">Order</th>
            </tr>
          </thead>
          <tbody>
            {customers?.map((customer) => (
              <tr key={customer._id} className="border-b hover:bg-gray-100">
                <td className="py-4 px-6">{customer.name || "N/A"}</td>
                <td className="py-4 px-6">{customer.email || "N/A"}</td>
                <td className="py-4 px-6">{customer.phone || "N/A"}</td>
                <td className="py-4 px-6 text-center">
                  <button
                    onClick={() => openOrderModal(customer._id)}
                    className="bg-[#5f63f2] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                  >
                    View Orders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for Smaller Screens */}
      <div className="md:hidden space-y-4">
        {customers?.map((customer) => (
          <div
            key={customer._id}
            className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-200"
          >
            <div className="space-y-2">
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Name:</span>{" "}
                {customer.name || "N/A"}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Email:</span>{" "}
                {customer.email || "N/A"}
              </p>
              <p className="text-sm text-gray-800">
                <span className="font-semibold">Phone:</span>{" "}
                {customer.phone || "N/A"}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => openOrderModal(customer._id)}
                  className="bg-[#5f63f2] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  View Orders
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Orders */}
      {isModalOpen && selectedOrder && (
        <div className="fixed z-20 inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-4 md:p-6 w-full max-w-md rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Orders for User ID: {selectedOrder}
            </h2>

            {orders.length > 0 ? (
              <div className="max-h-[60vh] overflow-y-auto">
                <h3 className="text-gray-800 font-semibold mb-2">
                  Order Id And Date:
                </h3>
                <ul className="space-y-2">
                  {orders.map((order: any) => (
                    <li key={order._id} className="text-gray-700">
                      <div className="p-3 border rounded-lg">
                        <strong>Order Date:</strong>{" "}
                        {new Date(order.createdAt).toDateString()}
                        <br />
                        <strong>Order ID:</strong> {order.orderId}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-700">No orders found.</p>
            )}

            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
