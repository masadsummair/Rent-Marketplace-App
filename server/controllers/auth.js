const conn = require("../config/database.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {};

const signup = async (req, res, next) => {
  const data = req.body;

  try {
    let [result1] = await conn.execute("SELECT * FROM user WHERE email = ?", [
      data.email,
    ]);
    if (result1.length > 0) {
      res.status(202).json({
        message: "User already exists",
      });
      return;
    }
    let [result2] = await conn.execute(
      "SELECT area_id FROM area where area_name=?",
      [data.area]
    );
    if (result2.length <= 0) {
      res.status(202).json({
        message: "area is wrong",
      });
      return;
    }
    let hashedPassword = await bcrypt.hash(data.password, 12);

    const [result3] = await conn.execute(
      "INSERT INTO user( email, password, cnic, firstname, lastname, phone, streetno,area_id, birthdate) VALUES(?,?,?,?,?,?,?,?,?)",
      [
        data.email,
        hashedPassword,
        data.cnic,
        data.firstName,
        data.lastName,
        parseInt(data.phone),
        data.street,
        parseInt(result2[0].area_id),
        data.birthDate,
      ]
    );
    if (result3.affectedRows > 0) {
      const token = jwt.sign({ email: req.body.email }, "eventus", {
        expiresIn: "1h",
      });
      res
        .status(200)
        .json({
          message: "User Data Inserted Successfully",
          userId: result3.insertId,
          token: token,
        });
    } else {
      res.status(400).json({ message: "Error while inserting user data" });
      throw new Error("Error while inserting user data");
    }
  } catch (err) {
    console.log(err);
  }
};

const login = async (req, res, next) => {
  const data = req.body;

  let [results] = await conn.execute("SELECT * FROM user WHERE email = ?", [
    data.email,
  ]);

  if (results.length > 0) {
    let isCorrect = await bcrypt.compare(data.password, results[0].password);
    if (isCorrect) {
      const token = jwt.sign({ email: req.body.email }, "eventus", {
        expiresIn: "1h",
      });
      const userId = results[0]["user_id"];
      console.log("user logged in");
      res
        .status(200)
        .json({ message: "user logged in", token: token, userId: userId });
    } else {
      console.log("Enter Correct Credentials");
      res.status(202).json({ message: "Enter Correct Credentials" });
    }
  } else {
    console.log("User Not Found");
    res.status(202).json({ message: "User Not Found" });
  }
};

const getUserProfile = async (req, res) => 
{
  const data = req.query;
  
    let [result1] = await conn.execute(
      "SELECT firstname,email,cnic,phone,area_id FROM user WHERE user_id=?",
      [parseInt(data.userId)]
    );
    console.log(result1)
    let [area] = await conn.execute(
      "SELECT area_name FROM area WHERE area_id=?",
      [parseInt(result1[0].area_id)]
    );  
    result1[0]["area_name"]=area[0].area_name;
    console.log(result1)
    if (result1.length > 0) {
      res.status(200).json(result1);
    } else {
      res.status(200).json([]);
    }

}

const updateUserProfile = async (req, res) => 
{
  const data = req.body;
  let [area] = await conn.execute(
    "SELECT area_id FROM area WHERE area_name=?",
    [data.areaName]
  );  
  console.log(data)
  console.log(parseInt(data.phone))
  let [result1] = await conn.execute(
    "UPDATE user SET phone=?,area_id=? WHERE user_id=?",
    [parseInt(data.phone),area[0].area_id,parseInt(data.userId)]
  );
  if (result1.affectedRows > 0) {
    res.status(200).json({ message: "update" });
  } else {
    res.status(200).json({ message: "not update" });
  }  
}

const logout = (req, res, next) => {
  res.status(200).json({ message: "user logged out" });
};

module.exports = { signup, login, isAuth, getUserProfile,updateUserProfile };
