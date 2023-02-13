import React from "react";
import { Link, Route, Routes } from "react-router-dom";
// CSS
import "./Dashboard.css";
// Components
import Home from "./Home.js";
import Gallery from "./Gallery.js";
import Info from "./Info.js";
//import Artwork from "./artwork/Artwork.js";
//import ArtworkAdd from "./artwork/ArtworkAdd.js";
import ArtworksLibrary from "./artwork/ArtworksLibrary.js";
//import Collection from "./collection/Collection.js";
//import CollectionAdd from "./collection/CollectionAdd.js";
import CollectionsLibrary from "./collection/CollectionsLibrary.js";

function Dashboard() {
  return (
    <div>
      {/*---------- Navbar --------------------------------------*/}
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/dashboard"} className="nav-link">Dashboard</Link>
          </li>
          <hr></hr>
          <li className="nav-item">
            <Link to={"/dashboard/home"} className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to={"/dashboard/gallery/"} className="nav-link">Gallery</Link>
          </li>
          <li className="nav-item">
            <Link to={"/dashboard/info"} className="nav-link">Info</Link>
          </li>
        </div>
      </nav>
      {/*---------- Routes --------------------------------------*/}
      <div className="m-3">
        <Routes>
          <Route path="dashboard">
            <Route path="home" element={<Home />} />
            <Route path="gallery" element={<Gallery />}>
              <Route path="artworks" element={<ArtworksLibrary />} />
              <Route path="collections" element={<CollectionsLibrary />} />
            </Route>
            <Route path="info" element={<Info />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
