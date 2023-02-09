import React from "react";
import { Link, Route, Routes } from "react-router-dom";
// CSS
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// Components
import Home from "./components/Home.js";
import Gallery from "./components/Gallery.js";
import Events from "./components/Events.js";
import Bio from "./components/Bio.js";
import Contact from "./components/Contact.js";
import Shop from "./components/Shop.js";

function App() {
  return (
    <div>
      {/*---------- Logo ----------------------------------------*/}
      <nav className="navbar navbar-expand justify-content-center">
        <Link to="/" className="navbar-brand">TAKIS CHATSIOS GALLERY</Link>
      </nav>
      {/*---------- Menu ----------------------------------------*/}
      <nav className="navbar navbar-expand justify-content-center">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link">HOME</Link>
          </li>
          <li className="nav-item">
            <Link to={"/gallery"} className="nav-link">GALLERY</Link>
          </li>
          <li className="nav-item">
            <Link to={"/events"} className="nav-link">EVENTS</Link>
          </li>
          <li className="nav-item">
            <Link to={"/bio"} className="nav-link">BIO</Link>
          </li>
          <li className="nav-item">
            <Link to={"/contact"} className="nav-link">CONTACT</Link>
          </li>
          <li className="nav-item">
            <Link to={"/shop"} className="nav-link">SHOP</Link>
          </li>
        </div>
      </nav>
      {/*---------- Routes --------------------------------------*/}
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
