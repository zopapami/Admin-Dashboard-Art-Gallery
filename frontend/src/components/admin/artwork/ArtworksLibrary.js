import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
// CSS
import "reactjs-popup/dist/index.css";
// Services
import ArtworkService from "../../../services/artwork-service.js";

function ArtworksLibrary() {
  const navigate = useNavigate();

  const initialArtworkState = {
    id: null,
    artist: "",
    category: "", //collection
    description: "",
    imageURL: "",
    title: "",
    year: null,
  };

  const [artwork, setArtwork] = useState(initialArtworkState);
  const [artworks, setArtworks] = useState([]);
  const [currentArtwork, setCurrentArtwork] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  //const [popupIsOpen, setPopupIsOpen] = useState(true);

  // retrieve all Artworks
  const retrieveArtworks = () => {
    ArtworkService.getAll()
      .then((res) => {
        setArtworks(res.data);
        console.log("All the artworks:", res.data);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  // display all Artworks
  useEffect(() => {
    retrieveArtworks();
  }, []);

  // refresh Artworks Library
  const refreshLibrary = () => {
    retrieveArtworks();
    setCurrentArtwork(null);
    setCurrentIndex(-1);
  };

  // create and save Artwork
  const saveArtwork = () => {
    let data = {
      artist: artwork.artist,
      category: artwork.category,
      description: artwork.description,
      imageURL: artwork.imageURL,
      title: artwork.title,
      year: artwork.year,
    };

    ArtworkService.create(data)
      .then((res) => {
        setArtwork({
          id: res.data.id,
          artist: res.data.artist,
          category: res.data.category,
          description: res.data.description,
          imageURL: res.data.imageURL,
          title: res.data.title,
          year: res.data.year,
        });
        console.log("New Artwork:", res.data);
        refreshLibrary();
        setArtwork(initialArtworkState);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  // delete all Artworks
  const removeAllArtworks = () => {
    ArtworkService.removeAll()
      .then((res) => {
        console.log("All artworks have been removed:", res.data);
        refreshLibrary();
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  // catch current Artwork
  const setActiveArtwork = (artwork, index) => {
    setCurrentArtwork(artwork);
    setCurrentIndex(index);
  };

  // get input values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArtwork({ ...artwork, [name]: value });
  };

  // Render
  return (
    <div className="b">
      <h5>ARTWORKS LIBRARY</h5>

      <button className="btn btn-danger" onClick={removeAllArtworks}>
        Remove All
      </button>

      <div className="grid-artworks">
        <Popup
          trigger={<button className="btn btn-secondary">+</button>}
          position="right top"
        >
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={artwork.title}
                onChange={handleInputChange}
                name="title"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={artwork.description}
                onChange={handleInputChange}
                name="description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="artist">Artist</label>
              <input
                type="text"
                className="form-control"
                id="artist"
                required
                value={artwork.artist}
                onChange={handleInputChange}
                name="artist"
              />
            </div>
            <div className="form-group">
              <label htmlFor="year">Year</label>
              <input
                type="number"
                className="form-control"
                id="year"
                required
                value={artwork.year}
                onChange={handleInputChange}
                name="year"
              />
            </div>
            <div className="form-group">
              <label htmlFor="collection">Collection</label>
              <input
                type="text"
                className="form-control"
                id="collection"
                required
                value={artwork.category}
                onChange={handleInputChange}
                name="category"
              />
            </div>
            <div className="form-group">
              <label htmlFor="imageURL">Artwork</label>
              <input
                type="text"
                className="form-control"
                id="imageURL"
                required
                value={artwork.imageURL}
                onChange={handleInputChange}
                name="imageURL"
              />
            </div>

            <button onClick={saveArtwork} className="btn btn-success">
              Submit
            </button>
          </div>
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

      {currentArtwork && (
        <div className="stack-top b">
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
          <div>
            <label>
              <strong>Artist:</strong>
            </label>{" "}
            {currentArtwork.artist}
          </div>
          <div>
            <label>
              <strong>Year:</strong>
            </label>{" "}
            {currentArtwork.year}
          </div>
          <div>
            <label>
              <strong>Collection:</strong>
            </label>{" "}
            {currentArtwork.category}
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtworksLibrary;
