const express = require('express');
const db = require('../database/index.js');

const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=31557600');
  next();
});

app.use('*.js', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.use(express.static('./client/dist'));
app.use(express.json());

/* ******** Personnel Routes ***************** */

app.get('/api/personnel', (req, res) => {
  // find related personnel for a given movie id
  db.getRelatedPersonnel(Number(req.query.id))
    .then(results => res.send(results.rows))
    .catch(error => console.log(error));
});

app.post('/api/personnel', (req, res) => {
  // add personnel from req.body
  db.addPersonnelEntry(req.body)
    .then(results => res.send(results))
    .catch(error => console.log(error));
});

app.delete('/api/personnel', (req, res) => {
  // delete personnel entry by id from req.body.id

  // CASCADE DELETE?

  // db.removePersonnel(req.body.name)
  //   .then(results => res.send(results))
  //   .catch(err => console.log(err));
});

app.put('/api/personnel', (req, res) => {
  // db.udpatePersonnel(req.body.filter, req.body.update)
  //   .then(results => res.send(results))
  //   .catch(err => console.log(err));
});

/* ************** Movies Routes ****************** */

app.get('/api/movies', (req, res) => {
  // find related movies for a given personnel id
  db.getRelatedMovies(Number(req.query.id))
    .then(results => res.send(results.rows))
    .catch(err => console.log(err));
});

app.post('/api/movies', (req, res) => {
  db.addMovieEntry(req.body)
    .then(results => res.send(results))
    .catch(err => console.log(err));
});

app.delete('/api/movies', (req, res) => {
  // delete movie by id from req.body.id

  // CASCADE DELETE?

  // db.removeMovies(req.body.title)
  //   .then(results => res.send(results))
  //   .catch(err => console.log(err));
});

app.put('/api/movies', (req, res) => {
  // db.updateMovies(req.body.filter, req.body.update)
  //   .then(results => res.send(results))
  //   .catch(err => console.log(err));
});

app.listen(PORT, () => `Listening on port ${PORT}!`);
