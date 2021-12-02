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
    console.log(result1.length);
    if (result1.length > 0) {
      res.status(202).json({
        message: "User already exists",
      });
      return;
    }
    let hashedPassword = await bcrypt.hash(data.password, 12);
    console.log(data);
    const [result2] = await conn.execute(
      "INSERT INTO user( email, password, cnic, firstname, lastname, phone, streetno, city, country, birthdate) VALUES(?,?,?,?,?,?,?,?,?,?)",
      [
        data.email,
        hashedPassword,
        data.cnic,
        data.firstName,
        data.lastName,
        parseInt(data.phone),
        data.street,
        data.city,
        data.country,
        data.birthDate
      ]
    );
    if (result2.affectedRows > 0) {
      res.status(200).json({ message: "User Data Inserted Successfully" });
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
      console.log("user logged in");
      res.status(200).json({ message: "user logged in", token: token });
    } else {
      console.log("Enter Correct Credentials");
      res.status(202).json({ message: "Enter Correct Credentials" });
    }
  } else {
    console.log("User Not Found");
    res.status(202).json({ message: "User Not Found" });
  }
};

const logout = (req, res, next) => {
  res.status(200).json({ message: "user logged out" });
};

module.exports = { signup, login, isAuth, logout };