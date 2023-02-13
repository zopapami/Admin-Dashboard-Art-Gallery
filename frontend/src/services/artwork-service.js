import http from "./http-service.js";

// create a new Artwork
const create = (data) => {
  return http.post("/gallery/artworks", data);
};

// retrieve all Artworks
const getAll = () => {
  return http.get("/gallery/artworks");
};

// retrieve a Artwork by id
const get = (id) => {
  return http.get(`/gallery/artworks/${id}`);
};

// update a Artwork by id
const update = (id, data) => {
  return http.put(`/gallery/artworks/${id}`, data);
};

// delete a Artwork by id
const remove = (id) => {
  return http.delete(`/gallery/artworks/${id}`);
};

// delete all Artworks
const removeAll = () => {
  return http.delete("/gallery/artworks");
};

const ArtworkService = {
  create,
  get,
  getAll,
  update,
  remove,
  removeAll
};

export default ArtworkService;
