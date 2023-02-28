import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone-uploader";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
// Firebase
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
// CSS
import "react-dropzone-uploader/dist/styles.css";
import "../../../../assets/css/Artwork.scss";
// Services
import FirebaseService from "../../../../services/firebase-service.js";
import ArtworkService from "../../../../services/artwork-service.js";
// Images
import Plus from "../../../../assets/img/plus-icon.png";

function ArtworksLibrary() {
  let navigate = useNavigate();
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
  const [currentArtwork, setCurrentArtwork] = useState(initialArtworkState);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  //const [editArtwork, setEditArtwork] = useState(false);
  //const [message, setMessage] = useState("");

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
    navigate("");
    retrieveArtworks();
    setArtwork(initialArtworkState);
    setCurrentArtwork(initialArtworkState);
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
  const handleInputChangeCurrent = (e) => {
    const { name, value } = e.target;
    currentArtwork[name] = value;
  };

  // save Artwork
  const handleArtwork = () => {
    setLoader(true);
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
                artwork.id = res.data.id;
                console.log("The new Artwork:", res.data);
                refreshLibrary();
              })
              .catch((err) => {
                console.log("Error while creating the new Artwork:", err);
              });
            setLoader(false);
          })
          .catch((err) => {
            console.log("Error while downloading:", err);
          });
      })
      .catch((err) => {
        console.log("Error while uploading:", err);
      });
  };

  // Dropzone
  const onFileChange = ({ file }, status) => {
    console.log(status, file);
  };
  /*
  const clearDropzone = (file, allFiles) => {
    allFiles.forEach((f) => f.remove());
  };
  */
  const getFilesFromEvent = (e) => {
    return new Promise((resolve) => {
      getDroppedOrSelectedFiles(e).then((chosenFiles) => {
        resolve(
          chosenFiles.map((f) => {
            const file = f.fileObject;
            setImage(file);
            return f.fileObject;
          })
        );
      });
    });
  };
  const selectFileInput = ({ onFiles, getFilesFromEvent }) => {
    return (
      <label className="mt-5">
        {"Drop file here or Click here to select file"}
        <input
          style={{ display: "none" }}
          type="file"
          accept="images/*"
          multiple={false}
          className="form-control"
          id="imageURL"
          required
          onChange={(e) => {
            getFilesFromEvent(e).then((chosenFiles) => {
              onFiles(chosenFiles);
            });
          }}
          name="imageURL"
        />
      </label>
    );
  };

  /*
  // retrieve an Artwork by id
  const getArtwork = (id) => {
    ArtworkService.get(id)
      .then((res) => {
        setCurrentArtwork(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (id) getArtwork(id);
  }, [id]);
  */

  // update an Artwork by id
  const updateArtwork = () => {
    ArtworkService.update(currentArtwork.id, currentArtwork)
      .then((res) => {
        console.log(res.data);
        //setMessage("The Artwork was updated successfully!");
      })
      .catch((err) => {
        console.log("Error while updating the Artwork:", err);
      });
  };

  // delete an Artwork by id
  const deleteArtwork = () => {
    setLoader(true);
    const imageRef = ref(FirebaseService.storage, currentArtwork.imageURL);
    deleteObject(imageRef)
      .then(() => {
        console.log("Artwork file deleted successfully from storage!");
        ArtworkService.remove(currentArtwork.id)
          .then((res) => {
            console.log(res.data);
            refreshLibrary();
          })
          .catch((err) => {
            console.log("Error while deleting the Artwork from database:", err);
          });
        setLoader(false);
      })
      .catch((err) => {
        console.log("Error while deleting the Artwork from storage:", err);
      });
  };

  // delete all Artworks from database
  const removeAllArtworks = () => {
    setLoader(true);
    let i = 0;
    for (i in artworks) {
      const imageRef = ref(FirebaseService.storage, artworks[i].imageURL);
      deleteObject(imageRef)
        .then(() => {})
        .catch((err) => {
          console.log("Error while deleting the artworks from storage:", err);
        });
    }
    ArtworkService.removeAll()
      .then((res) => {
        console.log("All artworks have been removed:", res.data);
        refreshLibrary();
      })
      .catch((err) => {
        console.log("Error while deleting the artworks:", err);
      });
    setLoader(false);
  };

  // Render
  return (
    <div>
      {/*---------- Clear Library ----------*/}
      <button
        type="button"
        className="btn button float-end"
        data-bs-toggle="modal"
        data-bs-target="#removeModal"
      >
        Clear Library
      </button>
      {/*---------- Clear Library Modal ----------*/}
      <div
        className="modal fade"
        id="removeModal"
        tabIndex="-1"
        aria-labelledby="removeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="removeModalLabel">
                Delete Artworks
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete all artworks?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn button"
                data-bs-dismiss="modal"
                onClick={removeAllArtworks}
              >
                Delete
              </button>
              <button
                type="button"
                className="btn button"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*---------- Grid of Artworks ----------*/}
      <div className="grid-artworks p-5">
        {/*---------- Add Artwork ----------*/}
        <button
          type="button"
          className="btn button size-button-130"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <img src={Plus} alt="plus-icon" width="50" />
        </button>
        {/*---------- Add Artwork Modal ----------*/}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content bg-modal-content border-0">
              <div className="modal-header bg-modal-header border-0 shadow-sm">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  New Artwork
                </h1>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="title">Title*</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    placeholder="Required"
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
                  <Dropzone
                    onChangeStatus={onFileChange}
                    InputComponent={selectFileInput}
                    getFilesFromEvent={getFilesFromEvent}
                    accept="image/*"
                    maxFiles={1}
                    inputContent="Drop A File"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn button"
                  data-bs-dismiss="modal"
                  onClick={handleArtwork}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*---------- Display Artworks ----------*/}
        {artworks.map((artwork, index) => (
          <div
            id="artworks"
            className={index === currentIndex ? "active" : ""}
            onMouseOver={() => setActiveArtwork(artwork, index)}
            onMouseOut={() => setActiveArtwork(initialArtworkState, -1)}
            key={index}
          >
            {loader ? (
              <div className="position-absolute top-50 start-50 translate-middle">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <div>
                {/*---------- Image of Artwork ----------*/}
                <img
                  src={artwork.imageURL}
                  alt={artwork.title}
                  className="h-artwork"
                />
                {/*---------- Link to Edit Artwork ----------*/}
                <Link to={artwork.id}>
                  <p
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                    data-bs-backdrop="static"
                  ></p>
                </Link>
                {/*---------- Details of Artwork ----------*/}
                <span>
                  <div>
                    <label>Title:</label> {artwork.title}
                  </div>
                  <div>
                    <label>Description:</label> {artwork.description}
                  </div>
                  <div>
                    <label>Artist:</label> {artwork.artist}
                  </div>
                  <div>
                    <label>Year:</label> {artwork.year}
                  </div>
                  <div>
                    <label>Collection:</label> {artwork.category}
                  </div>
                  <br></br>
                  <div>
                    <h6>click to edit</h6>
                  </div>
                </span>
                {/*---------- Routing to Edit Artwork Modal ----------*/}
                <Routes>
                  <Route
                    path={`:${artwork.id}`}
                    element={
                      <div
                        className="modal fade"
                        id="editModal"
                        tabIndex="-1"
                        aria-labelledby="editModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-scrollable">
                          <div className="modal-content bg-modal-content border-0">
                            <div className="modal-header bg-modal-header border-0 shadow-sm">
                              <h1
                                className="modal-title fs-5"
                                id="editModalLabel"
                              >
                                {artwork.title}
                              </h1>
                              <button
                                type="button"
                                className="btn-close btn-close-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="form-group">
                                <label htmlFor="title">Title*</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="title"
                                  required
                                  placeholder={artwork.title}
                                  onChange={handleInputChangeCurrent}
                                  name="title"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="description"
                                  placeholder={artwork.description}
                                  onChange={handleInputChangeCurrent}
                                  name="description"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="artist">Artist</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="artist"
                                  placeholder={artwork.artist}
                                  onChange={handleInputChangeCurrent}
                                  name="artist"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="year">Year</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="year"
                                  placeholder={artwork.year}
                                  onChange={handleInputChangeCurrent}
                                  name="year"
                                />
                              </div>
                              <div className="form-group">
                                <label htmlFor="collection">Collection</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="collection"
                                  placeholder={artwork.category}
                                  onChange={handleInputChangeCurrent}
                                  name="category"
                                />
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn button"
                                data-bs-dismiss="modal"
                                onClick={updateArtwork}
                              >
                                Update
                              </button>
                              <button
                                type="button"
                                className="btn button"
                                data-bs-dismiss="modal"
                                onClick={deleteArtwork}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    }
                  />
                </Routes>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtworksLibrary;
