import React from "react";
import { Link, Route, Routes } from "react-router-dom";
// Components
import ArtworksLibrary from "./artwork/ArtworksLibrary.js";
import CollectionsLibrary from "./collection/CollectionsLibrary.js";

function Gallery() {
  return (
    <div className="h100 w100">
      <h3>GALLERY</h3>
      <nav className="navbar navbar-expand navbar-dark bg-secondary">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="artworks" className="nav-link">
              Artworks
            </Link>
          </li>
          <li className="nav-item">
            <Link to="collections" className="nav-link">
              Collections
            </Link>
          </li>
        </div>
      </nav>
      <div>
        <Routes>
          <Route path="artworks" element={<ArtworksLibrary />} />
          <Route path="collections" element={<CollectionsLibrary />} />
        </Routes>
      </div>
    </div>
  );
}

export default Gallery;
