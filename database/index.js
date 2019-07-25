const mongoose = require ('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/castandcrew';

const { fakeMovie, fakePersonnel } = require('./seeder/generators');


const connectWithRetry = () => {
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
    err && setTimeout(connectWithRetry, 5000); //attempt to reconnect every 5 seconds if initial attempt fails
  });
};
connectWithRetry();

/****************************
 * SCHEMA DEFINITIONS *
 ****************************/

const movieSchema = new mongoose.Schema(
  {
    id: 'number',
    title: 'string',
    release_date: 'string',
    vudu_rating: 'number',
    runtime: 'string',
    rating: 'string',
    rt_rating: 'number',
    price: 'string',
    thumbnail_url: 'string',
    personnel: [
      {
        _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Personnel'},
        role: 'string'
      },
    ]
  }
);

const personnelSchema = new mongoose.Schema(
  {
    name: 'string',
    thumbnail_url: 'string',
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

/* **** Personnel ***** */

const getPersonnel = (id) => {
  return Movie.find().where('personnel._id').equals(id).exec();
};


const addPersonnel = (personnelObj) => {
  return Personnel.create(personnelObj);
};

const udpatePersonnel = (filter, update) => {
  return Personnel.findOneAndUpdate(filter, update, {
    new: true,
    useFindAndModify: false,
  });
};

const removePersonnel = (name) => {
  return Personnel.deleteOne({ name }).exec();
};

/* **** Movies **** */

const getMovies = (id) => {
  return Movie.find().where('id').equals(id).populate('personnel._id').exec();
};

const updateMovies = (filter, update) => {
  return Personnel.findOneAndUpdate(filter, update, {
    new: true,
    useFindAndModify: false,
  });
};

const addMovies = (movieObj) => {
  return Movie.create(movieObj);
};

const removeMovies = (title) => {
  return Movie.deleteOne({ title }).exec();
};


/* Export schemas for testing and seeding the database */
module.exports = {
  Movie,
  Personnel,
  getMovies,
  getPersonnel,
  addPersonnel,
  removePersonnel,
  removeMovies,
  personnelSchema,
  addMovies,
  udpatePersonnel,
  updateMovies,
};
