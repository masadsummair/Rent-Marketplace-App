const express = require("express");

const multer = require("multer");
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./images");
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage }).single("image");

const { signup, login, isAuth ,getUserProfile ,updateUserProfile} = require("../controllers/auth.js");

const { Area, Search, Category } = require("../controllers/search.js");

const { getImage, saveImage, deleteImage, updateImage } = require("../controllers/image.js");

const {
  initiateContract,
  viewContract,
  startContract,
  rejectContract,
  retrunItem,
  endContract,
  rating,
  getUserRating
} = require("../controllers/contract.js");

const {
  viewItem,
  addItem,
  updateItem,
  deleteItem,
} = require("../controllers/item.js");

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.get("/getuser", getUserProfile);

router.put("/updateuser", updateUserProfile);

router.post("/additem", addItem);

router.delete("/deleteitem", deleteItem);

router.put("/updateitem", updateItem);

router.get("/viewitem", viewItem);

router.get("/search", Search);

router.get("/category", Category);

router.get("/area", Area);

router.get("/images", getImage);

router.post("/images", upload, saveImage);

router.put('/images',upload,updateImage);

router.delete('/images',deleteImage);

router.post("/contract/start", initiateContract);

router.get("/contract/view", viewContract);

router.put("/contract/accept", startContract);

router.put("/contract/reject", rejectContract);

router.put("/contract/returnitem", retrunItem);

router.put("/contract/end", endContract);

router.post("/contract/rating", rating);

router.get("/contract/getrating", getUserRating);

router.get("/private", isAuth);

router.get("/private", getUserProfile);

module.exports = router;
