"use client";
import { getApi } from "@/components/api/apiCom";
import { useEffect, useState } from "react";
type OverView = {
  pendingOrder: number;
  totalMedicine: number;
  totalOrder: number;
};
export const OverView = () => {
  const [overview, setOverView] = useState<OverView | null>(null);
  const handelOverview = async () => {
    const res = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/overview`);
    console.log(res);
    if (res.data) {
      setOverView({
        pendingOrder: res.data.pendingOrder,
        totalMedicine: res.data.totalMedicine[0].totalStock,
        totalOrder: res.data.totalOrder,
      });
    }
  };
  useEffect(() => {
    handelOverview();
  }, []);
  return (
    <div>
      <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Overview Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-white/20 hover:scale-105 transform ">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
                <svg
                  className="w-10 h-10 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  ></path>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Total Orders
                </h2>
                <p className="text-4xl font-bold text-gray-900">
                  {overview?.totalOrder}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-white/20 hover:scale-105 transform transition-transform">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-green-100 to-green-200 rounded-xl">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  ></path>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Stock Levels
                </h2>
                <p className="text-4xl font-bold text-gray-900">
                  {overview?.totalMedicine}
                </p>
                {/* <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2.5 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div> */}
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-white/20 hover:scale-105 transform transition-transform">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl">
                <svg
                  className="w-10 h-10 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Pending Prescriptions
                </h2>
                <p className="text-4xl font-bold text-gray-900">
                  {overview?.pendingOrder}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
