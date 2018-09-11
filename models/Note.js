const mongoose = require('mongoose');
const noteSchema = mongoose.Schema;

//make Schema
const note = new noteSchema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    user_id: {
        type: String
    }
});

//make model
const Note = mongoose.model('Note', note);

module.exports = Note;