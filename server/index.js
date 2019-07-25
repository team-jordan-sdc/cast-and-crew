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
  // TO-DO: grab name from request rather than hardcoding
  db.removePersonnel('Marlon Brando')
    .then(results => res.send(results))
    .catch(err => console.log(err));
});

app.post('/api/personnel', (req, res) => {
  // TO-DO: grab personnel object from request rather than hardcoding
  const personnelObj = { name: 'Elton John', thumbnail_url: 'https://fec1-arwen.s3.amazonaws.com/headshots/headshot13.jpeg' };

  db.addPersonnel(personnelObj)
    .then(results => res.send(results))
    .catch(err => console.log(err));
});

app.put('/api/personnel', (req, res) => {
  // TO-DO: grab name from request rather than hardcoding
  const name = 'Seth Rogen';
  db.udpatePersonnel(5, name)
    .then(results => res.send(results))
    .catch(err => console.log(err));
});

/* ************** Movies Routes ****************** */

app.get('/api/movies', (req, res) => {
  db.getMovies(Number(req.query.id))
    .then(results => res.send(results[0]))
    .catch(err => console.log(err));
});

app.post('/api/movies', (req, res) => {
  // TO-DO: grab movie object from request rather than hardcoding
  db.addMovies({
    title: 'Fear and Loathing in Las Vegas',
    release_date: 'Sep 12',
    vudu_rating: 2,
    runtime: '115 min',
    rating: 'R',
    rt_rating: 99,
    price: '$19.95',
    thumbnail_url: 'https://fec1-arwen.s3.amazonaws.com/thumbnails/movie_thumbnail5.jpeg',
    personnel: [],
    id: 102,
    __v: 0,
  })
    .then(results => res.send(results))
    .catch(err => console.log(err));
});

app.delete('/api/movies', (req, res) => {
  // TO-DO: grab title from request rather than hardcoding
  db.removeMovies('Fat Albert')
    .then(results => res.send(results))
    .catch(err => console.log(err));
});

app.put('/api/movies', (req, res) => {
  // TO-DO: pass filter and update from req
  db.updateMovies()
    .then(results => res.send(results))
    .catch(err => console.log(err));
});

app.listen(PORT, () => `Listening on port ${PORT}!`);
