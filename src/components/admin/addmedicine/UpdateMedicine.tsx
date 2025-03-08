/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { getApi, patchApi } from "@/components/api/apiCom";
import { useEffect, useState, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export interface ManufacturerDetails {
  name: string;
  address: string;
  contact: string;
}

export interface MedicineFormData {
  name: string;
  description: string;
  price: number;
  stock_availability: number;
  required_prescription: boolean;
  manufacturer_details: ManufacturerDetails;
  expiry_date: string;
}

const UpdateMedicineForm = ({ id }: { id: string | null | undefined }) => {
  const [siData, setSiData] = useState<MedicineFormData | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Use reset to update the form's default values
  } = useForm<MedicineFormData>();

  // Memoize findData using useCallback
  const findData = useCallback(async () => {
    try {
      const result = await getApi(
        `${process.env.NEXT_PUBLIC_API_URL}/getSingalMedicine/${id}`
      );
      setSiData(result.data);
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  }, [id]); // Add `id` as a dependency

  useEffect(() => {
    if (id) {
      findData();
    }
  }, [id, findData]); // Add `findData` to the dependency array

  // Reset form data once the siData has been fetched
  useEffect(() => {
    if (siData) {
      reset({
        name: siData.name,
        description: siData.description,
        price: siData.price,
        stock_availability: siData.stock_availability,
        required_prescription: siData.required_prescription,
        manufacturer_details: {
          name: siData.manufacturer_details.name,
          address: siData.manufacturer_details.address,
          contact: siData.manufacturer_details.contact,
        },
        expiry_date: siData.expiry_date.split("T")[0],
      });
    }
  }, [siData, reset]);

  const onSubmit: SubmitHandler<MedicineFormData> = async (data) => {
    try {
      const result = await patchApi(
        `${process.env.NEXT_PUBLIC_API_URL}/update-medicine/${id}`,
        data
      );
      if (result) {
        toast.success(result.message);
      }
    } catch (error) {
      toast.error("Failed to update medicine");
    }
  };

  // Loading spinner or empty message when data is not yet available
  if (!siData) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-xl"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Update Medicine Information
      </h2>

      {/* Medicine Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Medicine Name
        </label>
        <input
          type="text"
          id="name"
          {...register("name", { required: "Medicine name is required" })}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          rows={4}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Price */}
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          {...register("price", {
            required: "Price is required",
            min: { value: 0, message: "Price must be a positive number" },
          })}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
        )}
      </div>

      {/* Stock Availability */}
      <div>
        <label
          htmlFor="stock_availability"
          className="block text-sm font-medium text-gray-700"
        >
          Stock Availability
        </label>
        <input
          type="number"
          id="stock_availability"
          {...register("stock_availability", {
            required: "Stock availability is required",
            min: { value: 0, message: "Stock must be a positive number" },
          })}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.stock_availability && (
          <p className="text-red-500 text-sm mt-1">
            {errors.stock_availability.message}
          </p>
        )}
      </div>

      {/* Required Prescription */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="required_prescription"
          {...register("required_prescription")}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label
          htmlFor="required_prescription"
          className="ml-2 block text-sm text-gray-700"
        >
          Requires Prescription
        </label>
      </div>

      {/* Manufacturer Details */}
      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Manufacturer Details
        </label>
        {/* Manufacturer Name */}
        <input
          type="text"
          placeholder="Manufacturer Name"
          {...register("manufacturer_details.name", {
            required: "Manufacturer name is required",
          })}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.manufacturer_details?.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.manufacturer_details.name.message}
          </p>
        )}

        {/* Manufacturer Address */}
        <input
          type="text"
          placeholder="Manufacturer Address"
          {...register("manufacturer_details.address", {
            required: "Manufacturer address is required",
          })}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.manufacturer_details?.address && (
          <p className="text-red-500 text-sm mt-1">
            {errors.manufacturer_details.address.message}
          </p>
        )}

        {/* Manufacturer Contact */}
        <input
          type="text"
          placeholder="Manufacturer Contact"
          {...register("manufacturer_details.contact", {
            required: "Manufacturer contact is required",
          })}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.manufacturer_details?.contact && (
          <p className="text-red-500 text-sm mt-1">
            {errors.manufacturer_details.contact.message}
          </p>
        )}
      </div>

      {/* Expiry Date */}
      <div>
        <label
          htmlFor="expiry_date"
          className="block text-sm font-medium text-gray-700"
        >
          Expiry Date
        </label>
        <input
          type="date"
          id="expiry_date"
          {...register("expiry_date", { required: "Expiry date is required" })}
          className="mt-1 block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
        {errors.expiry_date && (
          <p className="text-red-500 text-sm mt-1">
            {errors.expiry_date.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto sm:px-8"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default UpdateMedicineForm;
