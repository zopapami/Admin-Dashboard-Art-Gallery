import React from "react";
import { Link, Route, Routes } from "react-router-dom";
// CSS
import "./Dashboard.css";
// Components
import Home from "./Home.js";
import Gallery from "./Gallery.js";
import Info from "./Info.js";

function Dashboard() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/dashboard" className="navbar-brand">
          DASHBOARD
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="home" className="nav-link">
              HOME
            </Link>
          </li>
          <li className="nav-item">
            <Link to="gallery" className="nav-link">
              GALLERY
            </Link>
          </li>
          <li className="nav-item">
            <Link to="info" className="nav-link">
              INFO
            </Link>
          </li>
        </div>
      </nav>
      <div>
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="gallery/*" element={<Gallery />} />
          <Route path="info" element={<Info />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
