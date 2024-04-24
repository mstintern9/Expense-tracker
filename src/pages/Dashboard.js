import React, { useState, useEffect } from "react";
import "./dashboard.css";
import PieChartComponent from "../components/PieChartComponent";
import BarChartComponent from "../components/BarChartComponent";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses =
      JSON.parse(localStorage.getItem("expenseData")) || [];
    setExpenses(storedExpenses);
  }, []);

  useEffect(() => {
    console.log(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const calculateTotalAmount = (type) => {
    return expenses.reduce((total, expense) => {
      if (expense.transactionType === type) {
        return total + parseFloat(expense.amount);
      }
      return total;
    }, 0);
  };

  const totalDebit = calculateTotalAmount("debit");
  const totalCredit = calculateTotalAmount("credit");
  const totalAmount = totalDebit + totalCredit;

  const data = [
    { name: "Debit", value: Math.round((totalDebit / totalAmount) * 100) },
    { name: "Credit", value: Math.round((totalCredit / totalAmount) * 100) },
  ];

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
    <>
      <div className="container">
        <div className="firstContainer">
          <PieChartComponent data={data} />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className="secondContainer"
        >
          <input
            className="datePicker"
            type="date"
            onChange={handleDateChange}
          />
          <BarChartComponent dailyData={dailyData} />
        </div>
      </div>
    </>
  );
}
