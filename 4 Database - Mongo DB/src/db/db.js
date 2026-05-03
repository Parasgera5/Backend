const mongoose = require('mongoose'); // mongoose package -> server se database connect kar sake

async function connectDB() {
    await mongoose.connect('mongodb://localhost:27017/notesdb'); // await -> jab tak database se connection nahi ho jata tab tak aage ka code execute nahi hoga.
    console.log('Connected to MongoDB');
}

// mongodb://localhost:27017/ -> mongodb server ka address upto cluster
// mongodb://localhost:27017/notesdb -> mongodb database ka naam notesdb

// connectDB(); // function call -> database se connect karne ke liye
module.exports = connectDB; // function export -> app.js me use karne ke liye