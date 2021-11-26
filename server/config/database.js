const mysql = require("mysql");
const config = {
  host: "localhost",
  user: "root",
  password: "",
  database: "dbproject",
};
const db = mysql.createConnection(config);

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("my sql connected");
});
module.exports = db;
