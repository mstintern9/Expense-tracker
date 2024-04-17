import React, { useState, useEffect } from "react";
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

const BarChartComponent = ({ selectedDate }) => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses =
      JSON.parse(localStorage.getItem("expenseData")) || [];
    setExpenses(storedExpenses);
  }, []);

  const filteredExpenses = selectedDate
    ? expenses.filter(
        (expense) =>
          new Date(expense.date).toISOString().split("T")[0] === selectedDate
      )
    : expenses;

  const calculateDailyDebitCredit = () => {
    const dailyData = {};
    filteredExpenses.forEach((expense) => {
      const time = new Date(expense.date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      const amount = parseFloat(expense.amount);
      if (!dailyData[time]) {
        dailyData[time] = { time: time, debit: 0, credit: 0 };
      }
      if (expense.transactionType === "debit") {
        dailyData[time].debit += amount;
      } else {
        dailyData[time].credit += amount;
      }
    });
    return Object.values(dailyData);
  };

  const dailyData = calculateDailyDebitCredit();

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
