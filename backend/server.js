// SERVER

// express
const express = require("express");
const app = express();

// body parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cors
const cors = require("cors");
let corsOptions = { origin: "http://localhost:9091" };
app.use(cors(corsOptions));

// dotenv
require("dotenv").config();

// database
const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple message
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

// set port
const port = process.env.SERVER_PORT;
// listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}...`);
});
