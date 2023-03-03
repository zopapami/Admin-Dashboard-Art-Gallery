// Bootstrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//
import React from "react";
import { Route, Routes } from "react-router-dom";
// CSS
import "./assets/css/App.scss";
// Components
import Main from "./components/main/Main.js";
import Login from "./components/admin/Login.js";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Main />}></Route>
      <Route path="admin/*" element={<Login />}></Route>
    </Routes>
  );
};

export default App;
