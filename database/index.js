const mongoose = require ('mongoose');
const Promise = require('bluebird');
const MONGDB_URI = 'mongodb://localhost:27017/castandcrew';

mongoose.connect(MONGDB_URI, {useNewUrlParser: true});

/****************************
 * SCHEMA DEFINITIONS *
 ****************************/

const movieSchema = new mongoose.Schema(
  {
    title: 'string',
    release_date: 'date',
    vudu_rating: 'number',
    rt_rating: 'number',
    price: 'number',
    movie_url: 'string',
    thumbnail_url: 'string',
    personnel: [
      {
        id: 'number',
        role: 'string'
      },
    ]
  }
);

const personnelSchema = new mongoose.Schema(
  {
    name: 'string',
    thumbnail_url: 'string',
    movies: 'array'
  }
);

/**********
 * MODELS *
 **********/

const Movie = mongoose.model('Movie', movieSchema);
const Personnel = mongoose.model('Personnel', personnelSchema);

