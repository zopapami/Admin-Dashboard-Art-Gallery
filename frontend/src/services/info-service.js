import http from "./http-service.js";

// retrieve Info
const getAll = () => {
  return http.admin.get("/info");
};

// update Info (by id)
const update = (data) => {
  return http.admin.put("/info", data);
};

const InfoService = {
  getAll,
  update
};

export default InfoService;
