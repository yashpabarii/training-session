const e = require("express");
const express = require("express");
const router = express.Router();
const dbConn = require("./db");

router.get("/", function (req, res, next) {
  dbConn.query("SELECT * FROM books ORDER BY id desc", function (err, rows) {
    if (err) {
      req.flash("error", err);
      res.json({ error: err });
    } else {
      res.json({ data: rows, message: "Successfully" });
    }
  });
});

router.get("/:id", (req, res) => {
  dbConn.query(
    "SELECT * FROM books WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

router.get("/status/:status", (req, res) => {
  console.log(res);
  dbConn.query(
    "SELECT * FROM books WHERE status = ?",
    [req.params.status],
    (err, rows, fields) => {
      if (!err) {
        res.send({ data: rows });
      } else {
        console.log(err);
      }
    }
  );
});

router.get("/date/:date", (req, res) => {
  console.log(req.params.date);
  dbConn.query(
    `SELECT * FROM books WHERE DATE(published_date) < DATE('${req.params.date}');`,

    (err, rows, fields) => {
      if (!err) {
        res.send({ data: rows });
      } else {
        console.log(err);
      }
    }
  );
});

router.get("/author/:author", (req, res) => {
  console.log(req.params.date);
  dbConn.query(
    `SELECT * FROM books WHERE author = ?`,
    [req.params.author],
    (err, rows, fields) => {
      if (!err) {
        res.send({ data: rows });
      } else {
        console.log(err);
      }
    }
  );
});

router.get("/category/:categoryname", (req, res) => {
  dbConn.query(
    `SELECT * FROM books WHERE category Like '%${req.params.categoryname}%'`,
    (err, rows, fields) => {
      if (!err) {
        res.send({ data: rows });
      } else {
        console.log(err);
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

router.post("/add", (req, res) => {
  let data = {
    name: req.body.name,
    author: req.body.author,
    status: 1,
    category: req.body.category,
    published_date: new Date(),
  };

  let sqlQuery = "INSERT INTO books SET ?";

  dbConn.query(sqlQuery, data, (err, results) => {
    if (err) {
      throw err;
    } else {
      results.message = "Book added succssfully!";
      res.send({ data: results });
    }
  });
});

router.put("/update/:id", (req, res, next) => {
  dbConn.query(
    `UPDATE books SET name = ?, author = ?, category = ?   Where id = ${req.params.id}`,
    [req.body.name, req.body.author, req.body.category],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        result.message = "Book updated succssfully!";
        res.send({ data: result });
      }
    }
  );
});

module.exports = router;
