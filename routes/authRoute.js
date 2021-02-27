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



router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    console.log(token)
    if (!token) return res.send('bad token');

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.send('not verified');

    const user = await User.findById(verified.id);
    if (!user) return res.send('bad id');

    let userInfo = {
      _id: user._id,
     firstName: user.firstName,
     lastName: user.lastName,
      email: user.email,
    };
    return res.json(userInfo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
   
    const user = await User.findOne({ email: email });
    if (!user) console.log("user not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) console.log("invalid username/password");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    const userInfo = await User.findById(user._id);
    console.log(userInfo)
    res.json({
      token,
      user: {
        id: user._id,
        email: userInfo.email,       
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", (req, res) => {
  res.send("root");
});

module.exports = router;
