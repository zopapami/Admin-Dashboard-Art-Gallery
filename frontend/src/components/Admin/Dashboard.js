import React from "react";
import { Link, Route, Routes } from "react-router-dom";
// CSS
import "./Dashboard.css";
// Components
import Gallery from "./Gallery.js";
import Home from "./Home.js";
import Info from "./Info.js";

function Dashboard() {
  return (
    <div className="d-flex">
      {/*---------- Navbar --------------------------------------*/}
      <nav className="navbar navbar-expand ps-2 pe-4 bg-main-dark">
        <div className="navbar-nav mr-auto flex-column c-main-light">
          <li className="nav-item">
            <Link to={"/"} className="nav-link c-main-light">Dashboard</Link>
          </li>
          <hr></hr>
          <li className="nav-item">
            <Link to={"/home"} className="nav-link c-main-light">Home</Link>
          </li>
          <li className="nav-item">
            <Link to={"/artworks"} className="nav-link c-main-light">Gallery</Link>
          </li>
          <li className="nav-item">
            <Link to={"/info"} className="nav-link c-main-light">Info</Link>
          </li>
        </div>
      </nav>
      {/*---------- Routes --------------------------------------*/}
      <div className="m-3">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/artworks" element={<Gallery />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
