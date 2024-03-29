import { Routes, Route, BrowserRouter, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/Add-expense";
import AllExpense from "./pages/All-expense";
import AddCategory from "./pages/Add-category";
import AllCategories from "./pages/All-categories";
import { useState, useEffect } from "react";

function App() {
  const [expenseData, setExpenseData] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleCategoryAdd = (newCategory) => {
    setCategories([...categories, newCategory]);
  };

  const handleCategoryDelete = (id) => {
    const updatedCategories = categories.filter(
      (category) => category.id !== id
    );
    setCategories(updatedCategories);
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("expenseData")) || [];
    setExpenseData(storedData);
    const storedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(storedCategories);
  }, []);

  const addExpense = (newExpense) => {
    setExpenseData((prevData) => {
      const newData = [...prevData, newExpense];
      localStorage.setItem("expenseData", JSON.stringify(newData));
      return newData;
    });
  };

  const deleteExpense = (id) => {
    setExpenseData((prevData) => {
      const newData = prevData.filter((expense) => expense.id !== id);
      localStorage.setItem("expenseData", JSON.stringify(newData));
      return newData;
    });
  };

  const handleCategoryEdit = (id) => {
    window.location.href = `/add-category/${id}`;
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route
            path="/add-expense"
            exact
            element={<AddExpense onAddExpense={addExpense} />}
          />
          <Route
            path="/all-expense"
            exact
            element={<AllExpense onDeleteExpense={deleteExpense} />}
          />
          <Route
            path="/add-category/:id"
            element={<AddCategory onCategoryAdd={handleCategoryAdd} />}
          />
          <Route
            path="/all-categories"
            exact
            element={
              <AllCategories
                categories={categories}
                onCategoryDelete={handleCategoryDelete}
                onCategoryEdit={handleCategoryEdit}
              />
            }
          />
          <Route
            path="/add-category"
            exact
            element={<AddCategory onCategoryAdd={handleCategoryAdd} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
