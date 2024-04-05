import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export default function AllExpense() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenseData")) || [];
    setExpenses(storedExpenses);
  }, []);

  const navigate = useNavigate();

  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem("expenseData", JSON.stringify(updatedExpenses));
  };

  const handleEditExpense = (id) => {
    navigate(`/add-expense/${id}`);
  };

  let expenseDataRow = null;
  if (Array.isArray(expenses) && expenses.length > 0) {
    expenseDataRow = expenses.map((expense) => (
      <tr key={expense.id}>
        <td align="center">{expense.date}</td>
        <td align="center">{expense.amount} </td>
        <td align="center">{expense.category}</td>
        <td align="center">{expense.description}</td>
        <td align="center">
          <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
          <button onClick={() => handleEditExpense(expense.id)}>Edit</button>
        </td>
      </tr>
    ));
  }
  return (
    <>  
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div style={{marginLeft:"27vh" ,display: "flex", flexDirection: "column" }}>
            <h1>All expense</h1>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{expenseDataRow}</tbody>
            </table>
          </div>
      </Box>
    </>
  );
}
