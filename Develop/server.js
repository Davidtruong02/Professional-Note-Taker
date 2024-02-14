// This file is the entry point for the application. It requires the express module, the path module, and the routes module. It creates an instance of the express server and sets the PORT to the environment variable PORT or 3001. It then sets up the express app to handle data parsing and serve static files. It also sets up the app to use the routes module. Finally, it sets up the server to listen for requests on the PORT and logs the URL where the app is running.
const express = require('express');
const path = require('path');
const api = require('./routes');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);


// 
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);  


app.delete('/api/notes/:id', (req, res) => {
  deleteNote(req.params.id, allNotes);
  res.json(true);
});


// This code is telling the server to listen for requests on the PORT. When the server is running, the console will log the URL where the app is running.
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);  

