import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
// Services
import ArtworkService from "../../../services/artwork-service.js";

function Artwork() { //props
  const { id } = useParams();
  let navigate = useNavigate();

  const initialArtworkState = {
    id: null,
    artist: "",
    category: "", //collection
    description: "",
    imageURL: "",
    title: "",
    year: ""
  };
  const [currentArtwork, setCurrentArtwork] = useState(initialArtworkState);
  const [message, setMessage] = useState("");

  const getArtwork = id => {
    ArtworkService.get(id)
      .then(response => {
        setCurrentArtwork(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id)
      getArtwork(id);
  }, [id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentArtwork({ ...currentArtwork, [name]: value });
  };

  const updateArtwork = () => {
    ArtworkService.update(currentArtwork.id, currentArtwork)
      .then(response => {
        console.log(response.data);
        setMessage("The Artwork was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteArtwork = () => {
    ArtworkService.remove(currentArtwork.id)
      .then(response => {
        console.log(response.data);
        navigate("/artworks");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentArtwork ? (
        <div className="edit-form">
          <h4>Artwork</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentArtwork.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentArtwork.description}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteArtwork}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateArtwork}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Artwork...</p>
        </div>
      )}
    </div>
  );
};

export default Artwork;
