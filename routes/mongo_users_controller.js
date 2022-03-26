//Import the dependencies
const express = require("express");
const mongoose = require("mongoose");

//Creating a Router
var router = express.Router();

//Link
var UserModel = require("../models/mongo_user.model");

//Router Controller for READ request
router.get("/", (req, res) => {
  console.log(res, req);
});

router.post("/save", (req, res) => {
  var newUser = new UserModel();
  newUser.first_name = req.body.first_name;
  newUser.last_name = req.body.last_name;
  newUser.email = req.body.email;
  newUser.phone_number = req.body.phone_number;
  newUser.address = req.body.address;
  newUser.role_id = req.body.role_id;
  newUser.password = req.body.password;
  newUser.gender = req.body.gender;
  newUser.is_active = 1;

  newUser.save((err, data) => {
    if (err) {
      console.log(error);
    } else {
      res.send({ data: data });
    }
  });
});

router.get("/findall", (req, res) => {
  UserModel.find((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ data: data });
    }
  });
});

router.get("/findbyid/:id", (req, res) => {
  console.log(req.params.id);
  // return;
  UserModel.findOne({ UserId: req.params.id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ data: data });
    }
  });
});

router.delete("/delete/:id", (req, res) => {
  console.log(req.params.id);
  UserModel.findByIdAndDelete({ UserId: req.params.id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ data: data });
    }
  });
});

module.exports = router;
