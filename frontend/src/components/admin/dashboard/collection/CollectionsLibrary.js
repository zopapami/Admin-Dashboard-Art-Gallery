import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone-uploader";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
// Firebase
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
// CSS
import "react-dropzone-uploader/dist/styles.css";
import "../../../../assets/css/Collection.scss";
// Services
import FirebaseService from "../../../../services/firebase-service.js";
import CollectionService from "../../../../services/collection-service.js";
// Images
import Plus from "../../../../assets/img/plus-icon.png";

function CollectionsLibrary() {
  let navigate = useNavigate();
  let location = useLocation();
  const state = location.state;
  const initialCollectionState = {
    id: null,
    description: "",
    imageURL: "",
    title: ""
  };
  const [collection, setCollection] = useState(initialCollectionState);
  const [collections, setCollections] = useState([]);
  const [currentCollection, setCurrentCollection] = useState(initialCollectionState);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(false);
  //const [editCollection, setEditCollection] = useState(false);
  //const [message, setMessage] = useState("");

  // display all Collections
  useEffect(() => {
    retrieveCollections();
  }, []);

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

  // refresh Collections Library
  const refreshLibrary = () => {
    navigate("");
    retrieveCollections();
    setCollection(initialCollectionState);
    setCurrentCollection(initialCollectionState);
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
  const handleInputChangeCurrent = (e) => {
    const { name, value } = e.target;
    currentCollection[name] = value;
  };

  // save Collection
  const handleCollection = () => {
    setLoader(true);
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
              description: collection.description,
              imageURL: collection.imageURL,
              title: collection.title
            };
            // save to database
            CollectionService.create(data)
              .then((res) => {
                collection.id = res.data.id;
                console.log("The new Collection:", res.data);
                refreshLibrary();
              })
              .catch((err) => {
                console.log("Error while creating the new Collection:", err);
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
  // retrieve an Collection by id
  const getCollection = (id) => {
    CollectionService.get(id)
      .then((res) => {
        setCurrentCollection(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (id) getCollection(id);
  }, [id]);
  */

  // update an Collection by id
  const updateCollection = () => {
    currentCollection.id = state.id;
    currentCollection.imageURL = state.imageURL;
    CollectionService.update(currentCollection.id, currentCollection)
      .then((res) => {
        console.log(res.data);
        //setMessage("The Collection was updated successfully!");
        refreshLibrary();
      })
      .catch((err) => {
        console.log("Error while updating the Collection:", err);
      });
  };

  // delete an Collection by id
  const deleteCollection = () => {
    setLoader(true);
    currentCollection.id = state.id;
    currentCollection.imageURL = state.imageURL;
    const imageRef = ref(FirebaseService.storage, currentCollection.imageURL);
    deleteObject(imageRef)
      .then(() => {
        console.log("Collection file deleted successfully from storage!");
        CollectionService.remove(currentCollection.id)
          .then((res) => {
            console.log(res.data);
            refreshLibrary();
          })
          .catch((err) => {
            console.log("Error while deleting the Collection from database:", err);
          });
        setLoader(false);
      })
      .catch((err) => {
        console.log("Error while deleting the Collection from storage:", err);
      });
  };

  // delete all Collections from database
  const removeAllCollections = () => {
    setLoader(true);
    let i = 0;
    for (i in collections) {
      const imageRef = ref(FirebaseService.storage, collections[i].imageURL);
      deleteObject(imageRef)
        .then(() => {})
        .catch((err) => {
          console.log("Error while deleting the collections from storage:", err);
        });
    }
    CollectionService.removeAll()
      .then((res) => {
        console.log("All collections have been removed:", res.data);
        refreshLibrary();
      })
      .catch((err) => {
        console.log("Error while deleting the collections:", err);
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
        data-bs-target="#removeCModal"
      >
        Clear Library
      </button>
      {/*---------- Clear Library Modal ----------*/}
      <div
        className="modal fade"
        id="removeCModal"
        tabIndex="-1"
        aria-labelledby="removeCModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="removeCModalLabel">
                Delete Collections
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete all collections?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn button"
                data-bs-dismiss="modal"
                onClick={removeAllCollections}
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
      {/*---------- Grid of Collections ----------*/}
      <div className="grid-collections p-5">
        {/*---------- Add Collection ----------*/}
        <button
          type="button"
          className="btn button size-button-130"
          data-bs-toggle="modal"
          data-bs-target="#exampleCModal"
        >
          <img src={Plus} alt="plus-icon" width="50" />
        </button>
        {/*---------- Add Collection Modal ----------*/}
        <div
          className="modal fade"
          id="exampleCModal"
          tabIndex="-1"
          aria-labelledby="exampleCModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content bg-modal-content border-0">
              <div className="modal-header bg-modal-header border-0 shadow-sm">
                <h1 className="modal-title fs-5" id="exampleCModalLabel">
                  New Collection
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
                  <label htmlFor="imageURL">Collection</label>
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
                  onClick={handleCollection}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        {/*---------- Display Collections ----------*/}
        {collections.map((collection, index) => (
          <div
            id="collections"
            className={index === currentIndex ? "active" : ""}
            onMouseOver={() => setActiveCollection(collection, index)}
            onMouseOut={() => setActiveCollection(initialCollectionState, -1)}
            onClick={() => setActiveCollection(collection, index)}
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
                {/*---------- Image of Collection ----------*/}
                <img
                  src={collection.imageURL}
                  alt={collection.title}
                  className="h-collection"
                />
                {/*---------- Link to Edit Collection ----------*/}
                <Link to={collection.id} state={collection} >
                  <p
                    data-bs-toggle="modal"
                    data-bs-target="#editCModal"
                    data-bs-backdrop="static"
                  ></p>
                </Link>
                {/*---------- Details of Collection ----------*/}
                <span>
                  <div>
                    <label>Title:</label> {collection.title}
                  </div>
                  <div>
                    <label>Description:</label> {collection.description}
                  </div>
                  <br></br>
                  <div>
                    <h6>click to edit</h6>
                  </div>
                </span>
                {/*---------- Routing to Edit Collection Modal ----------*/}
                <Routes>
                  <Route
                    path={`:${collection.id}`}
                    element={
                      <div
                        className="modal fade"
                        id="editCModal"
                        tabIndex="-1"
                        aria-labelledby="editCModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-scrollable">
                          <div className="modal-content bg-modal-content border-0">
                            <div className="modal-header bg-modal-header border-0 shadow-sm">
                              <h1
                                className="modal-title fs-5"
                                id="editCModalLabel"
                              >
                                Edit Collection
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
                                  //placeholder={(state.title == null) ? state.title : "Title"}
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
                                  //placeholder={(state.description == null) ? state.description : "Description"}
                                  onChange={handleInputChangeCurrent}
                                  name="description"
                                />
                              </div>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn button"
                                data-bs-dismiss="modal"
                                onClick={updateCollection}
                              >
                                Save Changes
                              </button>
                              <button
                                type="button"
                                className="btn button"
                                data-bs-dismiss="modal"
                                onClick={deleteCollection}
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
};

export default CollectionsLibrary;
