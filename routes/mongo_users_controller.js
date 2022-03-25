//Import the dependencies
const express = require("express");
const mongoose = require("mongoose");

//Creating a Router
var router = express.Router();

//Link
const User = mongoose.model("User");

//Router Controller for READ request
router.get("/", (req, res) => {
  console.log(res, req);
});

module.exports = router;
