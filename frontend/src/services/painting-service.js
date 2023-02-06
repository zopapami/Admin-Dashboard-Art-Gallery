import http from "./http-service.js";

  // create a painting
  const create = (data) => {
    return http.post("/paintings", data);
  };

  // retrieve a painting by id
  const get = (id) => {
    return http.get(`/paintings/${id}`);
  };

  // retrieve all paintings
  const getAll = () => {
    return http.get("/paintings");
  };

  // retrieve all paintings on Shop
  const getAllOnShop = () => {
    return http.get("/paintings");
  };

  // update a painting by id
  const update = (id, data) => {
    return http.put(`/paintings/${id}`, data);
  };

  // delete a painting by id
  const remove = (id) => {
    return http.delete(`/paintings/${id}`);
  };

  // delete all paintings
  const removeAll = () => {
    return http.delete(`/paintings`);
  };

const PaintingService = {
  create,
  get,
  getAll,
  getAllOnShop,
  update,
  remove,
  removeAll
};

export default PaintingService;