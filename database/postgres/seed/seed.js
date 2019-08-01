const { getRandomNum, generateFakeMovie, generateMoviePersonnelRelation, generateSinglePersonnel } = require('./dataGenerator.js');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'mattsdc',
    password: 'password',
    database: 'castandcrew',
  }
});

/* *********** Seeding function ********** */

const seed = async () => {
  let moviesCompletion = 0;
  let relationCompletion = 0;

  console.log('seed started');
  console.time('seed');

  await knex.raw('TRUNCATE TABLE movies RESTART IDENTITY CASCADE');
  let fakeMovies = [];
  for (let i = 1; i <= 10000000; i++) {
    fakeMovies.push(generateFakeMovie());

    if (i % 2500000 === 0) {
      moviesCompletion += 25;
      console.log(`movies ${moviesCompletion}% seeded`);
    }

    if (i % 1000 === 0) {
      await knex('movies').insert(fakeMovies);
      fakeMovies = [];
    }
  }

  await knex.raw('TRUNCATE TABLE personnel RESTART IDENTITY CASCADE');
  let fakePersonnel = [];
  let personnelCompletion = 0;

  for (let i = 1; i <= 1000000; i++) {
    fakePersonnel.push(generateSinglePersonnel());

    if (i % 250000 === 0) {
      personnelCompletion += 25;
      console.log(`personnel ${personnelCompletion}% seeded`);
    }

    if (i % 1000 === 0) {
      await knex('personnel').insert(fakePersonnel);
      fakePersonnel = [];
    }
  }

  // 10-15 personnel_id's per movie_id
  await knex.raw('TRUNCATE TABLE movies_personnel RESTART IDENTITY CASCADE');
  let moviePersonnelRelations = [];
  for (let i = 1; i <= 10000000; i++) {
    if (i % 2500000 === 0) {
      relationCompletion += 25;
      console.log(`relations ${relationCompletion}% seeded`);
    }
    // starting with movie id #1
    for (let k = 1; k < getRandomNum(5) + 5; k++) {
      // insert random number (k) of random personnel_id
      moviePersonnelRelations.push(generateMoviePersonnelRelation(i));
    }
    if (i % 1000 === 0) {
      await knex('movies_personnel').insert(moviePersonnelRelations);
      moviePersonnelRelations = [];
    }
  }

  console.timeEnd('seed');
};

// seed();
