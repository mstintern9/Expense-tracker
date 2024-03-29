import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Box from "@mui/material/Box";
import { useEffect } from "react";

export default function AddExpense({ onAddExpense }) {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [formValid, setFormValid] = useState(true);
  const [idCounter, setIdCounter] = useState(1);

  useEffect(() => {
    setIdCounter((prevIdCounter) => prevIdCounter + 1);
  }, []);

  console.log(idCounter);
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !amount || !category || !description) {
      setFormValid(false);
      return;
    }

    const expense = {
      id: idCounter,
      date,
      amount,
      category,
      description,
    };

    onAddExpense(expense);
    setDate("");
    setAmount("");
    setCategory("");
    setDescription("");
    setFormValid(true);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="add-Expense">
            <h1>Add-expense</h1>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>Date of Purchase:</label>
                <input style={{ width: "25vh" }} type="date" />
                <label>Amount:</label>
                <input style={{ width: "25vh" }} type="number" />
                <label>Category:</label>
                <select style={{ width: "25vh" }}>
                  <option disabled value="">
                    Select a category
                  </option>
                  <option value="a">a</option>
                  <option value="b">b</option>
                  <option value="c">c</option>
                  <option value="d">d</option>
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>Description:</label>
                <input
                  type="text"
                  style={{ width: "20vh" }}
                  placeholder="Enter Description..."
                />
                <button
                  style={{ marginTop: 12, width: "13vh" }}
                >
                  Submit Expense
                </button>
                {!formValid && (
                  <p style={{ color: "red" }}>Please fill out all fields</p>
                )}
              </div>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
}
