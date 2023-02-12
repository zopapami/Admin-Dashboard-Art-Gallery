const db = require("../models");
const Info = db.infos;

// retrieve Info
exports.findAll = (req, res) => {
  Info.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "500 Internal Server Error while retrieving info." }, err);
    });
};

// update Info (by id)
exports.update = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "400 Bad Request. Data to update cannot be empty!" });
    return;
  };
  // get id
  const id = process.env.ID_INFO;
  // update
  Info.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "404 Not Found. Cannot update Info." });
      } else {
        res.send({ message: "Info was updated successfully!" });
      };
    })
    .catch((err) => {
      res.status(500).send({ message: "500 Internal Server Error. Cannot update Info." }, err);
    });
};
