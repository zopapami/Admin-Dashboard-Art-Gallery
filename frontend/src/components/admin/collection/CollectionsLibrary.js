import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Firebase
import {
  //deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
// Services
import FirebaseService from "../../../services/firebase-service.js";
import CollectionService from "../../../services/collection-service.js";

function CollectionsLibrary() {
  const navigate = useNavigate();
  const initialCollectionState = {
    id: null,
    artist: "",
    category: "", //collection
    description: "",
    imageURL: "",
    title: "",
    year: "",
  };
  const [collection, setCollection] = useState(initialCollectionState);
  const [collections, setCollections] = useState([]);
  const [currentCollection, setCurrentCollection] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [image, setImage] = useState(null);

  // retrieve all Collections
  const retrieveCollections = () => {
    CollectionService.getAll()
      .then((res) => {
        setCollections(res.data);
        console.log("All the collections:", res.data);
      })
      .catch((err) => {
        console.log("Error while retrieving all the collections:", err);
      });
  };

  // display all Collections
  useEffect(() => {
    retrieveCollections();
  }, []);

  // refresh Collections Library
  const refreshLibrary = () => {
    retrieveCollections();
    setCurrentCollection(null);
    setCurrentIndex(-1);
  };

  // catch current Collection
  const setActiveCollection = (collection, index) => {
    setCurrentCollection(collection);
    setCurrentIndex(index);
  };

  // get Input Values
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCollection({ ...collection, [name]: value });
  };
  const handleImageInput = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  // save Collection
  const handleCollection = () => {
    const imageRef = ref(FirebaseService.storage, `collections/${image.name}`);
    // save to storage
    uploadBytes(imageRef, image)
      .then(() => {
        console.log("Collection file uploaded to storage!");
        // retrieve from storage
        getDownloadURL(imageRef)
          .then((url) => {
            collection.imageURL = url;
            console.log("Collection file downloaded from storage!");
            setImage(null);
            let data = {
              artist: collection.artist,
              category: collection.category,
              description: collection.description,
              imageURL: collection.imageURL,
              title: collection.title,
              year: collection.year,
            };
            // save to database
            CollectionService.create(data)
              .then((res) => {
                setCollection({
                  id: res.data.id,
                  artist: res.data.artist,
                  category: res.data.category,
                  description: res.data.description,
                  imageURL: res.data.imageURL,
                  title: res.data.title,
                  year: res.data.year,
                });
                console.log("The new Collection:", res.data);
                setCollection(initialCollectionState);
              })
              .catch((err) => {
                console.log("Error while creating the new Collection:", err);
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
  // delete Collection File from storage
  const deleteImage = () => {
    const imageRef = ref(FirebaseService.storage, `collections/${image.name}`);
    deleteObject(imageRef)
      .then(() => {
        console.log("Collection file deleted successfully!");
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };
  */

  // delete all Collections from database
  const removeAllCollections = () => {
    CollectionService.removeAll()
      .then((res) => {
        console.log("All collections have been removed:", res.data);
        refreshLibrary();
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  // Render
  return (
    <div>
      <h5>COLLECTIONS LIBRARY</h5>

      <button className="btn btn-danger" onClick={removeAllCollections}>
        Remove All
      </button>

      <div className="grid-collections">
        <button
          type="button"
          className="btn btn-secondary maxh200"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          width="200"
        >
          +
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
                    value={collection.title}
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
                    value={collection.description}
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
                    value={collection.artist}
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
                    value={collection.year}
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
                    value={collection.category}
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
                  className="btn btn-success"
                  onClick={handleCollection}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        {collections.map((collection, index) => (
          <div
            className={index === currentIndex ? "active" : ""}
            onMouseOver={() => setActiveCollection(collection, index)}
            onMouseOut={() => setActiveCollection(null, -1)}
            onDoubleClick={() => navigate("..")}
            key={index}
          >
            <img
              src={collection.imageURL}
              alt={collection.title}
              className="maxh200"
            />
          </div>
        ))}
      </div>

      {currentCollection && (
        <div>
          <div>
            <label>
              <strong>Title:</strong>
            </label>{" "}
            {currentCollection.title}
          </div>
          <div>
            <label>
              <strong>Description:</strong>
            </label>{" "}
            {currentCollection.description}
          </div>
          <div>
            <label>
              <strong>Artist:</strong>
            </label>{" "}
            {currentCollection.artist}
          </div>
          <div>
            <label>
              <strong>Year:</strong>
            </label>{" "}
            {currentCollection.year}
          </div>
          <div>
            <label>
              <strong>Collection:</strong>
            </label>{" "}
            {currentCollection.category}
          </div>
        </div>
      )}
    </div>
  );
}

export default CollectionsLibrary;
