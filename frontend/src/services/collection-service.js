import http from "./http-service.js";

// create a new Collection
const create = (data) => {
  return http.post("/gallery/collections", data);
};

// retrieve all Collections
const getAll = () => {
  return http.get("/gallery/collections");
};

// retrieve a Collection by id
const get = (id) => {
  return http.get(`/gallery/collections/${id}`);
};

// update a Collection by id
const update = (id, data) => {
  return http.put(`/gallery/collections/${id}`, data);
};

// delete a Collection by id
const remove = (id) => {
  return http.delete(`/gallery/collections/${id}`);
};

// delete all Collections
const removeAll = () => {
  return http.delete("/gallery/collections");
};

const CollectionService = {
  create,
  get,
  getAll,
  update,
  remove,
  removeAll
};

export default CollectionService;
