import React, { useState } from "react";
import "./dashboard.css";
import PieChartComponent from "../components/PieChartComponent";
import BarChartComponent from "../components/BarChartComponent";

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(null);

  
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="firstContainer">
          <PieChartComponent />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column" }}
          className="secondContainer"
        >
          <input className="datePicker" type="date" onChange={handleDateChange} />
          <BarChartComponent selectedDate={selectedDate} />
        </div>
      </div>
    </>
  );
}
