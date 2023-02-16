module.exports = app => {
  const router = require("express").Router();
  const info = require("../controllers/info-controller.js");

  // retrieve Info
  router.get("/", info.findAll);

  // update Info
  router.put("/", info.update);

  app.use("/admin/dashboard/info", router);
};
