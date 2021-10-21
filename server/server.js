
const express = require('express');
const app = express();
const port = 3000;
var db = require('./utils/database.js');

db.connect(function(err, connection) {
  let res=db.query("drop DATABASE nodetest");
  // console.log(res);
});



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});