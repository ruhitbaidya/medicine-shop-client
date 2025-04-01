"use client";

import { getApi } from "@/components/api/apiCom";
import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DashboardData {
  month: string;
  orders: number;
  users: number;
  subscriptions: number;
  products: number;
}

const DashboardChart = () => {
  const [data, setData] = useState<DashboardData[] | []>([]);

  const getInfos = async () => {
    const res = await getApi(`${process.env.NEXT_PUBLIC_API_URL}/admin-chart`);
    if (res?.data?.length > 0) {
      setData(res?.data);
    }
  };
  useEffect(() => {
    getInfos();
  }, []);
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">
        Monthly Performance Overview
      </h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" orientation="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />

            {/* Bars for counts */}
            <Bar
              yAxisId="left"
              dataKey="orders"
              name="Orders"
              fill="#8884d8"
              barSize={20}
            />
            <Bar
              yAxisId="left"
              dataKey="products"
              name="Products"
              fill="#82ca9d"
              barSize={20}
            />

            {/* Lines for trends */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="users"
              name="Users"
              stroke="#ff7300"
              strokeWidth={2}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="subscriptions"
              name="Subscriptions"
              stroke="#413ea0"
              strokeWidth={2}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardChart;
