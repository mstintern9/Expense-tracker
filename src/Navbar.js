import React from "react";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { useLocation } from "react-router-dom";
import "./styling/navbar.css";

export default function Navbar() {
  const location = useLocation();
  const getPageName = (pathname) => {
    switch (pathname) {
      case "/":
        return "Dashboard";
      case "/add-expense":
        return "Add Expense";
      case "/all-expense":
        return "All Expenses";
      case "/add-category":
        return "Add Category";
      case "/all-categories":
        return "All Categories";
    }
  };

  return (
    <div className="navbar">
      <span className="iconContainer">
        <MonetizationOnIcon style={{ fontSize: 40, marginLeft: "2vh" }} />
      </span>
      <div className="header">
        <p>{getPageName(location.pathname)}</p>
      </div>
    </div>
  );
}
