import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Services
import ArtworkService from "../../../../services/artwork-service.js";

function Artwork(props) {
  
  const { id } = useParams();
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
  const [currentArtwork, setCurrentArtwork] = useState(initialArtworkState);
  const [message, setMessage] = useState("");

  const getArtwork = (id) => {
    ArtworkService.get(id)
      .then((response) => {
        setCurrentArtwork(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (id) getArtwork(id);
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentArtwork({ ...currentArtwork, [name]: value });
  };

  const updateArtwork = () => {
    ArtworkService.update(currentArtwork.id, currentArtwork)
      .then((response) => {
        console.log(response.data);
        setMessage("The Artwork was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteArtwork = () => {
    ArtworkService.remove(currentArtwork.id)
      .then((response) => {
        console.log(response.data);
        navigate("..");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentArtwork && (
        <div>
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

          <button className="btn button mr-2" onClick={deleteArtwork}>
            Delete
          </button>

          <button
            type="submit"
            className="btn button"
            onClick={updateArtwork}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default Artwork;
