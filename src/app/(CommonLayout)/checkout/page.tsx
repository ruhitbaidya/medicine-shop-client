"use client";
import { useState } from "react";

const CheckoutPage: React.FC = () => {
  const [shippingDetails, setShippingDetails] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  const [prescription, setPrescription] = useState<File | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePrescriptionUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setPrescription(file);
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = () => {
    // Handle order submission logic
    console.log("Order confirmed!");
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-6">
        Checkout
      </h1>

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
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
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
      </div>

      {/* Payment Method Selection */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-[var(--primary-color)] mb-4">
          Payment Method
        </h2>
        <div className="flex gap-6">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment-method"
              value="credit-card"
              checked={paymentMethod === "credit-card"}
              onChange={handlePaymentChange}
              className="form-radio h-5 w-5 text-[var(--primary-color)]"
            />
            <span className="text-lg text-gray-700">Credit Card</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment-method"
              value="paypal"
              checked={paymentMethod === "paypal"}
              onChange={handlePaymentChange}
              className="form-radio h-5 w-5 text-[var(--primary-color)]"
            />
            <span className="text-lg text-gray-700">PayPal</span>
          </label>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-[var(--primary-color)] mb-4">
          Order Summary
        </h2>
        <div className="flex justify-between mb-4">
          <span className="text-lg text-gray-600">Subtotal</span>
          <span className="text-lg text-[var(--primary-color)]">$99.99</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-lg text-gray-600">Shipping</span>
          <span className="text-lg text-[var(--primary-color)]">$5.00</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-lg text-gray-600">Total</span>
          <span className="text-lg font-semibold text-[var(--primary-color)]">
            $104.99
          </span>
        </div>
      </div>

      {/* Confirm Order Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-[var(--primary-color)] text-white py-3 px-8 rounded-lg text-xl shadow-lg hover:bg-[#4a54e1] transition"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
