const express = require('express');
const Promise = require('bluebird');
const db = require('../database/index.js');
const app = express();
const PORT = 3000;

app.use(express.static('./client/dist'));
app.use(express.json());

app.get('/api/personnel', (req, res) => {
  db.getPersonnel(req.query.id)
    .then(results => res.send(results))
    .catch(err => console.log(err))
});

app.get('/api/movies', (req, res) => {
  db.getMovies(req.query.id)
    .then(results => results.filter(movie => movie.personnel.some(person => person.id === req.body.id)))
    .then(results => res.send(results))
    .catch(err => console.log(err))
});

app.listen(PORT, () => `Listening on port ${3000}!`);