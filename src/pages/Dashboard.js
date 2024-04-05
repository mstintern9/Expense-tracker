import React from "react";
import Sidebar from "../modules/Sidebar";
import Box from "@mui/material/Box";

export default function Dashboard() {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <h1>Dashboard</h1>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}></Box>
      </Box>
    </>
  );
}
