import React, { useState } from "react";
import ArtworkService from "../../../services/artwork-service.js";

const AddArtwork = () => {
  const initialArtworkState = {
    id: null,
    artist: "",
    category: "", //collection
    description: "",
    imageURL: "",
    title: "",
    year: null
  };
  const [artwork, setArtwork] = useState(initialArtworkState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setArtwork({ ...artwork, [name]: value });
  };

  const saveArtwork = () => {
    var data = {
      artist: artwork.artist,
      category: artwork.category,
      description: artwork.description,
      imageURL: artwork.imageURL,
      title: artwork.title,
      year: artwork.year
    };

    ArtworkService.create(data)
      .then(response => {
        setArtwork({
          id: response.data.id,
          artist: response.data.artist,
          category: response.data.category,
          description: response.data.description,
          imageURL: response.data.imageURL,
          title: response.data.title,
          year: response.data.year
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newArtwork = () => {
    setArtwork(initialArtworkState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>Artwork submitted successfully!</h4>
          <button className="btn btn-success" onClick={newArtwork}>
            Add
          </button>
        </div>
      ) : (
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

          <button onClick={saveArtwork} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddArtwork;
