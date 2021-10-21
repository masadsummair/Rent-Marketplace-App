
const express = require('express');
const app = express();
const port = 3000;
var db = require('./utils/database.js');


db.connect(function(err) {
  db.query("select * from testnode;" , function(err,result,fields)
  {
    setValue(result);
  });
});

console.log(data);
function setValue(res)
{
  data=Object.values(JSON.parse(JSON.stringify(res)));
}


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});