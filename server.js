const express = require('express');
var dbNotes = require('./db/db.json');
const fs = require('fs');
const uuid = require('./helpers/uuid');
const path = require('path');
let newNote 
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));


app.get('/api/notes', (req, res) => {
res.sendFile(path.join(__dirname, '/public/notes.html'))
    res.json(dbNotes);
});

// Write notes
app.post('/api/notes', (req, res) => {
  
    const { title, text, } = req.body; 
    if (title && text) {
       newNote = {
        title,
        text,
        id: uuid()
      };
    
  
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedNotes = JSON.parse(data);
  
          parsedNotes.push(newNote);
          dbNotes = parsedNotes;
          fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedNotes, null, 3),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated your notes!')
          );
        }
        res.json(dbNotes);
        
      });
    }
    });
    
    
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} `)
);

