const mongoose = require('mongoose');
const userSchema = mongoose.Schema;

//make user schema
user = new userSchema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true 
    }
});

//make user model
const User = mongoose.model('User', user);

module.exports = User;