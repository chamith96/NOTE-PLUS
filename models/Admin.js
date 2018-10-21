const mongoose = require('mongoose');
const adminSchema = mongoose.Schema;

//make Schema
const admin = new adminSchema({
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
    },
    isAdmin: {
        type: Boolean,
        default: true
    }
});

//make model
const Admin = mongoose.model('Admin', admin);

module.exports = Admin;