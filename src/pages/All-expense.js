import React, { useState, useEffect } from "react";
import CardComponent from "../components/CardComponent";
import DataGridComponent from "../components/DataGridComponent";
import "./allExpense.css";

export default function AllExpense() {
  const [expenses, setExpenses] = useState([]);
  const [balanceMap, setBalanceMap] = useState({});

  useEffect(() => {
    const storedExpenses =
      JSON.parse(localStorage.getItem("expenseData")) || [];
    setExpenses(storedExpenses);
    const initialBalanceMap = calculateInitialBalanceMap(storedExpenses);
    setBalanceMap(initialBalanceMap);
  }, []);

  const calculateInitialBalanceMap = (expenses) => {
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

  const columns = [
    {
      field: "date",
      headerName: "Date",
      width: 250,
      headerClassName: "header-cell",
    },
    {
      field: "description",
      headerName: "Description",
      width: 230,
      headerClassName: "header-cell",
    },
    {
      field: "debit",
      headerName: "Debit",
      type: "number",
      width: 240,
      headerClassName: "header-cell",
      cellClassName: "debit-cell",
    },
    {
      field: "credit",
      headerName: "Credit",
      type: "number",
      width: 220,
      headerClassName: "header-cell",
      cellClassName: "credit-cell",
    },
    {
      field: "category",
      headerName: "Category",
      width: 210,
      headerClassName: "category-header",
      cellClassName: "category-cell",
    },
    {
      field: "balance",
      headerName: "Balance",
      type: "number",
      width: 190,
      headerClassName: "header-cell",
    },
  ];

  const rows = expenses.map((expense) => ({
    id: expense.id,
    date: expense.date,
    description: expense.description,
    debit: expense.transactionType === "debit" ? expense.amount : "-",
    credit: expense.transactionType === "credit" ? expense.amount : "-",
    category: expense.category,
    balance: balanceMap[expense.id],
  }));

  return (
    <>
      <CardComponent title={"All Expense"}>
        <DataGridComponent
          columns={columns}
          rows={rows}
          className="data-grid"
        />
      </CardComponent>
    </>
  );
}
