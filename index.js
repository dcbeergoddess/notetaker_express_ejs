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
  res.render('home', { notes });
})

// READ // NOTES - list all notes
app.get('/notes', (req, res) => {
  res.render('notes/index', { notes })
})

//FORM TO CREATE NEW NOTE
app.get('/notes/new', (req, res) => {
  res.render('notes/new');
})

// CREATE // NEW POST
app.post("/notes", (req, res) => {
  //DESTRUCTURE
  const { title, text } = req.body;
  notes.push({title, text, id: uuid()});
  res.redirect('/notes', { note, id });
})

// SHOW // ONE NOTE BY ID
app.get("/notes/:id", (req, res) => {
  const { id } = req.params;
  const note = notes.find(n => n.id === id);
  res.render('notes/show', { note, id });
})

// PATCH /notes/:id - Update one note
// EDIT - NEED FORM TO TO EDIT POST;
app.patch('/notes/:id', (req, res) => {
  const { id } = req.params; //GET PAYLOAD
  // console.log(req.params)
  // console.log(req.body.title);
  // console.log(req.body.text);
  const newNoteTitle = req.body.title;
  const newNoteText = req.body.text;
  const ogNote = notes.find(n => n.id === id);
  ogNote.title = newNoteTitle;
  ogNote.text = newNoteText;
  res.redirect('/notes');
});
//UPDATE NOTE WITH NEW INFO - PULL UP PAGE WITH EDIT FORM
app.get('/notes/:id/edit', (req, res) => {
  const { id } = req.params;
  const note = notes.find(n => n.id === id);
  res.render('notes/edit', { note, id })
})



// DELETE /notes/:id - Destroy one note


// GENERIC RESPONSE FOR WRONG PATHS - MAKE A VIEW FOR IT??
app.get('*', (req, res) => {
  res.render('error');
});
//EXPRESS SERVER LISTENING
app.listen(PORT, () => {
  console.log(`LISTENING ON http://localhost:${PORT}`)
});
