const e = require("express");
const express = require("express");
const router = express.Router();
const dbConn = require("./../db");

router.get("/", function (req, res, next) {
  dbConn.query("SELECT * FROM item ", function (err, rows) {
    if (err) {
      req.flash("error", err);
      res.json({ error: err });
    } else {
      console.log("rows");
      res.json({ message: "Successfully", data: rows });
    }
  });
});

router.get("/:id", (req, res) => {
  dbConn.query(
    "SELECT * FROM item WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.json({ message: "Successfully", data: rows });
      } else {
        console.log(err);
      }
    }
  );
});

router.post("/add", (req, res) => {
  let data = {
    name: req.body.name,
    author: req.body.description,
    is_available: 1,
    price: req.body.price,
    published_date: new Date(),
  };

  let sqlQuery = "INSERT INTO item SET ?";

  dbConn.query(sqlQuery, data, (err, results) => {
    if (err) {
      throw err;
    } else {
      results.message = "Item added succssfully!";
      res.send({ message: results.message, data: results });
    }
  });
});

router.put("/update/:id", (req, res, next) => {
  dbConn.query(
    `UPDATE item SET name = ?, description = ?, price = ?   Where id = ${req.params.id}`,
    [req.body.name, req.body.description, req.body.price],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        result.message = "Item updated succssfully!";
        res.send({ data: result });
      }
    }
  );
});

router.delete("/delete/:id", (req, res) => {
  dbConn.query(
    "DELETE FROM books WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.send("Books Record deleted successfully.");
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
