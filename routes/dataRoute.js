const router = require("express").Router();
const Data = require("../models/dataModel");
const DataSSOT = require("../models/SSOTModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let mongoose = require("mongoose");

router.post("/dataAdd", async (req, res) => {
  console.log(req.body);
  let result = req.body;
  Data.insertMany(req.body)
    .then(function () {
      console.log("Data inserted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
  res.send(result);

  // let { title, log, org } = req.body;
  // const newData = new Data({
  //   title,
  //   log,
  //   org,
  // });
  // const savedData = await newData.save();
  // res.send(savedData);
});

router.post("/dataSend", async (req, res) => {
  const records = req.body;

  const updateOps = records.map((record) => {
    const updateOp = {
      updateOne: {
        filter: {
          title: record.title,
        },
        update: {
          log: record.log,
          org: record.org,
        },
      },
    };

    return updateOp;
  });

  const result = await Data.bulkWrite(updateOps);

  res.send(result);

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
});

router.get("/dataGet", async (req, res) => {
  const allData = await Data.find();
  res.json(allData);
});

router.get("/dataGetSSOT", async (req, res) => {
  const allData = await DataSSOT.find();
  res.json(allData);
});

router.post("/update", async (req, res) => {
  //bring in ssot store in new data, so wrap it in a promise?
  // .then the below use your saved to remember promise
  let getSSOT = async () => {
    return new Promise((fulfilledPromise) => {
      const SSOT_Data = DataSSOT.find();
      fulfilledPromise(SSOT_Data);
     
    });
  };

  getSSOT().then((SSOT_Titles) => {
  
    SSOT_Titles.forEach((currentSSOT_Title, index) => {
      try {
        Data.updateMany(
          { title: currentSSOT_Title.title },
          { $set: { org: currentSSOT_Title.org, log: currentSSOT_Title.log } }
        )
          .collation({ locale: "en", strength: 2 })
          .then(() => {
            console.log("updated");
          });
      } catch (e) {
        print(e);
      }
     
    });
  });
  res.send("done");
});

module.exports = router;
