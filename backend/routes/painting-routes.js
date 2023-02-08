module.exports = app => {
  const router = require("express").Router();
  const paintings = require("../controllers/painting-controller.js");

  /* ---------- Admin Content ---------------------------------------- */
  // create a new Painting
  router.post("/", paintings.create);

  // retrieve all Paintings
  router.get("/", paintings.findAll);

  // retrieve a Painting by id
  router.get("/:id", paintings.findOne);

  // update a Painting by id
  router.put("/:id", paintings.update);

  // delete a Painting by id
  router.delete("/:id", paintings.delete);

  // delete all Paintings
  router.delete("/", paintings.deleteAll);

  app.use("/tcgallery/admin/paintings", router);
};
