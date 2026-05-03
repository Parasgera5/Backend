const express = require('express');
const app = express();

app.use(express.json()); // middleware -> request body ko json format mein convert karne ke liye

const noteModel = require('./models/note.model'); // model import -> database mein collection create karne ke liye


/*
    POST /notes -> create a new note
    GET /notes -> get all notes
    DELETE /notes/:id -> delete a note by id
    PATCH /notes/:id -> update a note by id
*/

app.post('/notes', async (req, res) => {
    const data = req.body; // request body -> client se aane wala data -> {title: 'Note 1', description: 'This is note 1'}
    await noteModel.create({
        title: data.title,
        description: data.description
    })
    res.status(201).json({
        message: 'Note created successfully'
    });
});
app.get('/notes', async (req, res) => {
    const notes = await noteModel.find(); // find always return array of object and if databse is empty it will return empty array.
    // const notes = await noteModel.findOne({ // {} or null -> note whose title is title1 will be fetched -> findOne always return single object and if databse is empty it will return null.
    //     title: "title1"
    // })
    // const notes = await noteModel.find({  [{}, {}] or []
    // title: "title1"
    // })
    res.status(200).json({
        message: 'Notes fetched successfully',
        notes: notes
    });
});


app.delete('/notes/:id', async (req, res) => {
    const id = req.params.id; // request params -> url mein aane wala data -> /notes/123 -> id = 123
    // await noteModel.findByIdAndDelete(id); // findByIdAndDelete -> id ke basis par note ko delete karne ke liye
    await noteModel.findOneAndDelete({
        _id: id
    }) // findOneAndDelete -> query ke basis par note ko delete karne ke liye

    res.status(200).json({
        message: 'Note deleted successfully'
    });
});

app.patch('/notes/:id', async (req, res) => {
    const id = req.params.id;
    const newTitle = req.body.title;
    const newDescription = req.body.description;
    await noteModel.findByIdAndUpdate(
        { _id: id },
        {
            title: newTitle,
            description: newDescription
        }
    );
    res.status(200).json({
        message: 'Note updated successfully'
    });

});

// koi bhi data databse mein store karna hai toh wo hume database ko batana padega ki wo data dikhta kaise hai => schema creation.

module.exports = app;