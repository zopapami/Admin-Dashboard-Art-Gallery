import http from "./http-service.js";

// create a new Artwork
const create = (data) => {
  return http.admin.post("/gallery/artworks", data);
};

// retrieve all Artworks
const getAll = () => {
  return http.admin.get("/gallery/artworks");
};

// retrieve a Artwork by id
const get = (id) => {
  return http.admin.get(`/gallery/artworks/${id}`);
};

// update a Artwork by id
const update = (id, data) => {
  return http.admin.put(`/gallery/artworks/${id}`, data);
};

// delete a Artwork by id
const remove = (id) => {
  return http.admin.delete(`/gallery/artworks/${id}`);
};

// delete all Artworks
const removeAll = () => {
  return http.admin.delete("/gallery/artworks");
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
