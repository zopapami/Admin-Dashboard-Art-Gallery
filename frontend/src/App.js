import React from "react";
import { Route, Routes } from "react-router-dom";
// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// Components
import Dashboard from "./components/admin/Dashboard.js";

function App() {
  return (
    <div>
      <Routes>
        <Route path="dashboard/*" element={<Dashboard />} ></Route>
      </Routes>
    </div>
  );
};

export default App;
