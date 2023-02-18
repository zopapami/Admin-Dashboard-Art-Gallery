import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Firebase
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
// Services
import FirebaseService from "../../../services/firebase-service.js";
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
  const [image, setImage] = useState(null);
  //const [picPreview, setPicPreview] = useState(null);
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
        //uploadImage();
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

  // Imaqe
  const handleImage = (e) => {
    const file = e.target.files[0];
    console.log(file);
    console.log(URL.createObjectURL(file));
    //setPicPreview();
    if (file) {
      setImage(file);
    }
  };
  // Upload
  const uploadImage = () => {
    const imageRef = ref(FirebaseService.storage, `artworks/${image.name}`);
    uploadBytes(imageRef, image)
      .then(() => {
        console.log("Artwork file uploaded to storage!");
        // Download
        getDownloadURL(imageRef)
          .then((data) => {
            setArtwork({ imageURL: data });
            console.log("Artwork file downloaded successfully!");
          })
          .catch((err) => {
            console.log("Error while downloading:", err);
          });
        setImage(null);
      })
      .catch((err) => {
        console.log("Error while uploading:", err);
      });
  };

  /*
  // Delete
  const deleteImage = () => {
    const imageRef = ref(FirebaseService.storage, image.name);
    deleteObject(imageRef)
      .then(() => {
        console.log("Artwork file deleted successfully!");
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };
  */
  // End Image

  // Render
  return (
    <div className="b">
      <h5>ARTWORKS LIBRARY</h5>

      <button className="btn btn-danger" onClick={removeAllArtworks}>
        Remove All
      </button>

      <div className="grid-artworks">
        <button
          type="button"
          class="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          +
        </button>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">
                  New Artwork
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
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
                    type="file"
                    accept="images/*"
                    multiple={false}
                    className="form-control"
                    id="imageURL"
                    required
                    onChange={handleImage}
                    name="imageURL"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-success"
                  onClick={uploadImage}
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
            onDoubleClick={() => navigate(artwork.id)}
            key={index}
          >
            {artwork.title}
          </div>
        ))}
      </div>

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
