const express = require("express");
const router = express.Router();
const dbConn = require("./db");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ypabari10@gmail.com",
    pass: "pqujhrqqcnbcjhcb",
  },
});

// point to the template folder
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views/"),
};

// use a template file with nodemailer
transporter.use("compile", hbs(handlebarOptions));

var mailOptions = {
  from: '"ypabari10@gmail.com" <ypabari10@gmail.com>', // sender address
  to: "", // list of receivers
  subject: "Welcome!",
  template: "email", // the name of the template file i.e email.handlebars
  context: {
    name: "", // replace {{name}} with Adebola
  },
};

router.get("/author", (req, res) => {
  res.send({ data: "works" });
  console.log({ data: "works" });
});

router.post("/user/register", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    console.log(err);
    console.log(hash);
    req.body.password = hash;
    // Store hash in your password DB.
  });

  let data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    address: req.body.address,
    role_id: req.body.role_id,

    password: bcrypt
      .hash(myPlaintextPassword, saltRounds)
      .then(function (hash) {
        // Store hash in your password DB.
        password = hash;
      }),
    gender: req.body.gender,
    is_active: 1,
    // published_date: new Date(),
  };

  console.log(data);

  let sqlQuery = "INSERT INTO user SET ?";

  // dbConn.query(sqlQuery, data, (err, results) => {
  //   if (err) {
  //     console.log(err);
  //     throw err;
  //   } else {
  //     mailOptions.to = req.body.email;
  //     mailOptions.context.name = req.body.first_name + req.body.last_name;

  //     transporter.sendMail(mailOptions, function (error, info) {
  //       if (error) {
  //         return console.log(error);
  //       }
  //       console.log("Message sent: " + info.response);
  //     });
  //     results.message = "User added succssfully!";
  //     res.send({ data: results });
  //   }
  // });
});

module.exports = router;
