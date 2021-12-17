const express = require("express");
const router = require("./routes/routes.js");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const port = 8000;

//middleware
app.use(cors()); //making cross-domain requests possible
app.use(json()); // tells the system that you want json to be used.
app.use(urlencoded({ extended: true })); //allow us to attach parameters to a url like(?) etc
app.use(morgan("dev")); //it does all the loging for us (run server by using "yarn dev" )("dev"->for details goto package.json scripts)
app.use(router);
app.use(express.static("public"));
app.use("/images", express.static("images"));

// for localhost
// app.listen(port, () => {
//   console.log(`App listening at :http://localhost:${port}`);
// });

//open cmd and type ipconfig and copy ipv4 and
//           paste to I
//                    I
//                    V         and paste in client/config/API_URL.js  IP(variable)
app.listen(port, "192.168.233.216", () => {
  console.log(`App listening at http://192.168.233.216:${port}`);
});
