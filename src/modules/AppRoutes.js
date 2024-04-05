import React from "react";
import Dashboard from "../pages/Dashboard";
import AddExpense from "../pages/Add-expense";
import AllExpense from "../pages/All-expense";
import AddCategory from "../pages/Add-category";
import AllCategories from "../pages/All-categories";
import { ROUTES } from "../modules/routes";

const routes = [
  { path: ROUTES.DASHBOARD, element: <Dashboard /> },
  { path: ROUTES.ADD_EXPENSE, element: <AddExpense /> },
  { path: ROUTES.ALL_EXPENSE, element: <AllExpense /> },
  { path: ROUTES.ADD_EXPENSE_ID, element: <AddExpense /> },
  { path: ROUTES.ADD_CATEGORY_ID, element: <AddCategory /> },
  { path: ROUTES.ALL_CATEGORIES, element: <AllCategories /> },
  { path: ROUTES.ADD_CATEGORY, element: <AddCategory /> },
];

export default routes;
