/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ContextCreate } from "@/Context/ContextProvide";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { toast } from "sonner";
const CheckoutPage = () => {
  const { card, count, setShippingInfo } = useContext(ContextCreate);
  const router = useRouter();
  const [pCheck, setPCheck] = useState(false);
  console.log(card);
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  useEffect(() => {
    card.forEach((item) => {
      if (item.required_prescription) {
        setPCheck(true);
        return;
      }
    });
  }, [card]);
  const [prescription, setPrescription] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePrescriptionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    const image = URL.createObjectURL(file as File);
    setPrescription(image);
  };

  const handleSubmit = () => {
    if (pCheck) {
      if (!prescription) {
        toast.error("Plrase Select Prescription");
        return;
      }
    }
    if (card.length < 1) {
      toast.error("You Select Any Medicine");
      return;
    }
    if (
      shippingDetails.address === "" ||
      shippingDetails.city === "" ||
      shippingDetails.name === "" ||
      shippingDetails.phone === ""
    ) {
      toast.error("Give Your Adders name Phone Number");
      return;
    }
    setShippingInfo(shippingDetails);
    router.push("/payment");
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-6">
        Checkout
      </h1>

      <div
        className={`grid grid-cols-1 lg:grid-cols-${
          pCheck ? "2" : "1"
        } gap-[25px]`}
      >
        {/* Shipping Details */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-[var(--primary-color)] mb-4">
            Shipping Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              value={shippingDetails.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
            <input
              type="text"
              name="address"
              value={shippingDetails.address}
              onChange={handleInputChange}
              placeholder="Address"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
            <input
              type="text"
              name="city"
              value={shippingDetails.city}
              onChange={handleInputChange}
              placeholder="City"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
            <input
              type="text"
              name="postalCode"
              value={shippingDetails.postalCode}
              onChange={handleInputChange}
              placeholder="Postal Code"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
            <input
              type="text"
              name="phone"
              value={shippingDetails.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
          </div>
        </div>

        {/* Prescription Upload (if required) */}
        <div
          className={`bg-white ${
            pCheck ? "" : "hidden"
          } shadow-lg rounded-lg p-6 mb-6`}
        >
          {prescription ? (
            <>
              <div className="flex justify-center items-center">
                <Image src={prescription} alt="" height={200} width={200} />
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-[var(--primary-color)] mb-4">
                Prescription
              </h2>
              <p className="text-gray-600 mb-4">
                Upload your prescription (if required)
              </p>
              <input
                type="file"
                onChange={handlePrescriptionUpload}
                className="border border-gray-300 p-3 rounded-lg w-full"
              />
            </>
          )}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-[var(--primary-color)] mb-4">
          Order Summary
        </h2>
        <div className="flex justify-between mb-4">
          <span className="text-lg text-gray-600">Subtotal</span>
          <span className="text-lg text-[var(--primary-color)] flex items-center gap-[5px]">
            <FaBangladeshiTakaSign />
            {count}
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-lg text-gray-600">Shipping</span>
          <span className="text-lg text-[var(--primary-color)] flex items-center gap-[5px]">
            <FaBangladeshiTakaSign />
            150
          </span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-lg text-gray-600">Total</span>
          <span className="text-lg font-semibold text-[var(--primary-color)] flex items-center gap-[5px]">
            <FaBangladeshiTakaSign />
            {Number(count) + 150}
          </span>
        </div>
      </div>

      {/* Confirm Order Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className={`bg-[var(--primary-color)] cursor-pointer text-white py-3 px-8 rounded-lg text-xl shadow-lg hover:bg-[#4a54e1] transition`}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
