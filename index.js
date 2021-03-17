const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid');
uuid();

//MIDDLEWARE - JSON PARSE
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
//MIDDLEWARE - method-override
app.use(methodOverride('_method'));

//SET VIEW ENGINE FOR EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// GET /notes - list all notes
// POST /notes - Create a new note 
// GET /notes/:id - Get one note (using ID)
// PATCH /notes/:id - Update one note
// DELETE /notes/:id - Destroy one note

//FAKE DATABASE | ARRAY
let notes = [
  {
    "title":"Test Title",
    "text":"Test text"
  },
  {
    "title":"FIRST TITLE",
    "text":"Make application a full CRUD application"
  },
  {
    "title":"Second Title",
    "text":"Post to Github"
  },
  {
    "title":"Reminder",
    "text":"Log work for 100-days of Code"
  },
  {
    "title":"TWEET",
    "text":"Tweet you work for 100-days-of-code today"
  },
]

//HOME PAGE


// GENERIC RESPONSE FOR WRONG PATHS - MAKE A VIEW FOR IT??
app.get('*', (req, res) => {
  res.send(`I do not know that path!`)
})
//EXPRESS SERVER LISTENING
app.listen(PORT, () => {
  console.log(`LISTENING ON http://localhost:${PORT}`)
})
