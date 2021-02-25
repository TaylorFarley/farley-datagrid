const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let mongoose = require("mongoose");

router.post("/register", async(req, res) => {
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

router.post("/", (req, res) => {
  res.send("root");
});

module.exports = router;
