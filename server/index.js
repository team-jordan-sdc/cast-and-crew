const express = require('express');
const db = require('../database/index.js');
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

app.get('/api/personnel', (req, res) => {
  db.getPersonnel(req.query.id)
    .then(results => res.send(results))
    .catch(err => console.log(err));
});

app.get('/api/movies', (req, res) => {
  db.getMovies(Number(req.query.id))
    .then(results => res.send(results[0]))
    .catch(err => console.log(err));
});

app.listen(PORT, () => `Listening on port ${PORT}!`);
