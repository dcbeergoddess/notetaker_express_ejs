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

//SERVE UP FILES WITH ASSETS
app.use(express.static(path.join(__dirname, 'public')));
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
    id: uuid(),
    title: "Test Title",
    text: "Test text"
  },
  {
    id: uuid(),
    title: "FIRST TITLE",
    text: "Make application a full CRUD application"
  },
  {
    id: uuid(),
    title: "Second Title",
    text: "Post to Github"
  },
  {
    id: uuid(),
    title: "Reminder",
    text: "Log work for 100-days of Code"
  },
  {
    id: uuid(),
    title: "TWEET",
    text: "Tweet you work for 100-days-of-code today"
  },
];

//HOME PAGE
app.get('/', (req, res) => {
  res.render('index', { notes });
})

// GENERIC RESPONSE FOR WRONG PATHS - MAKE A VIEW FOR IT??
app.get('*', (req, res) => {
  res.render('error')
});
//EXPRESS SERVER LISTENING
app.listen(PORT, () => {
  console.log(`LISTENING ON http://localhost:${PORT}`)
});