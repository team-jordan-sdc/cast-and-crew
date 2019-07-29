const faker = require('faker');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'mattsdc',
    password: 'password',
    database: 'castandcrew',
  }
});

// NOTE: might need relational table (roles)

// const db = require('../index.js');

/* ********* Sample Data ********** */

const dates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ratings = ['PG-13', 'R', 'TV-PG', 'NR', 'PG'];

const getRandomNum = max => Math.floor(Math.random() * max);

/* ****** Generator functions ********* */

const generateSinglePersonnel = () => ({
  name: faker.name.findName(),
  thumbnail_url: `https://sdc1-cast-and-crew.s3-us-west-1.amazonaws.com/personnel${getRandomNum(49) + 1}.jpg`,
});

const generateMoviePersonnel = () => {
  const moviePersonnel = [];
  for (let i = 0; i <= getRandomNum(12) + 10; i++) {
    moviePersonnel.push({ id: getRandomNum(99) + 1, role: faker.name.findName() });
  }
  return moviePersonnel;
};

const generateFakeMovie = () => ({
  title: faker.commerce.productName(),
  release_date: `${dates[getRandomNum(11)]} ${getRandomNum(27) + 1}`,
  vudu_rating: getRandomNum(5) + 1,
  runtime: `${getRandomNum(40) + 100} min`,
  rating: ratings[getRandomNum(ratings.length)],
  rt_rating: getRandomNum(100),
  price: `$${getRandomNum(30)}.99`,
  thumbnail_url: `https://sdc1-cast-and-crew.s3-us-west-1.amazonaws.com/movie${getRandomNum(49) + 1}.jpg`,
  personnel: JSON.stringify(generateMoviePersonnel()),
});

/* *********** Seeding function ********** */

const seed = async () => {
  console.time('seed');
  await knex.raw('TRUNCATE TABLE movies RESTART IDENTITY CASCADE');
  let fakeMovies = [];
  for (let i = 1; i <= 10000000; i++) {
    fakeMovies.push(generateFakeMovie());
    if (i % 1000 === 0) {
      await knex('movies').insert(fakeMovies);
      // batch insert?
      fakeMovies = [];
    }
  }

  await knex.raw('TRUNCATE TABLE personnel RESTART IDENTITY CASCADE');
  let fakePersonnel = [];
  for (let i = 1; i <= 100; i++) {
    fakePersonnel.push(generateSinglePersonnel());
    await knex('personnel').insert(fakePersonnel);
    // batch insert?
    fakePersonnel = [];
  }
  console.timeEnd('seed');
};

seed();
