import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = ({ dailyData }) => {
  return (
    <ResponsiveContainer width="98%" height="95%">
      <BarChart
        width={500}
        height={300}
        data={dailyData}
        margin={{
          top: 28,
          right: 10,
          left: 10,
          bottom: 7,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="time"
          tick={{ fontSize: 9 }}
          interval={0}
          angle={0}
          textAnchor="middle"
          height={80}
          tickFormatter={(time) => {
            const [hours, minutes] = time.split(":");
            return `${hours}:${minutes}`;
          }}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="debit" name="Debit" fill="#8884d8" />
        <Bar dataKey="credit" name="Credit" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
