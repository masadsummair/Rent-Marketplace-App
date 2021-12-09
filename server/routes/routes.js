const express = require("express");

const multer = require('multer');
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({storage}).single('image');

const { signup, login, isAuth } = require("../controllers/auth.js");

const  { Area,Search,Category }  = require("../controllers/search.js");

const  { getImage,saveImage }  = require("../controllers/image.js");

const { initiateContract,viewContract,startContract,endContract,rating }= require("../controllers/contract.js");

const {
  viewItem,
  addItem,
  updateItem,
  deleteItem,
} = require("../controllers/item.js");

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/additem", addItem);

router.delete("/deleteitem", deleteItem);

router.put("/updateitem", updateItem);

router.get("/viewitem", viewItem);

router.get("/search", Search);

router.get("/category",Category);

router.get("/area",Area);

router.get("/images",getImage)

router.post("/images",upload,saveImage)

router.post("/contract/start",initiateContract)

router.get("/contract/view",viewContract)

router.put("/contract/accept",startContract)

router.put("/contract/end",endContract)

router.post("/contract/rating",rating)

router.get("/private", isAuth);

module.exports = router;
