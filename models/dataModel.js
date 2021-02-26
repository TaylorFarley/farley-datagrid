const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({  
    title: String,
    log: String,
    org: String    
});

const Data = mongoose.model('theData', dataSchema);

module.exports = Data;
