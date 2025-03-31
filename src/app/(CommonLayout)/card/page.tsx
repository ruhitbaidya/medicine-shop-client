"use client";
import { useContext } from "react";
import { ContextCreate } from "@/Context/ContextProvide";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Link from "next/link";
import { TCardFor } from "@/app/types/medicinestype";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import Discount from "@/utils/discountFun";

const CartPage = () => {
  const { card, setCard, setCount } = useContext(ContextCreate);
  console.log(card);
  const handleQuantityChange = (id: string, value: number) => {
    setCard((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: Math.max(1, (item.quantity ?? 1) + value), // Ensure quantity is never less than 1
            }
          : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCard((prev: TCardFor[]) =>
      prev.filter((item: TCardFor) => item._id !== id)
    );
  };

  const handleProceedToCheckout = () => {
    setCount(calculateTotal());
  };

  const calculateTotal = () => {
    return card.reduce(
      (total, item) =>
        total +
        ((item.discountPercentage as number) > 0
          ? (((item.price as number) -
              Math.round((item.price as number) / 100) *
                item.discountPercentage) as number)
          : (item.price as number)) *
          (item.quantity ?? 1), // Default quantity to 1 if undefined
      0
    );
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-[var(--primary-color)] mb-6">
        Your Cart
      </h1>

      {card.length === 0 ? (
        <div className="text-center text-xl text-gray-600">
          Your cart is empty!
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-center bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="py-4 px-6 border-b  text-[var(--primary-color)]">
                  Product
                </th>
                <th className="py-4 px-6 border-b  text-[var(--primary-color)]">
                  Price
                </th>
                <th className="py-4 px-6 border-b  text-[var(--primary-color)]">
                  Quantity
                </th>
                <th className="py-4 px-6 border-b  text-[var(--primary-color)]">
                  Total
                </th>
                <th className="py-4 px-6 border-b text-[var(--primary-color)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {card.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-100">
                  <td className="py-4 px-6 gap-4">
                    <span className="text-lg text-center">{item.name}</span>
                  </td>
                  <td className="py-4 px-6 text-lg gap-[10px]">
                    <div className="flex justify-center items-center gap-[10px]">
                      {(item.discountPercentage as number) > 0 ? (
                        <>
                          <Discount
                            price={item.price as number}
                            disPrice={item.discountPercentage as number}
                          />
                        </>
                      ) : (
                        <>
                          <FaBangladeshiTakaSign />
                          {item.price}
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-lg">
                    <div className="flex gap-2 items-center justify-center">
                      <button
                        className="bg-gray-200 w-[40px] flex justify-center items-center h-[40px] p-2 rounded-full text-xl"
                        onClick={() =>
                          handleQuantityChange(item._id as string, -1)
                        }
                        disabled={item.quantity === 1} // Disable if quantity is 1
                      >
                        <FaMinus size={15} />
                      </button>
                      <span className="text-xl">{item.quantity ?? 1}</span>
                      <button
                        className="bg-gray-200 w-[40px] flex justify-center items-center h-[40px] p-2 rounded-full text-xl"
                        onClick={() =>
                          handleQuantityChange(item._id as string, 1)
                        }
                      >
                        <FaPlus size={15} />
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-lg">
                    <div className="flex items-center gap-[5px]">
                      <FaBangladeshiTakaSign />
                      <p>
                        {item.discountPercentage > 0
                          ? (item.price as number) -
                            Math.round((item.price as number) / 100) *
                              item.discountPercentage
                          : item.price}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-lg">
                    <button
                      className="text-red-500 text-lg px-[15px] py-[8px]"
                      onClick={() => handleRemoveItem(item._id as string)}
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
            <span className="text-3xl flex items-center gap-[10px] font-bold text-[var(--primary-color)]">
              <FaBangladeshiTakaSign /> {calculateTotal().toFixed(2)}
            </span>
          </div>

          {/* Proceed to Checkout Button */}
          <div className="mt-6 flex justify-end">
            <Link href="/checkout">
              <button
                onClick={handleProceedToCheckout}
                className="bg-[var(--primary-color)] text-white py-3 px-8 rounded-lg text-xl shadow-lg hover:bg-[#4a54e1] transition"
              >
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
