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
    <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Customer Orders
      </h1>

      {/* Customer Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#5f63f2] text-white">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-center">Action</th>
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

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 w-full max-w-md rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Order Details (User ID: {selectedOrder})
            </h2>

            {orders.length > 0 ? (
              <div>
                <h3 className="text-gray-800 font-semibold mb-2">Medicines:</h3>
                <ul className="list-disc pl-5 mb-4">
                  {orders.map((order: any) => (
                    <li key={order._id} className="text-gray-700">
                      <strong>Order ID:</strong> {order.orderId}
                      <br />
                      <strong>Medicines:</strong>
                      <ul className="list-disc pl-5">
                        {order.medicine.map((med: any) => (
                          <li key={med._id}>
                            {med.id.name} (Qty: {med.quantity})
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="text-gray-700">No orders found.</p>
            )}

            <div className="flex justify-end">
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
