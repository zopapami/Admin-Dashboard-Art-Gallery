import http from "./http-service.js";

  // create a new Artwork
  const create = (data) => {
    return http.post("/artworks", data);
  };

  // retrieve a Artwork by id
  const get = (id) => {
    return http.get(`/artworks/${id}`);
  };

  // retrieve all Artworks
  const getAll = () => {
    return http.get("/artworks");
  };

  // update a Artwork by id
  const update = (id, data) => {
    return http.put(`/artworks/${id}`, data);
  };

  // delete a Artwork by id
  const remove = (id) => {
    return http.delete(`/artworks/${id}`);
  };

  // delete all Artworks
  const removeAll = () => {
    return http.delete("/artworks");
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
