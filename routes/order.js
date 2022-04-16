const e = require("express");
const express = require("express");
const router = express.Router();
const dbConn = require("./../db");

router.get("/", function (req, res, next) {
  dbConn.query("SELECT * FROM order ", function (err, rows) {
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
    "SELECT * FROM order WHERE id = ?",
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
    order_item_id: req.body.order_item_id,
    user_id: req.body.user_id,
    total_amount: req.body.total_amount,
  };

  let sqlQuery = "INSERT INTO order SET ?";

  dbConn.query(sqlQuery, data, (err, results) => {
    if (err) {
      throw err;
    } else {
      results.message = "Order added succssfully!";
      res.send({ message: results.message, data: results });
    }
  });
});

router.put("/update/:id", (req, res, next) => {
  dbConn.query(
    `UPDATE order SET order_item_id = ?, user_id = ?, total_amount = ?   Where id = ${req.params.id}`,
    [req.body.order_item_id, req.body.user_id, req.body.total_amount],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        result.message = "Order updated succssfully!";
        res.send({ data: result });
      }
    }
  );
});

router.delete("/delete/:id", (req, res) => {
  dbConn.query(
    "DELETE FROM order WHERE id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.send("Order deleted successfully.");
      } else {
        console.log(err);
      }
    }
  );
});

// View Order Status Details

router.get("/status/:status", (req, res) => {
  console.log(res);
  dbConn.query(
    "SELECT * FROM order WHERE status = ?",
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

module.exports = router;
