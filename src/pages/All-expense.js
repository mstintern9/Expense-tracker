import React from "react";
import Sidebar from "../Sidebar";
import Box from "@mui/material/Box";

export default function AllExpense(onDeleteExpense, expenseData) {
  let expenseDataRow = null;
  if (expenseData.length > 0) {
    expenseDataRow = expenseData.map((expense) => (
      <tr key={expense.id}>
        <td>{expense.date}</td>
        <td>{expense.amount} </td>
        <td>{expense.category}</td>
        <td>{expense.description}</td>
        <td>
          <button onClick={onDeleteExpense(expense.id)}>Delete</button>
        </td>
      </tr>
    ));
  }
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div style={{ display: "flex",flexDirection:"column" }}>
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
      </Box>
    </>
  );
}
