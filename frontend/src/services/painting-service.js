import http from "./http-service.js";

  // create a new Painting
  const create = (data) => {
    return http.post("/paintings", data);
  };

  // retrieve a Painting by id
  const get = (id) => {
    return http.get(`/paintings/${id}`);
  };

  // retrieve all Paintings
  const getAll = () => {
    return http.get("/paintings");
  };

  // update a Painting by id
  const update = (id, data) => {
    return http.put(`/paintings/${id}`, data);
  };

  // delete a Painting by id
  const remove = (id) => {
    return http.delete(`/paintings/${id}`);
  };

  // delete all Paintings
  const removeAll = () => {
    return http.delete("/paintings");
  };

const PaintingService = {
  create,
  get,
  getAll,
  update,
  remove,
  removeAll
};

export default PaintingService;