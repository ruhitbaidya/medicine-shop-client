"use client";
import { getApi, patchApi } from "@/components/api/apiCom";
import Spinner from "@/components/shaired/spinner";
import React, { useEffect, useState } from "react";
import { FaPills, FaFilePrescription, FaCheck, FaTimes } from "react-icons/fa";
import Image from "next/image";

type MedicineType = {
  id: {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock_availability: number;
    required_prescription: boolean;
    manufacturer_details: {
      name: string;
      address: string;
      contact: string;
      _id: string;
    };
    expiry_date: string;
    created_at: string;
    updated_at: string;
  };
  quantity: string;
  _id: string;
};

type OrderType = {
  _id: number;
  orderId: string;
  prescription: string | null;
  status: string;
  medicine: MedicineType[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    phone: string;
    _id: string;
  };
  user: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const PrescriptionOrders = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [selectedPrescription, setSelectedPrescription] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageLoading, setImageLoading] = useState<boolean>(false); // State for image loading

  const getAllOrder = async () => {
    try {
      const res = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/getOrder`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id: number, status: string) => {
    try {
      const res = await patchApi(
        `${process.env.NEXT_PUBLIC_API_URL}/updatestatus`,
        { id, status }
      );
      console.log(res);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status } : order
        )
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  const openPrescriptionModal = (prescription: string) => {
    setSelectedPrescription(prescription);
    setImageLoading(true); // Start loading when opening the modal
  };

  const closePrescriptionModal = () => {
    setSelectedPrescription(null);
    setImageLoading(false); // Reset loading state
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen w-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Prescription Orders
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order: OrderType) => (
            <div
              key={order._id}
              className="bg-gradient-to-br from-white to-purple-50 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 border border-purple-100 relative"
            >
              {/* Status Badge */}
              <span
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-800 animate-pulse"
                    : order.status === "approved"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {order.status}
              </span>

              {/* Order ID */}
              <div className="mb-4">
                <span className="text-lg font-semibold text-gray-800">
                  Order ID: {order.orderId}
                </span>
              </div>

              {/* Medicines Section */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                  <FaPills className="mr-2 text-purple-500" />
                  Medicines:
                </h3>
                <div className="max-h-20 overflow-y-auto">
                  {order.medicine.map((medicine: MedicineType) => (
                    <div
                      key={medicine._id}
                      className="flex items-center space-x-2 text-sm text-gray-700"
                    >
                      <span>•</span>
                      <span>
                        {medicine.id.name} (Qty: {medicine.quantity})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prescription Section */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
                  <FaFilePrescription className="mr-2 text-blue-500" />
                  Prescription:
                </h3>
                {order.prescription === null ? (
                  <span className="text-sm text-gray-500">
                    No Prescription Needed
                  </span>
                ) : (
                  <button
                    onClick={() =>
                      openPrescriptionModal(order.prescription as string)
                    }
                    className="text-blue-500 hover:text-blue-700 underline text-sm"
                  >
                    View Prescription
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => updateOrderStatus(order._id, "approved")}
                  className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors text-sm flex items-center justify-center"
                >
                  <FaCheck className="mr-2" />
                  Approve
                </button>
                <button
                  onClick={() => updateOrderStatus(order._id, "rejected")}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm flex items-center justify-center"
                >
                  <FaTimes className="mr-2" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Prescription Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <FaFilePrescription className="mr-2 text-blue-500" />
              Prescription
            </h2>
            {/* Image Loader */}
            {imageLoading && (
              <div className="flex justify-center items-center h-64">
                <Spinner />
              </div>
            )}
            {/* Full-Screen Image */}
            <div className="relative w-full h-[70vh] rounded-lg overflow-hidden">
              <Image
                src={selectedPrescription}
                alt="Prescription"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                onLoad={() => setImageLoading(false)} // Stop loading when image is loaded
                onError={(e) => {
                  e.currentTarget.src = "/fallback-prescription.jpg"; // Fallback image
                  setImageLoading(false); // Stop loading on error
                }}
              />
            </div>
            <button
              onClick={closePrescriptionModal}
              className="mt-4 bg-[#5f63f2] text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors w-full flex items-center justify-center"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionOrders;
