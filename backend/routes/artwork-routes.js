module.exports = app => {
  const router = require("express").Router();
  const artworks = require("../controllers/artwork-controller.js");

  // create a new Artwork
  router.post("/", artworks.create);

  // retrieve all Artworks
  router.get("/", artworks.findAll);

  // retrieve a Artwork by id
  router.get("/:id", artworks.findOne);

  // update a Artwork by id
  router.put("/:id", artworks.update);

  // delete a Artwork by id
  router.delete("/:id", artworks.delete);

  // delete all Artworks
  router.delete("/", artworks.deleteAll);

  app.use("/gallery/artworks", router);
};
