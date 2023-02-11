module.exports = app => {
  const router = require("express").Router();
  const collections = require("../controllers/collection-controller.js");

  // create a new Collection
  router.post("/", collections.create);

  // retrieve all Collections
  router.get("/", collections.findAll);

  // retrieve a Collection by id
  router.get("/:id", collections.findOne);

  // update a Collection by id
  router.put("/:id", collections.update);

  // delete a Collection by id
  router.delete("/:id", collections.delete);

  // delete all Collections
  router.delete("/", collections.deleteAll);

  app.use("/gallery/collections", router);
};
