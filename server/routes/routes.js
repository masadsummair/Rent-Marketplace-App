const express = require("express");

const { signup, login, isAuth } = require("../controllers/auth.js");

const  { Area,Search,Category }  = require("../controllers/search.js");

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

router.get("/public", (req, res, next) => {
  res.status(200).json({ message: "here is your public resoures" });
});

module.exports = router;
