import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";

export default function AddExpense() {
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [formValid, setFormValid] = useState(true);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  useEffect(() => {
    const storedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(storedCategories);

    if (isEditing) {
      const expenseId = parseInt(id);
      const storedExpenses =
        JSON.parse(localStorage.getItem("expenseData")) || [];
      const expenseData = storedExpenses.find((item) => item.id === expenseId);

      if (expenseData) {
        setDate(expenseData.date);
        setAmount(expenseData.amount);
        setCategory(expenseData.category);
        setDescription(expenseData.description);
      }
    }
  }, [id, isEditing]);

  const addExpense = (newExpense) => {
    const storedExpenses =
      JSON.parse(localStorage.getItem("expenseData")) || [];
    const newData = [...storedExpenses, newExpense];
    localStorage.setItem("expenseData", JSON.stringify(newData));
  };

  const updateExpense = (updatedExpense) => {
    const storedExpenses =
      JSON.parse(localStorage.getItem("expenseData")) || [];
    const newData = storedExpenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    localStorage.setItem("expenseData", JSON.stringify(newData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date || !amount || !category || !description) {
      setFormValid(false);
      return;
    }

    const expense = {
      id: isEditing ? parseInt(id) : generateRandomId(), 
      date,
      amount,
      category,
      description,
    };

    if (isEditing) {
      updateExpense(expense);
    } else {
      addExpense(expense);
    }

    setDate("");
    setAmount("");
    setCategory("");
    setDescription("");
    setFormValid(true);
    navigate("/all-expense");
  };

  function handleChange(e) {
    setCategory(e.target.value);
  }

  function generateRandomId() {
    return Math.floor(Math.random() * 1000000);
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="add-Expense">
            <h1>{isEditing ? "Update Expense" : "Add Expense"}</h1>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>Date of Purchase:</label>
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{ width: "25vh" }}
                  type="date"
                />
                <label>Amount:</label>
                <input
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{ width: "25vh" }}
                  type="number"
                />
                <label>Category:</label>
                <select
                  style={{ width: "25vh" }}
                  value={category}
                  onChange={handleChange}
                >
                  <option disabled value="">
                    Select a category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <label>Description:</label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  style={{ width: "20vh" }}
                  placeholder="Enter Description..."
                />
                <button style={{ marginTop: 12, width: "13vh" }}>
                  {isEditing ? "Update Expense" : "Submit Expense"}
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
