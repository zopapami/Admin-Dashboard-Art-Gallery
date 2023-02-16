import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
// CSS
import "reactjs-popup/dist/index.css";
// Services
import ArtworkService from "../../../services/artwork-service.js";
// Components
import ArtworkAdd from "./ArtworkAdd.js";

function ArtworksLibrary() {
  const navigate = useNavigate();

  const [artworks, setArtworks] = useState([]);
  const [currentArtwork, setCurrentArtwork] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const retrieveArtworks = () => {
    ArtworkService.getAll()
      .then((res) => {
        setArtworks(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    retrieveArtworks();
  }, []);

  const refreshList = () => {
    retrieveArtworks();
    setCurrentArtwork(null);
    setCurrentIndex(-1);
  };

  const setActiveArtwork = (artwork, index) => {
    setCurrentArtwork(artwork);
    setCurrentIndex(index);
  };

  const removeAllArtworks = () => {
    ArtworkService.removeAll()
      .then((res) => {
        console.log(res.data);
        refreshList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Render
  return (
    <div className="b">
      <h5>ARTWORKS LIBRARY</h5>
      <div className="grid-artworks">
      
        <Popup
          trigger={<button className="btn btn-secondary">+</button>}
          position="bottom center"
        >
          <ArtworkAdd />
        </Popup>

        {artworks.map((artwork, index) => (
          <div
            className={index === currentIndex ? "active" : ""}
            onMouseOver={() => setActiveArtwork(artwork, index)}
            onMouseOut={() => setActiveArtwork(null, -1)}
            onDoubleClick={() => navigate(artwork.id)}
            key={index}
          >
            {artwork.title}
          </div>
        ))}
      </div>

      <button className="btn btn-danger" onClick={removeAllArtworks}>
        Remove All
      </button>

      <div>
        {currentArtwork && (
          <div>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentArtwork.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentArtwork.description}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ArtworksLibrary;
