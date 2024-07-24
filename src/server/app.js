const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const ConnectDB = require("./../config/db-config");
const dotenv = require("dotenv").config();

//connexion avec mongoDB
ConnectDB();

// App middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());
app.use(morgan("dev"));

app.get("/home", (req, res) => {
  res.status(200).json("Welcome, your server is working well");
});

// App routes
app.use("/admin", require("./../routes/admin.routes"));

module.exports = app;
