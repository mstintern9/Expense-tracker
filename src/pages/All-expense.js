import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import "./allExpense.css";
import CardComponent from "../components/CardComponent";

export default function AllExpense() {
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedExpenses =
      JSON.parse(localStorage.getItem("expenseData")) || [];
    setExpenses(storedExpenses);
  }, []);

  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
    localStorage.setItem("expenseData", JSON.stringify(updatedExpenses));
  };

  const handleEditExpense = (id) => {
    navigate(`/add-expense/${id}`);
  };

  return (
    <>
      <CardComponent title={"All Expense"} >
        <div className="table">
          <Paper
            sx={{
              boxShadow: "none",
              width: "100%",
              overflow: "hidden",
              margin: "0",
              marginTop: "2vh",
              height: "66vh",
              border: "none",
            }}
          >
            <TableContainer sx={{ maxHeight: 640 }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ color: "gray", fontSize: "2.4vh" }}
                      align="center"
                    >
                      Date
                    </TableCell>
                    <TableCell
                      sx={{ color: "gray", fontSize: "2.4vh" }}
                      align="center"
                    >
                      Amount
                    </TableCell>
                    <TableCell
                      sx={{ color: "gray", fontSize: "2.4vh" }}
                      align="center"
                    >
                      Category
                    </TableCell>
                    <TableCell
                      sx={{ color: "gray", fontSize: "2.4vh" }}
                      align="center"
                    >
                      Description
                    </TableCell>
                    <TableCell
                      sx={{ color: "gray", fontSize: "2.4vh" }}
                      align="center"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={expense.id}
                    >
                      <TableCell align="center">{expense.date}</TableCell>
                      <TableCell align="center">{expense.amount}</TableCell>
                      <TableCell align="center">{expense.category}</TableCell>
                      <TableCell align="center">
                        {expense.description}
                      </TableCell>
                      <TableCell align="center">
                        <button
                          className="tableButton"
                          onClick={() => handleDeleteExpense(expense.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="tableButton"
                          onClick={() => handleEditExpense(expense.id)}
                        >
                          Edit
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </CardComponent>
    </>
  );
}
