const mongoose = require('mongoose');
const progress = require('cli-progress');
const db = require('./index.js');


/******* PROGRESS BAR *******/
const bar = new progress.Bar({}, progress.Presets.shades_classic);
let completed = 0;
bar.start(122, 0);


/********  SAMPLE PERSONNEL DATA ********/
const actors = ["Elvis Presley","John Travolta","John Belushi","George Clooney","Natalie Portman","Scarlett Johannsson","Marlon Brando","Margot Robbie","Will Smith","Chris Evans","Robert Downey Jr","Jon Bon Jovi","Miley Cyrus","Keanu Reeves","Lawrence Fishburne","Samuel L. Jackson","Brad Pitt","Angelina Jolie","Emma Watson","Alan Rickman","Benedict Cumberbatch","Benedict Wong"];

const roles = ['Director', 'Producer', 'Forrest', 'Neo', 'Harry Potter', 'Aragorn', 'A Lone Fish', 'Themself', 'Associate Director', 'Associate Producer', 'Stagehand', 'Yodelist', 'Emily', 'James', 'Sarah', 'Luke Skywalker', 'Gandalf', 'Frodo', 'Arwen', 'Sauron'];


/********  SAMPLE MOVIE DATA  ********/
const titles = ['Captain America', 'Forrest Gump', 'Gone With The Wind', 'Bird Cage', 'The Lord Of The Rings', 'Harry Potter And The Order Of Phoenix', 'Get Smart', 'Die Hard', 'Mission Impossible', 'The Matrix', 'The Martian', 'Interstellar', 'It Might Get Loud', 'Spectre', 'Fat Albert', 'Monty Python And The Holy Grail', 'Die Another Day', 'The Happening', 'Beauty And The Beast', 'Gran Torino', 'Apollo 13', 'War Of The Worlds', 'Hancock', 'Independence Day', `Ender's Game`, 'The Fugitive', 'Birdman', 'Jurassic Park', 'Star Wars: A New Hope', 'The Hobbit: An Unexpected Journey', 'Men In Black'];

const dates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


/*********** HELPER FUNCTIONS ***********/
const getRandomNum = (max) => {
  return Math.floor(Math.random() * max);
}

const generatePersonnelForMovies = (max) => {
  let results = [];
  for (let i = 0; i <= getRandomNum(25) + 10; i++) { //each movie will have at least 10 members
    results.push({ id: getRandomNum(max), role: roles[getRandomNum(19)] })
  }
  return results;
}

/********** OBJECT GENERATOR *************/
let fakeMovie = () => {
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

let fakePerson = (id, actor, movieList) => {
  let person = {
    _id: id,
    name: actor,
    thumbnail_url: `https://mapquiz.app/fec/headshots/headshot${getRandomNum(15) + 1}.jpeg`,
    movies: []
  }

  for (let i = 0; i <= getRandomNum(31); i++) { //each cast/crew member will have up to 31 movies
    person.movies = movieList
      .filter(movie => movie.personnel
      .some(person => person.id === id))
      .reduce((acc, next) => {
        acc.push(next._id);
        return acc;
      }, []);
  }

  return person;
};

/******* DATABASE SEEDER *******/
/* NEEDS REFACTORING! Todo: Kill the mongoose connection once fully seeded w/o interfering with Jest tests */

const seed = () => {
  return new Promise((resolve, reject) => { //we want async nature for our tests

    for (let i = 1; i <= 100; i++) {
      const currentMovie = new db.Movie(fakeMovie());
      currentMovie.save().then(() => {
        bar.update(++completed);
        completed === 100 && generateMoviesForPersonnel();
      });

    }

    const generateMoviesForPersonnel = () => {
      db.Movie.find().then((movieList) => {

        for (let i = 0; i < actors.length; i++) {
          let currentPerson = new db.Personnel(fakePerson(i, actors[i], movieList));
          currentPerson.save().then(() => {
            bar.update(++completed);
            if (completed === 122) {
              bar.stop()
              console.log('Finished seeding!');
              resolve();
            }
          })
        }

      })
    }
  });
}/**********************************/

module.exports.seed = seed;