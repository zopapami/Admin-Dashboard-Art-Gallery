const db = require("../models");
const Artwork = db.artworks;

// create a new Artwork
exports.create = (req, res) => {
  // validate request
  if (!req.body.title) {
    res.status(400).send({ message: "400 Bad Request. Title cannot be empty!" });
    return;
  };
  // create
  const artwork = new Artwork({
    artist: req.body.artist,
    category: req.body.category, //collection
    description: req.body.description,
    imageURL: req.body.imageURL,
    title: req.body.title,
    year: req.body.year
  });
  // save in database
  artwork
    .save(artwork)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "500 Internal Server Error. Some error occurred while creating the Artwork." }, err);
    });
};

// retrieve all Artworks
exports.findAll = (req, res) => {
  Artwork.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "500 Internal Server Error while retrieving all artwork." }, err);
    });
};


// retrieve a Artwork by id
exports.findOne = (req, res) => {
  // get id
  const id = req.params.id;
  // find by id
  Artwork.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `404 Not Found Artwork with id: ${id}.` });
      } else {
        res.send(data);
      };
    })
    .catch((err) => {
      res.status(500).send({ message: `500 Internal Server Error while retrieving Artwork with id: ${id}.` }, err);
    });
};

// update a Artwork by id
exports.update = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "400 Bad Request. Data to update cannot be empty!" });
    return;
  };
  // get id
  const id = req.params.id;
  // update
  Artwork.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `404 Not Found. Cannot update Artwork with id: ${id}.` });
      } else {
        res.send({ message: "Artwork was updated successfully!" });
      };
    })
    .catch((err) => {
      res.status(500).send({ message: `500 Internal Server Error. Cannot update Artwork with id: ${id}.` }, err);
    });
};

// delete a Artwork by id
exports.delete = (req, res) => {
  // get id
  const id = req.params.id;
  // delete
  Artwork.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `404 Not Found. Cannot delete Artwork with id: ${id}.` });
      } else {
        res.send({ message: "Artwork was deleted successfully!" });
      };
    })
    .catch((err) => {
      res.status(500).send({ message: `500 Internal Server Error. Cannot delete Artwork with id: ${id}.` }, err);
    });
};

// delete all Artworks
exports.deleteAll = (req, res) => {
  Artwork.deleteMany({})
  .then((data) => {
    res.send({ message: `${data.deletedCount} artworks were deleted successfully!` });
  })
  .catch((err) => {
    res.status(500).send({ message: "500 Internal Server Error while deleting all artworks." }, err);
  });
};
