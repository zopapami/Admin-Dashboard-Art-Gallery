import React from "react";
// CSS
import "../../../assets/css/Home.scss";

function Home() {
  return (
    <div className="h100">
      <h3 className="px-4 pt-4 pb-2">HOME</h3>
      <nav className="navbar navbar-expand bg-navbar px-3">
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <span className="nav-link nav-text">
              HEADER
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link nav-text">
              MAIN CONTENT
            </span>
          </li>
          <li className="nav-item">
            <span className="nav-link nav-text">
              FOOTER
            </span>
          </li>
        </div>
      </nav>
      <div className="p-4">
      </div>
    </div>
  );
};

export default Home;
