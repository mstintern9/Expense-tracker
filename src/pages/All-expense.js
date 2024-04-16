import React, { useState, useEffect } from "react";
import CardComponent from "../components/CardComponent";
import DataGridComponent from "../components/DataGridComponent";

export default function AllExpense() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses =
      JSON.parse(localStorage.getItem("expenseData")) || [];
    setExpenses(storedExpenses);
  }, []);

  const columns = [
    { field: "date", headerName: "Date", width: 280 },
    { field: "description", headerName: "Description", width: 250 },
    { field: "debit", headerName: "Debit", type: "number", width: 240 },
    { field: "credit", headerName: "Credit", type: "number", width: 280 },
    { field: "category", headerName: "Category", width: 250 },
    { field: "balance", headerName: "Balance", type: "number", width: 180 },
  ];

  const calculateBalance = () => {
    let balance = 0;
    const balanceMap = {};
    expenses.forEach((expense) => {
      if (expense.transactionType === "debit") {
        balance -= parseFloat(expense.amount);
      } else {
        balance += parseFloat(expense.amount);
      }
      balanceMap[expense.id] = balance;
    });
    return balanceMap;
  };

  const sortedExpenses = expenses.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const rows = sortedExpenses.map((expense) => ({
    id: expense.id,
    date: expense.date,
    description: expense.description,
    debit: expense.transactionType === "debit" ? expense.amount : "-",
    credit: expense.transactionType === "credit" ? expense.amount : "-",
    category: expense.category,
    balance: calculateBalance()[expense.id],
  }));

  return (
    <>
      <CardComponent title={"All Expense"}>
        <DataGridComponent columns={columns} rows={rows} />
      </CardComponent>
    </>
  );
}
