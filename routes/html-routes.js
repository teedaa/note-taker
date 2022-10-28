const notes = require('express').Router();

//GET Route for retrieving notes

fb.get('/notes', (req, res) => 
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

