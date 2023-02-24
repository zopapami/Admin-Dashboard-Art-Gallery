import React from "react";
import { Link, Route, Routes } from "react-router-dom";
// Firebase
import { signOut } from "firebase/auth";
// CSS
import "../../../assets/css/Dashboard.scss";
// Services
import FirebaseService from "../../../services/firebase-service.js";
// Components
import Home from "../dashboard/Home.js";
import Gallery from "../dashboard/Gallery.js";
import Info from "../dashboard/Info.js";

function Dashboard() {
  // Logout
  const handleLogout = () => {
    signOut(FirebaseService.auth)
      .then(() => {
        return;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Render
  return (
    <div className="grid-dashboard h100">
      <nav className="navbar-nav navbar-dark bg-dark mr-auto p-4">
        <li className="nav-item">
          <p className="navbar-brand navbar-text">DASHBOARD</p>
        </li>
        <li className="nav-item">
          <Link to="home" className="nav-link navbar-text">
            HOME
          </Link>
        </li>
        <li className="nav-item">
          <Link to="gallery/artworks" className="nav-link navbar-text">
            GALLERY
          </Link>
        </li>
        <li className="nav-item">
          <Link to="info" className="nav-link navbar-text">
            INFO
          </Link>
        </li>
        <li className="nav-item" onClick={handleLogout}>
          <Link to=".." className="nav-link navbar-text">
            LOGOUT
          </Link>
        </li>
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
}

export default Dashboard;
