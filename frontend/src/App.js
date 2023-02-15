import React from "react";
import { Route, Routes } from "react-router-dom";
// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// Components
import Main from "./components/main/Main.js";
import Login from "./components/admin/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Main />} ></Route>
        <Route path="admin/*" element={<Login />} ></Route>
      </Routes>
    </div>
  );
};

export default App;
