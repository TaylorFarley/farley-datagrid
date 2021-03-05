const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let mongoose = require("mongoose");
var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());
router.post("/register", async (req, res) => {
  let { firstName, lastName, email, password } = req.body;

  const existingUser = await User.findOne({ email: email });
  if (existingUser) console.log("email exists");
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: passwordHash,
  });
  const savedUser = await newUser.save();
  res.send(savedUser);
});

router.post("/tokenIsValid", async (req, res) => {
  const token = req.header("x-auth-token");
  if (token) {
    let verified
    try {
      console.log(token);
      verified = jwt.verify(token, process.env.JWT_SECRET);    
    } catch (err) {
      res.send(false);
    }
    const user = await User.findById(verified.id);
    let userInfo = {
      _id: user._id,
     firstName: user.firstName,
     lastName: user.lastName,
      email: user.email,
    };
    res.json(userInfo);
  } else res.send("no token");
  // try {
  //   const token = req.header("x-auth-token");
  //   if (!token) return res.send('token is blank');

  //   const verified = jwt.verify(token, process.env.JWT_SECRET);
  //   if (!verified) return res.send('cant verify');

  //   const user = await User.findById(verified.id);
  //   if (!user) return res.send('cant find user');

  //   let userInfo = {
  //     _id: user._id,
  //    firstName: user.firstName,
  //    lastName: user.lastName,
  //     email: user.email,
  //   };
  //   return res.json(userInfo);
  // } catch (err) {
  //   res.status(500).send( err.message);
  // }
});

router.post("/login", async (req, res) => {


  try {

    // validate
    let { email, password } = req.body
    console.log(email)
    const user = await User.findOne({ email: email });
    if (!user) return res.send("NoUser");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send("Invalid");
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
    });
   
    const userInfo = await User.findById(user._id);  

    if(userInfo)
    return res.json({
      token,
      user: {
        id: user._id,
        email: userInfo.email,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
      },
    });
    else
    res.send('error')
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", (req, res) => {
  res.send("root");
});

module.exports = router;
