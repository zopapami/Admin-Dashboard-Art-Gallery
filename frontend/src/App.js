import React from "react";
import { Link, Route, Routes } from "react-router-dom";
// CSS
//import "bootstrap/dist/css/bootstrap.min.css";
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
      <div className="center-text padding-20">
        <Link to="/" className="no-underline">TAKIS CHATSIOS GALLERY</Link>
      </div>
      <nav className="border-bottom center-content flex">
        <div className="padding-20">
          <Link to="/" className="no-underline">HOME</Link>
        </div>
        <div className="padding-20">
          <Link to={"/gallery"} className="no-underline">GALLERY</Link>
        </div>
        <div className="padding-20">
          <Link to={"/events"} className="no-underline">EVENTS</Link>
        </div>
        <div className="padding-20">
          <Link to={"/bio"} className="no-underline">BIO</Link>
        </div>
        <div className="padding-20">
          <Link to={"/contact"} className="no-underline">CONTACT</Link>
        </div>
        <div className="padding-20">
          |
        </div>
        <div className="padding-20">
          <Link to={"/shop"} className="no-underline">SHOP</Link>
        </div>
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/bio" element={<Bio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </div>
      <footer className="bg-dark color-light padding-10 position-bottom width-100">
        Footer
      </footer>
    </div>
  );
};

export default App;
