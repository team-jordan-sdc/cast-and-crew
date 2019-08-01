const faker = require('faker');
const db = require('../cassandra.js');

/* sample data */
const dates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ratings = ['PG-13', 'R', 'TV-PG', 'NR', 'PG'];
// const actors = ['Elvis Presley', 'John Travolta', 'John Belushi', 'George Clooney', 'Natalie Portman', 'Scarlett Johannsson', 'Marlon Brando', 'Margot Robbie', 'Will Smith', 'Chris Evans', 'Robert Downey Jr', 'Jon Bon Jovi', 'Miley Cyrus', 'Keanu Reeves', 'Lawrence Fishburne', 'Samuel L. Jackson', 'Brad Pitt', 'Angelina Jolie', 'Emma Watson', 'Alan Rickman', 'Benedict Cumberbatch', 'Benedict Wong'];
// const roles = ['Director', 'Producer', 'Forrest', 'Neo', 'Harry Potter', 'Aragorn', 'A Lone Fish', 'Themself', 'Associate Director', 'Associate Producer', 'Stagehand', 'Yodelist', 'Emily', 'James', 'Sarah', 'Luke Skywalker', 'Gandalf', 'Frodo', 'Arwen', 'Sauron'];

const getRandomNum = max => Math.floor(Math.random() * max);

/* Entry Generators */
const generatePersonnelMovieEntry = (personnelId) => {
  return {
    personnel_id: personnelId,
    movie_id: getRandomNum(9999) + 1,
    title: faker.commerce.productName(),
    release_date: `${dates[getRandomNum(11)]} ${getRandomNum(27) + 1}`,
    vudu_rating: getRandomNum(5) + 1,
    runtime: `${getRandomNum(40) + 100} min`,
    rating: ratings[getRandomNum(ratings.length)],
    rt_rating: getRandomNum(100),
    price: `$${getRandomNum(30)}.99`,
    thumbnail_url: `https://sdc1-cast-and-crew.s3-us-west-1.amazonaws.com/movie${getRandomNum(49) + 1}.jpg`,
  };
};

const generateMoviePersonnelEntry = (movieId) => {
  return {
    movie_id: movieId,
    // role: roles[getRandomNum(roles.length)],
    // personnel_name: actors[getRandomNum(actors.length)],
    role: faker.findName().replace("'", ''),
    personnel_name: faker.findName().replace("'", ''),
    personnel_id: getRandomNum(9999) + 1,
    thumbnail_url: `https://sdc1-cast-and-crew.s3-us-west-1.amazonaws.com/personnel${getRandomNum(49) + 1}.jpg`
  };
};

/* Seeding function */
const cassandraSeed = async () => {
  // TODO: await TRUNCATE tables first
  console.time('cassandra total seeding: ');
  console.time('personnel_movie');
  let personnelMovieQueries = [];
  let personnelMovieCompletion = 0;

  // personnel_movies entries -- 5-8 movies per personnel
  for (let i = 1; i <= 20000; i++) {
    for (let k = 1; k < getRandomNum(3) + 5; k++) {
      personnelMovieQueries.push({
        query: `INSERT INTO personnel_movie JSON '${JSON.stringify(generatePersonnelMovieEntry(i))}'`
      });
    }

    if (i % 2000 === 0) {
      personnelMovieCompletion += 10;
      console.log(`personnel_movie seeded ${personnelMovieCompletion}%`);
    }

    if (i % 25 === 0) {
      await db.client.batch(personnelMovieQueries, { prepare: true })
      personnelMovieQueries = [];
    }
  }

  console.timeEnd('personnel_movie');

  /* movie_personnel entries */
  console.time('movie_personnel');

  let moviePersonnelQueries = [];
  let moviePersonnelCompletion = 0;
  for (let x = 1; x <= 20000; x++) {
    for (let y = 1; y < getRandomNum(5) + 5; y++) {
      moviePersonnelQueries.push({
        query: `INSERT INTO movie_personnel JSON '${JSON.stringify(generateMoviePersonnelEntry(x))}'`,
      });
    }

    if (x % 2000 === 0) {
      moviePersonnelCompletion += 10;
      console.log(`movie_personnel seeded ${moviePersonnelCompletion}%`);
    }

    if (x % 25 === 0) {
      await db.client.batch(moviePersonnelQueries, { prepare: true })
      moviePersonnelQueries = [];
    }
  }

  console.timeEnd('movie_personnel');
  console.timeEnd('cassandra total seeding: ');
};

cassandraSeed();

module.exports = {
  cassandraSeed,
};

// ////// Seeding Cassandra without a CSV /////////

// Personnel_Movie table:

// 20-30 movies per personnel
// for (personnel_id < 10,000)
// at current id
// fill with 20-30 movies

// 10-15 personnel per movie
// for (movie_id < 10M)
// at current id// fill with 10-15 personnel
//
