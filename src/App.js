import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/Add-expense";
import AllExpense from "./pages/All-expense";
import AddCategory from "./pages/Add-category";
import AllCategories from "./pages/All-categories";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/add-expense" exact element={<AddExpense />} />
        <Route path="/all-expense" exact element={<AllExpense />} />
        <Route path="/add-expense/:id" element={<AddExpense />} />

        <Route path="/add-category/:id" element={<AddCategory />} />
        <Route path="/all-categories" exact element={<AllCategories />} />
        <Route path="/add-category" exact element={<AddCategory />} />
      </Routes>
    </>
  );
}

export default App;
