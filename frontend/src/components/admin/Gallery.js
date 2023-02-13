import React from "react";
import { Link, Route, Routes } from "react-router-dom";
// Components
import ArtworksLibrary from "./artwork/ArtworksLibrary.js";
import CollectionsLibrary from "./collection/CollectionsLibrary.js";

function Gallery() {
  return (
    <div className="h100 w100">
      <h3 className="px-4 pt-4 pb-2">GALLERY</h3>
      <nav className="navbar navbar-expand navbar-dark bg-secondary px-3">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="artworks" className="nav-link">
              ARTWORKS
            </Link>
          </li>
          <li className="nav-item">
            <Link to="collections" className="nav-link">
              COLLECTIONS
            </Link>
          </li>
        </div>
      </nav>
      <div className="p-4">
        <Routes>
          <Route path="artworks" element={<ArtworksLibrary />} />
          <Route path="collections" element={<CollectionsLibrary />} />
        </Routes>
      </div>
    </div>
  );
}

export default Gallery;
