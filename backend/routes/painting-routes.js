module.exports = app => {
  let router = require("express").Router();
  const paintings = require("../controllers/painting-controller.js");

  // create a painting
  router.post("/", paintings.create);

  // retrieve a painting by id
  router.get("/:id", paintings.findOne);

  // retrieve all paintings
  router.get("/", paintings.findAll);

  // retrieve all paintings on Shop
  router.get("/onshop", paintings.findAllOnShop);

  // Update a painting by id
  router.put("/:id", paintings.update);

  // Delete a painting by id
  router.delete("/:id", paintings.delete);

  // Delete all paintings
  router.delete("/", paintings.deleteAll);

  app.use("/paintings", router);
};
