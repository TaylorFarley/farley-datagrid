const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let mongoose = require("mongoose");

router.post("/register", (req, res) => {
  console.log(req.body)
    res.send("added");

});

router.post("/", (req, res) => {
  res.send("root");
});

module.exports = router;
