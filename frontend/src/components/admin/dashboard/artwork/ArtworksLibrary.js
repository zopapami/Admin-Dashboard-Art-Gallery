import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Firebase
import {
  //deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
// CSS
import "../../../../assets/css/Artwork.scss";
// Services
import FirebaseService from "../../../../services/firebase-service.js";
import ArtworkService from "../../../../services/artwork-service.js";
// Images
import Plus from "../../../../assets/img/plus-icon.png";

function ArtworksLibrary() {
  const navigate = useNavigate();
  const initialArtworkState = {
    id: null,
    artist: "",
    category: "", //collection
    description: "",
    imageURL: "",
    title: "",
    year: "",
  };
  const [artwork, setArtwork] = useState(initialArtworkState);
  const [artworks, setArtworks] = useState([]);
  const [currentArtwork, setCurrentArtwork] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [image, setImage] = useState(null);

  // retrieve all Artworks
  const retrieveArtworks = () => {
    ArtworkService.getAll()
      .then((res) => {
        setArtworks(res.data);
        console.log("All the artworks:", res.data);
      })
      .catch((err) => {
        console.log("Error while retrieving all the artworks:", err);
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

  // catch current Artwork
  const setActiveArtwork = (artwork, index) => {
    setCurrentArtwork(artwork);
    setCurrentIndex(index);
  };

  // get Input Values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArtwork({ ...artwork, [name]: value });
  };
  const handleImageInput = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // save Artwork
  const handleArtwork = () => {
    const imageRef = ref(FirebaseService.storage, `artworks/${image.name}`);
    // save to storage
    uploadBytes(imageRef, image)
      .then(() => {
        console.log("Artwork file uploaded to storage!");
        // retrieve from storage
        getDownloadURL(imageRef)
          .then((url) => {
            artwork.imageURL = url;
            console.log("Artwork file downloaded from storage!");
            setImage(null);
            let data = {
              artist: artwork.artist,
              category: artwork.category,
              description: artwork.description,
              imageURL: artwork.imageURL,
              title: artwork.title,
              year: artwork.year,
            };
            // save to database
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
                console.log("The new Artwork:", res.data);
                setArtwork(initialArtworkState);
              })
              .catch((err) => {
                console.log("Error while creating the new Artwork:", err);
              });
          })
          .catch((err) => {
            console.log("Error while downloading:", err);
          });
      })
      .catch((err) => {
        console.log("Error while uploading:", err);
      });
  };

  /*
  // delete Artwork File from storage
  const deleteImage = () => {
    const imageRef = ref(FirebaseService.storage, `artworks/${image.name}`);
    deleteObject(imageRef)
      .then(() => {
        console.log("Artwork file deleted successfully!");
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };
  */

  // delete all Artworks from database
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

  // Render
  return (
    <div>
      <button className="btn button my-3" onClick={removeAllArtworks}>
        Remove All
      </button>

      <div className="grid-artworks">
        <button
          type="button"
          className="btn bg-button size-button-130"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <img src={Plus} alt="plus-icon" width="50" />
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  New Artwork
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
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
                    value={artwork.artist}
                    onChange={handleInputChange}
                    name="artist"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="year">Year</label>
                  <input
                    type="text"
                    className="form-control"
                    id="year"
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
                    value={artwork.category}
                    onChange={handleInputChange}
                    name="category"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="imageURL">Artwork</label>
                  <input
                    type="file"
                    accept="images/*"
                    multiple={false}
                    className="form-control"
                    id="imageURL"
                    required
                    onChange={handleImageInput}
                    name="imageURL"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn button"
                  onClick={handleArtwork}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        {artworks.map((artwork, index) => (
          <div
            className={index === currentIndex ? "active" : ""}
            onMouseOver={() => setActiveArtwork(artwork, index)}
            onMouseOut={() => setActiveArtwork(null, -1)}
            onDoubleClick={() => navigate("..")}
            key={index}
          >
            <img
              src={artwork.imageURL}
              alt={artwork.title}
              className="h-artwork"
            />
          </div>
        ))}
      </div>

      {currentArtwork && (
        <div className="bg-warning">
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
