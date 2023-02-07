module.exports = app => {
  let router = require("express").Router();
  const paintings = require("../controllers/painting-controller.js");

  // create a new Painting
  router.post("/", paintings.create);

  // retrieve a Painting by id
  router.get("/:id", paintings.findOne);

  // retrieve all Paintings
  router.get("/", paintings.findAll);

  // retrieve all Paintings in category (art collection)
  router.get("/:category", paintings.findAllInCategory);

  // retrieve all Paintings on Shop
  router.get("/shop", paintings.findAllOnShop);

  // update a Painting by id
  router.put("/:id", paintings.update);

  // delete a Painting by id
  router.delete("/:id", paintings.delete);

  // delete all Paintings
  router.delete("/", paintings.deleteAll);

  app.use("/", router);
};
