const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    description: String
});

const noteModel = mongoose.model('Note', noteSchema); // model creation -> database mein collection create karne ke liye

module.exports = noteModel; // model export -> app.js me use karne ke liye