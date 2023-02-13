import React from "react";
import { Link, Route, Routes } from "react-router-dom";

function Gallery() {
  return (
    <div>
      {/*---------- Navbar --------------------------------------*/}
      <nav className="navbar navbar-expand navbar-dark bg-secondary">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/dashboard/gallery/artworks"} className="nav-link">Artworks</Link>
          </li>
          <li className="nav-item">
            <Link to={"/dashboard/gallery/collections"} className="nav-link">Collections</Link>
          </li>
        </div>
      </nav>
    </div>
  );
}

export default Gallery;
