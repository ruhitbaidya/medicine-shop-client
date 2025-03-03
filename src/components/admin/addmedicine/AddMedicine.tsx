"use client";
import { SubmitHandler, useForm } from "react-hook-form";

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

const MedicineForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MedicineFormData>();
  const onSubmit: SubmitHandler<MedicineFormData> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg"
    >
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
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md sm:text-sm"
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
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md sm:text-sm"
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
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md sm:text-sm"
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
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md sm:text-sm"
        />
        {errors.stock_availability && (
          <p className="text-red-500 text-sm mt-1">
            {errors.stock_availability.message}
          </p>
        )}
      </div>

      {/* Required Prescription */}
      <div>
        <label
          htmlFor="required_prescription"
          className="block text-sm font-medium text-gray-700"
        >
          Requires Prescription
        </label>
        <input
          type="checkbox"
          id="required_prescription"
          {...register("required_prescription")}
          className="mt-1 p-2 border border-gray-300 rounded-md"
        />
      </div>

      {/* Manufacturer Details */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Manufacturer Details
        </label>
        <div className="space-y-4">
          {/* Manufacturer Name */}
          <input
            type="text"
            placeholder="Manufacturer Name"
            {...register("manufacturer_details.name", {
              required: "Manufacturer name is required",
            })}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md sm:text-sm"
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md sm:text-sm"
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
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md sm:text-sm"
          />
          {errors.manufacturer_details?.contact && (
            <p className="text-red-500 text-sm mt-1">
              {errors.manufacturer_details.contact.message}
            </p>
          )}
        </div>
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
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md sm:text-sm"
        />
        {errors.expiry_date && (
          <p className="text-red-500 text-sm mt-1">
            {errors.expiry_date.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 sm:w-auto sm:px-8"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default MedicineForm;
