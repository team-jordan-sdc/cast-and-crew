const mongoose = require('mongoose');
const progress = require('cli-progress');
const MONGODB_URI = 'mongodb://localhost:27017/castandcrew';

/******* PROGRESS BAR *******/
const bar = new progress.Bar({}, progress.Presets.shades_classic);
let completed = 0;
bar.start(122, 0);
/****************************/


/******** MONGO CONFIG & SCHEMAS *********/
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
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

const Movie = mongoose.model('Movie', movieSchema);
const Personnel = mongoose.model('Personnel', personnelSchema);
/****************************************/



/********  SAMPLE PERSONNEL  ********/
const actors = ["Elvis Presley","John Travolta","John Belushi","George Clooney","Natalie Portman","Scarlett Johannsson","Marlon Brando","Margot Robbie","Will Smith","Chris Evans","Robert Downey Jr","Jon Bon Jovi","Miley Cyrus","Keanu Reeves","Lawrence Fishburne","Samuel L. Jackson","Brad Pitt","Angelina Jolie","Emma Watson","Alan Rickman","Benedict Cumberbatch","Benedict Wong"];

const roles = ['Director', 'Producer', 'Forrest', 'Neo', 'Harry Potter', 'Aragorn', 'A Lone Fish', 'Themself', 'Associate Director', 'Associate Producer', 'Stagehand', 'Yodelist', 'Emily', 'James', 'Sarah', 'Luke Skywalker', 'Gandalf', 'Frodo', 'Arwen', 'Sauron'];
/**********************************/



/********  SAMPLE MOVIES  ********/
const titles = ['Captain America', 'Forrest Gump', 'Gone With The Wind', 'Bird Cage', 'The Lord Of The Rings', 'Harry Potter And The Order Of Phoenix', 'Get Smart', 'Die Hard', 'Mission Impossible', 'The Matrix', 'The Martian', 'Interstellar', 'It Might Get Loud', 'Spectre', 'Fat Albert', 'Monty Python And The Holy Grail', 'Die Another Day', 'The Happening', 'Beauty And The Beast', 'Gran Torino', 'Apollo 13', 'War Of The Worlds', 'Hancock', 'Independence Day', `Ender's Game`, 'The Fugitive', 'Birdman', 'Jurassic Park', 'Star Wars: A New Hope', 'The Hobbit: An Unexpected Journey', 'Men In Black'];

const dates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/*******************************/



/*********** HELPER FUNCTIONS **********/
const getRandomNum = (max) => {
  return Math.floor(Math.random() * max);
}

const generatePersonnelForMovies = (max) => {
  let results = [];
  for (let i = 0; i <= getRandomNum(13); i++) { //each movie will have up to 13 cast/crew members
    results.push({ id: getRandomNum(max), role: roles[getRandomNum(19)] })
  }
  return results;
}/************************************/



/********** DATA GENERATOR *************/
let MovieSeed = () => {
  return {
    title: titles[getRandomNum(31)],
    release_date: `${dates[getRandomNum(12)]} ${getRandomNum(27) + 1}`,
    vudu_rating: getRandomNum(5) + 1,
    rt_rating: getRandomNum(101),
    price: `$${getRandomNum(30) + 1}.99`,
    thumbnail_url: `https://mapquiz.app/fec/thumbnails/movie_thumbnail${getRandomNum(46) + 1}.jpeg`,
    personnel: generatePersonnelForMovies(21)
  }
};

let PersonnelSeed = (actor, movieList) => {
  let person = {
    name: actor,
    thumbnail_url: `https://mapquiz.app/fec/headshots/headshot${getRandomNum(15) + 1}.jpeg`,
    movies: []
  }

  for (let i = 0; i <= getRandomNum(31); i++) { //each cast/crew member will have up to 31 movies
    person.movies.push(movieList[getRandomNum(31)]);
  }

  return person;
}; /**************************************/



/******* DATABASE SEEDER *******/
for (let i = 1; i <= 100; i++) {
  const currentMovie = new Movie(MovieSeed());
  currentMovie.save().then(() => {
    bar.update(++completed);
    completed === 100 && generateMoviesForPersonnel();
  });
}

const generateMoviesForPersonnel = () => {
  Movie.find().distinct('_id').then((movieList) => {
    for (let actor of actors) {
      let currentPerson = new Personnel(PersonnelSeed(actor, movieList));
      currentPerson.save().then(() => {
        bar.update(++completed);
        if (completed === 122) {
          bar.stop()
          console.log('Finished seeding!');
          mongoose.connection.close();
        }
      })
    }
  })
}/**********************************/

