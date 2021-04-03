const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSSOTSchema = new Schema(
  {
    title: String,
    log: Number,
    sub: Number,
    org: Number,
  }
);

const DataSSOT = mongoose.model("ssot", dataSSOTSchema);

module.exports = DataSSOT;
