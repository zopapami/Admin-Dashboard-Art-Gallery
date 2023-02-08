const db = require("../models");
const Painting = db.paintings;

// create a new Painting
exports.create = (req, res) => {
  // validate request
  if (!req.body.title) {
    res.status(400).send({ message: "400 Bad Request. Content cannot be empty!" });
    return;
  };
  // create
  const painting = new Painting({
    category: req.body.category,
    creator: req.body.creator,
    description: req.body.description,
    onShop: req.body.onShop ? req.body.onShop : false,
    title: req.body.title,
    year: req.body.year
  });
  // save in database
  painting
    .save(painting)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "500 Internal Server Error. Some error occurred while creating the Painting." }, err);
    });
};

// retrieve all Paintings
exports.findAll = (req, res) => {
  Painting.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "500 Internal Server Error while retrieving all paintings." }, err);
    });
};

// retrieve a Painting by id
exports.findOne = (req, res) => {
  // get id
  const id = req.params.id;
  // find by id
  Painting.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `404 Not Found Painting with id: ${id}.` });
      } else {
        res.send(data);
      };
    })
    .catch((err) => {
      res.status(500).send({ message: `500 Internal Server Error while retrieving Painting with id: ${id}.` }, err);
    });
};

// update a Painting by id
exports.update = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "400 Bad Request. Data to update cannot be empty!" });
    return;
  };
  // get id
  const id = req.params.id;
  // update
  Painting.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `404 Not Found. Cannot update Painting with id: ${id}.` });
      } else {
        res.send({ message: "Painting was updated successfully!" });
      };
    })
    .catch((err) => {
      res.status(500).send({ message: `500 Internal Server Error. Cannot update Painting with id: ${id}.` }, err);
    });
};

// delete a Painting by id
exports.delete = (req, res) => {
  // get id
  const id = req.params.id;
  // delete
  Painting.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `404 Not Found. Cannot delete Painting with id: ${id}.` });
      } else {
        res.send({ message: "Painting was deleted successfully!" });
      };
    })
    .catch((err) => {
      res.status(500).send({ message: `500 Internal Server Error. Cannot delete Painting with id: ${id}.` }, err);
    });
};

// delete all Paintings
exports.deleteAll = (req, res) => {
  Painting.deleteMany({})
  .then((data) => {
    res.send({ message: `${data.deletedCount} paintings were deleted successfully!` });
  })
  .catch((err) => {
    res.status(500).send({ message: "500 Internal Server Error while deleting all paintings." }, err);
  });
};
