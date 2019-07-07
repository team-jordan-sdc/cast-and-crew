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
    release_date: 'string',
    vudu_rating: 'number',
    rt_rating: 'number',
    price: 'string',
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

/***********
 * QUERIES *
 ***********/

const getPersonnel = (movie) => {
  return Personnel.find({movies: mongoose.Types.ObjectId(movie)}).exec();
}

const getMovies = (person) => {
  return Movie.find().exec();
}

/* Export schemas for testing and seeding the database */
 module.exports.Movie = Movie;
 module.exports.Personnel = Personnel;
/*****************************************************/

 module.exports.getMovies = getMovies;
 module.exports.getPersonnel = getPersonnel;
