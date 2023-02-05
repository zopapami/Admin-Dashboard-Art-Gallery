const dbConfig = require("../config/database.js");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.paintings = require("./painting-model.js")(mongoose);

module.exports = db;