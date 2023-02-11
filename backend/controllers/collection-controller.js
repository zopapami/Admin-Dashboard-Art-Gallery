const db = require("../models");
const Collection = db.collections;

// create a new Collection
exports.create = (req, res) => {
  // validate request
  if (!req.body.title) {
    res.status(400).send({ message: "400 Bad Request. Content cannot be empty!" });
    return;
  };
  // create
  const collection = new Collection({
    description: req.body.description,
    imageURL: req.body.imageURL,
    title: req.body.title
  });
  // save in database
  collection
    .save(collection)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "500 Internal Server Error. Some error occurred while creating the Collection." }, err);
    });
};

// retrieve all Collections
exports.findAll = (req, res) => {
  Collection.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "500 Internal Server Error while retrieving all collections." }, err);
    });
};

// retrieve a Collection by id
exports.findOne = (req, res) => {
  // get id
  const id = req.params.id;
  // find by id
  Collection.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `404 Not Found Collection with id: ${id}.` });
      } else {
        res.send(data);
      };
    })
    .catch((err) => {
      res.status(500).send({ message: `500 Internal Server Error while retrieving Collection with id: ${id}.` }, err);
    });
};

// update a Collection by id
exports.update = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "400 Bad Request. Data to update cannot be empty!" });
    return;
  };
  // get id
  const id = req.params.id;
  // update
  Collection.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `404 Not Found. Cannot update Collection with id: ${id}.` });
      } else {
        res.send({ message: "Collection was updated successfully!" });
      };
    })
    .catch((err) => {
      res.status(500).send({ message: `500 Internal Server Error. Cannot update Collection with id: ${id}.` }, err);
    });
};

// delete a Collection by id
exports.delete = (req, res) => {
  // get id
  const id = req.params.id;
  // delete
  Collection.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `404 Not Found. Cannot delete Collection with id: ${id}.` });
      } else {
        res.send({ message: "Collection was deleted successfully!" });
      };
    })
    .catch((err) => {
      res.status(500).send({ message: `500 Internal Server Error. Cannot delete Collection with id: ${id}.` }, err);
    });
};

// delete all Collections
exports.deleteAll = (req, res) => {
  Collection.deleteMany({})
  .then((data) => {
    res.send({ message: `${data.deletedCount} collections were deleted successfully!` });
  })
  .catch((err) => {
    res.status(500).send({ message: "500 Internal Server Error while deleting all collections." }, err);
  });
};
