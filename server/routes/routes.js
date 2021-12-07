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

router.post("/deleteitem", deleteItem);

router.post("/updateitem", updateItem);

router.get("/viewitem", viewItem);

router.get("/private", isAuth);

router.get("/search", Search);

router.get("/category",Category);

router.get("/area",Area);

router.get("/images",getImage)

router.post("/images",upload,saveImage)

router.get("/public", (req, res, next) => {
  res.status(200).json({ message: "here is your public resoures" });
});

module.exports = router;
