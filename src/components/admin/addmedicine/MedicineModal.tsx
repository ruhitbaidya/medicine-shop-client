"use client";
import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import MedicineForm from "./AddMedicine";
import { FaPlus } from "react-icons/fa";

const FullPageModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="btns flex gap-[15px] items-center"
      >
        <FaPlus size={25} />
        Add Medicine
      </button>
      <div className=" bg-gray-100">
        {/* Open Modal Button */}

        {/* Full-Page Modal Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-white z-50 overflow-y-auto"
            onClick={() => setIsOpen(false)}
          >
            {/* Modal Container */}
            <div
              className="w-full min-h-screen p-8 bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 text-gray-500 hover:text-gray-900 transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                <AiOutlineClose size={24} />
              </button>

              {/* Modal Title */}
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Add New Medicine
              </h2>

              {/* Medicine Form */}
              <MedicineForm />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FullPageModal;
