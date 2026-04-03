// server ko create karegi ye file.
const express = require('express');
const app = express();

app.use(express.json()); // ye line hume req.body ko access karne me madad karegi, kyunki by default express req.body ko parse nahi karta. ye ek middleware hai jo help karta hai express server ko user ka raw json form mein bheja hua dara read karne me. jab bhi hum client se json data bhejte hain, to ye middleware us data ko parse karke ek JavaScript object mein convert kar deta hai, jise hum req.body ke through access kar sakte hain. bina is middleware ke, req.body undefined hota hai, aur hum client se bheje gaye data ko access nahi kar pate. isliye, agar aap apne express app mein json data handle karna chahte hain, to app.use(express.json()) ko apne app ke setup mein include karna zaroori hai.

const notes = [];

app.post("/notes", (req, res) => {
    console.log(req.body);
    notes.push(res.body);

    res.status(201).json({message: "Note created successfully"});
});

app.get("/notes", (req, res) => {
    res.status(200).json({
        message: "Notes fetched successfully",
        notes: notes
    });
});

// delete -> /notes/:index -> isme : lagane se express app ok pata chal jata hai ki index jo hai wo dynamically aayega.
app.delete('/notes/:index' , (req, res) => {
    const index = req.params.index;
    delete notes[index];
    res.status(200).json({
        message: "Note deleted successfully"
    });
});

app.patch('/notes/:index', (req, res) => {
    const index = req.params.index;
    const desc = req.body.description;
    const title = req.body.title;
    notes[index].description = desc;
    notes[index].title = title;

    res.status(200).json({
        message: "Note updated successfully"
    });
});

module.exports = app;