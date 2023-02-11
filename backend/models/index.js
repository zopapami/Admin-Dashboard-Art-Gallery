const dbConfig = require("../config/database.js");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.artworks = require("./artwork-model.js")(mongoose);
db.collections = require("./collection-model.js")(mongoose);

module.exports = db;
