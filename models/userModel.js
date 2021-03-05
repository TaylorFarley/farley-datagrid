const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({  
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    admin: Boolean    
});

const User = mongoose.model('theUsers', userSchema);

module.exports = User;
