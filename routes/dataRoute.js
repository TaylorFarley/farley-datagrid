const router = require("express").Router();
const Data = require("../models/dataModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let mongoose = require("mongoose");

router.post("/dataAdd", async(req, res) => {
    
    let { title, log, org } = req.body;

    
    // const salt = await bcrypt.genSalt(10);
    // const passwordHash = await bcrypt.hash(password, salt);
    const newData = new Data({
      title,
      log,
      org,
    //   password: passwordHash,  
    });
    const savedData = await newData.save();
    res.send(savedData);
})

router.post("/dataSend", async(req, res) => {
    
  const records = req.body

  const updateOps = records.map(record => {
    const updateOp = {
      'updateOne': {
        'filter': {
          'title': record.title,
        },
        'update': {
          'log': record.log,
          'org': record.org,
        },
      }
    }
    
    return updateOp
  })


  const result = await Data.bulkWrite(updateOps)

  res.send(result)

    
    // const salt = await bcrypt.genSalt(10);
    // const passwordHash = await bcrypt.hash(password, salt);
    // const newData = new Data({
    //   title,
    //   log,
    //   org,
    // //   password: passwordHash,  
    // });
    // const savedData = await newData.save();
    // res.send(savedData);
})

router.get("/dataGet", async(req, res) => {
    const allData = await Data.find();
    res.json(allData)
})

module.exports = router;