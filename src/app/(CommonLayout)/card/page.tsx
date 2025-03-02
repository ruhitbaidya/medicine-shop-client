"use client";
import { useState } from "react";
import Image from "next/image";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: "1",
      name: "Paracetamol",
      price: 10.99,
      quantity: 2,
      image: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      name: "Ibuprofen",
      price: 15.49,
      quantity: 1,
      image: "https://via.placeholder.com/150",
    },
  ]);

  const handleQuantityChange = (id: string, value: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + value } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleProceedToCheckout = () => {
    // Here, you can implement the checkout functionality or redirect to the checkout page
    console.log("Proceeding to checkout...");
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-6">
        Your Cart
      </h1>

      {cart.length === 0 ? (
        <div className="text-center text-xl text-gray-600">
          Your cart is empty!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="py-4 px-6 border-b text-left text-[var(--primary-color)]">
                  Product
                </th>
                <th className="py-4 px-6 border-b text-left text-[var(--primary-color)]">
                  Price
                </th>
                <th className="py-4 px-6 border-b text-left text-[var(--primary-color)]">
                  Quantity
                </th>
                <th className="py-4 px-6 border-b text-left text-[var(--primary-color)]">
                  Total
                </th>
                <th className="py-4 px-6 border-b text-left text-[var(--primary-color)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-100">
                  <td className="py-4 px-6 flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="object-cover rounded-md"
                    />
                    <span className="text-lg">{item.name}</span>
                  </td>
                  <td className="py-4 px-6 text-lg">${item.price}</td>
                  <td className="py-4 px-6 text-lg">
                    <div className="flex gap-2 items-center justify-center">
                      <button
                        className="bg-gray-200 p-2 rounded-lg text-xl"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={item.quantity === 1}
                      >
                        -
                      </button>
                      <span className="text-xl">{item.quantity}</span>
                      <button
                        className="bg-gray-200 p-2 rounded-lg text-xl"
                        onClick={() => handleQuantityChange(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-lg">
                    <button
                      className="text-red-500 text-lg"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Cart Total Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white shadow-lg rounded-lg mt-6">
            <h2 className="text-2xl font-semibold text-[var(--primary-color)]">
              Total
            </h2>
            <span className="text-3xl font-bold text-[var(--primary-color)]">
              ${calculateTotal().toFixed(2)}
            </span>
          </div>

          {/* Proceed to Checkout Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleProceedToCheckout}
              className="bg-[var(--primary-color)] text-white py-3 px-8 rounded-lg text-xl shadow-lg hover:bg-[#4a54e1] transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
