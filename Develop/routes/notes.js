// Purpose: To create the routes for the notes page
// The notes.js file is a route that will be used to handle the notes page. It will be used to read and write notes to the db.json file
const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const {v4: uuidv4} = require('uuid');

notes.get('/' , (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log(req, res);

    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success',
            body: newNote,
        };
        res.json(response);
    }

});

module.exports = notes;