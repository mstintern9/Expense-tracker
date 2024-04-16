import React from "react";
import "./styling/navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <span className="iconContainer"></span>
      <div className="header">
        <p style={{ fontSize: "3.7vh", paddingBottom: "2vh" }}>
          Expense Tracker
        </p>
      </div>
    </div>
  );
}
