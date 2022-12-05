// runs server on localhost:4000

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Course = require("./models/Course");

// express app
const app = express();

// connect to mongodb (need a database)
const dbURI = "";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(4000))
    .catch((err) => console.log(err));

//middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes

// course routes
