const express = require('express');
const db = require('../database/index.js');
const { getRandomNum } = require('../database/seeder/generators.js');

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=31557600');
  next();
});

app.use('*.js', (req, res, next) => {
  req.url = req.url + '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static('./client/dist'));
app.use(express.json());

/* ******** Personnel Routes ***************** */

app.get('/api/personnel', (req, res) => {
  db.getPersonnel(req.query.id)
    .then(results => res.send(results))
    .catch(err => console.log(err));
});

app.delete('/api/personnel', (req, res) => {
  db.removePersonnel(req.body.name)
    .then(results => res.send(results))
    .catch(err => console.log(err));
});

app.post('/api/personnel', (req, res) => {
  db.addPersonnel(req.body)
    .then(results => res.send(results))
    .catch(err => console.log(err));
});

app.put('/api/personnel', (req, res) => {
  db.udpatePersonnel(req.body.filter, req.body.update)
    .then(results => res.send(results))
    .catch(err => console.log(err));
});

/* ************** Movies Routes ****************** */

// get movies for a single cast member is a part of
app.get('/api/movies', (req, res) => {
  db.getMovies(Number(req.query.id))
    .then(results => res.send(results[0]))
    .catch(err => console.log(err));
});

app.post('/api/movies', (req, res) => {
  db.addMovies(req.body)
    .then(results => res.send(results))
    .catch(err => console.log(err));
});

app.delete('/api/movies', (req, res) => {
  db.removeMovies(req.body.title)
    .then(results => res.send(results))
    .catch(err => console.log(err));
});

app.put('/api/movies', (req, res) => {
  db.updateMovies(req.body.filter, req.body.update)
    .then(results => res.send(results))
    .catch(err => console.log(err));
});

app.listen(PORT, () => `Listening on port ${PORT}!`);
