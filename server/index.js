require('newrelic');
require('dotenv').config();
const express = require('express');
const db = require('../database/postgres/index.js');

const app = express();
const PORT = process.env.EXPRESS_PORT;

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

/* ******** Get Routes ***************** */

app.get('/api/movies', async (req, res) => {
  // find one movie object,
  // find related personnel,
  // populate movie object with personnel list.
  let movie;
  await db.getMovieById(Number(req.query.id))
    .then((results) => {
      movie = results[0];
    })
    .catch(err => console.error(err));

  await db.getRelatedPersonnel(Number(req.query.id))
    .then((results) => {
      movie.personnel = results.rows;
      res.send(movie);
    })
    .catch(err => console.error(err));
});

app.get('/api/personnel', async (req, res) => {
  // return personnel with movies property filled with related movies
  // find one personnel object,
  // find related movies,
  // populate personnel object with movie list
  let personnel = {};
  await db.getPersonnelById(Number(req.query.id))
    .then((results) => {
      personnel = results[0];
    })
    .catch(err => console.error(err));

  await db.getRelatedMovies(Number(req.query.id))
    .then((results) => {
      personnel.movies = results.rows;
      res.send(personnel);
    })
    .catch(err => console.error(err));
});

/* ****** Post routes ****** */

app.post('/api/personnel', (req, res) => {
  // add personnel from req.body
  db.addPersonnelEntry(req.body)
    .then(results => res.send(results))
    .catch(error => console.log(error));
});

app.post('/api/movies', (req, res) => {
  db.addMovieEntry(req.body)
    .then(results => res.send(results))
    .catch(err => console.log(err));
});

/* *** Delete Routes *** */

app.delete('/api/personnel', (req, res) => {
  // delete personnel entry by id from req.body.id

  // TODO: Set up cascade delete in db

  // db.removePersonnel(req.body.name)
  //   .then(results => res.send(results))
  //   .catch(err => console.log(err));
});

app.delete('/api/movies', (req, res) => {
  // delete movie by id from req.body.id

  // TODO: Set up cascade delete in db

  // db.removeMovies(req.body.title)
  //   .then(results => res.send(results))
  //   .catch(err => console.log(err));
});

/* *** Update Routes *** */

app.put('/api/personnel', (req, res) => {
  // db.udpatePersonnel(req.body.filter, req.body.update)
  //   .then(results => res.send(results))
  //   .catch(err => console.log(err));
});

app.put('/api/movies', (req, res) => {
  // db.updateMovies(req.body.filter, req.body.update)
  //   .then(results => res.send(results))
  //   .catch(err => console.log(err));
});

app.listen(PORT, () => `Listening on port ${PORT}!`);
