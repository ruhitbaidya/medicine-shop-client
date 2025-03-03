"use client";
import MedicineForm from "@/components/admin/addmedicine/AddMedicine";
import Modal from "@/components/admin/addmedicine/MedicineModal";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
const MedicinePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <h2>Medicine</h2>
          <div className=" bg-gray-100 flex items-center justify-center">
            <button
              onClick={openModal}
              className="btns flex gap-[15px] items-center"
            >
              <FaPlus size={25} />
              Add Medicine
            </button>

            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              title="Add Medicine"
            >
              <p className="text-gray-700">
                <MedicineForm />
              </p>
            </Modal>
          </div>
        </div>
      </div>
      <div>
        <div></div>
      </div>
    </div>
  );
};

export default MedicinePage;
