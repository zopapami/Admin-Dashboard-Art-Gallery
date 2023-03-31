// Bootstrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
//
import React from "react";
import { Route, Routes } from "react-router-dom";
// CSS
import "./assets/css/App.scss";
// Components
import Login from "./components/admin/Login.js";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Login />}></Route>
    </Routes>
  );
};

export default App;
