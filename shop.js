const express = require("express");
const router = express.Router();
const dbConn = require("./db");

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

router.post("/user/register", (req, res) => {
  let data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    address: req.body.address,
    role_id: req.body.role_id,
    password: req.body.password,
    gender: req.body.gender,
    is_active: 1,
    // published_date: new Date(),
  };

  let sqlQuery = "INSERT INTO user SET ?";

  dbConn.query(sqlQuery, data, (err, results) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      mailOptions.to = req.body.email;
      mailOptions.context.name = req.body.first_name + req.body.last_name;

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: " + info.response);
      });
      results.message = "User added succssfully!";
      res.send({ data: results });
    }
  });
});

module.exports = router;
