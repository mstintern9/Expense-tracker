import React from "react";
import routes from "./modules/AppRoutes";
import { Routes, Route } from "react-router-dom";

function App() {
  const AppRoutes = () => (
    <Routes>
      {routes.map(({ path, element }, index) => (
        <Route key={index} path={path} element={element} />
      ))}
    </Routes>
  );
  return <AppRoutes />;
}

export default App;
