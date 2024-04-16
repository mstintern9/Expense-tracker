import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./addExpense.css";
import CardComponent from "../components/CardComponent";

export default function AddExpense() {
  const [amount, setAmount] = useState("");
  const [transactionType, setTransactionType] = useState("debit"); 
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [formValid, setFormValid] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(storedCategories);
  
    if (isEditing) {
      const expenseId = parseInt(id);
      const storedExpenses = JSON.parse(localStorage.getItem("expenseData")) || [];
      const expenseData = storedExpenses.find((item) => item.id === expenseId);
  
      if (expenseData) {
        setAmount(expenseData.amount);
        setTransactionType(expenseData.transactionType || "debit"); 
        setCategory(expenseData.category);
        setDescription(expenseData.description);
        setSelectedDate(expenseData.date);
      }
    }
  }, [id, isEditing]);
  
  const addExpense = (newExpense) => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenseData")) || [];
    const newData = [...storedExpenses, newExpense];
    localStorage.setItem("expenseData", JSON.stringify(newData));
  };

  const updateExpense = (updatedExpense) => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenseData")) || [];
    const newData = storedExpenses.map((expense) =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    localStorage.setItem("expenseData", JSON.stringify(newData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const currentDate = new Date();
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Karachi" 
    };
    const formattedDateTime = currentDate.toLocaleString("en-PK", options).replace(/,/g, "");

    if (!amount || !category || !description || !selectedDate) {
      setFormValid(false);
      return;
    }

    const expense = {
      id: isEditing ? parseInt(id) : generateRandomId(),
      date: `${selectedDate} ${formattedDateTime}`,
      amount,
      transactionType, 
      category,
      description,
    };

    if (isEditing) {
      updateExpense(expense);
    } else {
      addExpense(expense);
    }
    setAmount("");
    setTransactionType("debit"); 
    setCategory("");
    setDescription("");
    setSelectedDate("");
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
      <CardComponent title={"Add Expense"}>
        <div style={{ marginLeft: "27vh" ,height:"53vh" , marginTop:"2vh"}} className="add-Expense">
          <form onSubmit={handleSubmit}>
            <div
              className="firstForm"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label className="label">Amount:</label>
              <input
                className="inputs"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                placeholder="Amount"
              />
              <div style={{marginTop:"1vh",marginBottom:"1vh"}}>
                <label className="label">Transaction Type:</label>
                <label>
                  <input
                    type="radio"
                    value="debit"
                    checked={transactionType === "debit"}
                    onChange={(e) => setTransactionType(e.target.value)}
                  />{" "}
                  Debit
                </label>
                <label>
                  <input
                    type="radio"
                    value="credit"
                    checked={transactionType === "credit"}
                    onChange={(e) => setTransactionType(e.target.value)}
                  />{" "}
                  Credit
                </label>
              </div>
              <select
                style={{ width: "36vh", height: "5vh" }}
                className="inputs"
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
              <label className="label">Date:</label>
              <input
                className="inputs"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />  
            </div>
            <div
              className="secondForm"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label className="label">Description:</label>
              <input
                className="inputs"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Enter Description..."
              />
              <button className="button">
                {isEditing ? "Update Expense" : "Submit Expense"}
              </button>
              {!formValid && (
                <p style={{ color: "red",marginTop:"3.4vh",fontSize:"1.7vh" }}>Please fill out all fields</p>
              )}
            </div>
          </form>
        </div>
      </CardComponent>
    </>
  );
}
