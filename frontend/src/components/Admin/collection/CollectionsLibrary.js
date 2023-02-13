import React, { useState, useEffect } from "react";
import ArtworkService from "../../../services/artwork-service.js";
import { Link } from "react-router-dom";

const ArtworksLibrary = () => {
  const [artworks, setArtworks] = useState([]);
  const [currentArtwork, setCurrentArtwork] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    retrieveArtworks();
  }, []);

  const retrieveArtworks = () => {
    ArtworkService.getAll()
      .then(response => {
        setArtworks(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

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
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Artworks Library</h4>

        <ul className="list-group">
          {artworks &&
            artworks.map((artwork, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveArtwork(artwork, index)}
                key={index}
              >
                {artwork.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllArtworks}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentArtwork ? (
          <div>
            <h4>Artwork</h4>
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

            <Link
              to={"/dashboard/gallery/artworks/" + currentArtwork.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Artwork...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtworksLibrary;
