const express = require('express');
var db = require('./db/db.json');
const fs = require('fs');
const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));


app.get('/api/notes', (req, res) => {
res.sendFile(path.join(__dirname, '/public/notes.html'))
    res.json(db)
});

app.post('/api/notes', (req, res) => {
  
    
    const { title, text, } = req.body;
  
   
    if (title && text) {
      const newNote = {
        title,
        text,
        id: uuid.v1(),
      };
    }
  
      fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedNotes = JSON.parse(data);
  
          parsedNotes.push(newNote);
          reviews = parsedNotes;
          fs.writeFile(
            './db/db.json',
            JSON.stringify(parsedNotes, null, 4),
            (writeErr) =>
              writeErr
                ? console.error(writeErr)
                : console.info('Successfully updated your notes!')
          );
        }
      });
    });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} `)
);

