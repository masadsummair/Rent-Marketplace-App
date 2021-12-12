const conn = require("../config/database.js");
var path = require("path");
const fs = require("fs");

const getImage = (req, res, next) => {
  if (
    fs.existsSync(path.join(__dirname, "../") + "/images/" + req.query.path)
  ) {
    res.sendFile(path.join(__dirname, "../") + "/images/" + req.query.path);
  } else {
    res.sendFile(path.join(__dirname, "../") + "/images/notfound.png");
  }
};
const saveImage = (req, res, next) => {
  res.status(200).json({ message: "image" });
};

const deleteImage = (req, res, next) => 
{
    let data=req.body;
    console.log('file recevied');
    try {
      console.log(path.join(__dirname, "../") + "images/" +data.image_name);
      fs.unlinkSync(path.join(__dirname, "../") + "images/" +data.image_name);
      res.status(200).json({ message: "delete image" });
    } catch (error) {
      res.status(400).send(error);
    }
}

const updateImage= (req, res, next) =>
{
  let data=req.body;
  console.log('file recevied');
  try {
    fs.unlinkSync(path.join(__dirname, "../") + "images/" +data.image_name);
    res.status(200).json({ message: "delete image" });
  } catch (error) {
    res.status(400).send(error);
  }
}
module.exports = { getImage, saveImage,deleteImage,updateImage };
