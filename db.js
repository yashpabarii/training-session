var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "demo-app",
});

// Connecting to database
connection.connect(function (err) {
  if (err) {
    console.log("Error in the connection");
    console.log(err);
  } else {
    console.log(`Database Connected`);
    connection.query(`SHOW DATABASES`, function (err, result) {
      if (err) console.log(`Error executing the query - ${err}`);
    });
  }
});
module.exports = connection;
