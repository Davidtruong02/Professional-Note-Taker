// Purpose: To create the routes for the notes page
// The notes.js file is a route that will be used to handle the notes page. It will be used to read and write notes to the db.json file
const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../Develop/helpers/fsUtils');
const {v4: uuidv4} = require('uuid');

notes.get('/' , (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});




notes.post('/', (req, res) => {

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

notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      console.log("JSON", json.length);
        const result = json.filter((note) => { 
          console.log("NOTE", note);
          return note.note_id !== noteId
        });
        console.log("RESULT", result);
        writeToFile('./db/db.json', result);
        res.json(`Item ${noteId} has been deleted 🗑️`);
    });
}); 

module.exports = notes;