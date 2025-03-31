"use client";
import { deleteApi, getApi } from "@/components/api/apiCom";
import { Spinner2 } from "@/components/shaired/spinner";
import React, { useEffect, useState } from "react";
import { BiTrash } from "react-icons/bi";
import { toast } from "sonner";

type TScribe = {
  name: string;
  email: string;
  profession: string;
  _id: string;
  createdAt: string;
};

const Subscribe = () => {
  const [loading, setLoading] = useState(false);
  const [subscribe, setSubscribe] = useState<TScribe[]>([]);

  const getSubscribe = async () => {
    setLoading(true);
    try {
      const res = await getApi(
        `${process.env.NEXT_PUBLIC_API_URL}/get-all-subscribe`
      );
      if (res.data) {
        setSubscribe(res.data);
      }
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this subscription?")) {
      try {
        const res = await deleteApi(
          `${process.env.NEXT_PUBLIC_API_URL}/delete-subscribe/${id}`
        );
        if (res.data.deletedCount > 0) {
          toast.success(res.message);
          setSubscribe(subscribe.filter((item) => item._id !== id));
        }
      } catch (error) {
        console.error("Error deleting subscription:", error);
      }
    }
  };

  useEffect(() => {
    getSubscribe();
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {loading && (
        <div className="flex justify-center my-8">
          <Spinner2 />
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[var(--primary-color)] text-white">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                >
                  Profession
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-100 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {subscribe.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.profession}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(item.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-900 transition-colors duration-200 p-1 rounded-full hover:bg-red-50"
                      title="Delete"
                    >
                      <BiTrash className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {subscribe.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            No subscriptions found
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscribe;
