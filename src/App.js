import React from "react";
import routes from "./modules/AppRoutes";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function App() {
  const AppRoutes = () => (
    <Routes>
      {routes.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
    </Routes>
  );
  return (
    <>
      <Navbar />
      <Sidebar />
      <AppRoutes />
    </>
  );
}

export default App;
