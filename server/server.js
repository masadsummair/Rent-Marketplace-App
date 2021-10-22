const express = require('express');
const {json , urlencoded} = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const port = 3000;
//db not setup yet

// var db = require('./utils/database.js');
// db.connect(function(err) {
//   db.query("select * from testnode;" , function(err,result,fields)
//   {
//     setValue(result);
//   });
// });
// function setValue(res)
// {
//   data=Object.values(JSON.parse(JSON.stringify(res)));
// }

//middleware
app.use(cors()); //making cross-domain requests possible  
app.use(json());// tells the system that you want json to be used. 
app.use(urlencoded({extended:true}));//allow us to attach parameters to a url like(?) etc
app.use(morgan('dev'));//it does all the loging for us (run server by using "yarn dev" for "dev" detail got package.json scripts)

//routing
app.post('/', (req, res) => {
  console.log(req.body);
  res.send({'message':'ok'});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});