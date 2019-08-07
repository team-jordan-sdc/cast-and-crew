const fs = require('fs');
const faker = require('faker');
const csvWriter = require('csv-write-stream');
const data = require('./dataGenerator.js');

const getRandomNum = max => Math.floor(Math.random() * max);

/* *** Movies Table *** */
// NOTE: changed to 1,000,000 movies
const writeMoviesCSV = async () => {
  const writer = csvWriter({
    separator: '|',
    headers: ['title', 'release_date', 'vudu_rating', 'runtime', 'rating', 'rt_rating', 'price', 'thumbnail_url']
  });
  console.log('movie CSV started');
  console.time('write movies CSV');

  let completion = 0;

  writer.pipe(fs.createWriteStream('database/postgres/seed/CSV_files/movies.csv'));

  // 1,000,000 movies
  for (let i = 1; i <= 1000000; i++) {

    if (!writer.write({
      title: faker.commerce.productName(),
      release_date: `${data.dates[getRandomNum(11)]} ${getRandomNum(27) + 1}`,
      vudu_rating: getRandomNum(5) + 1,
      runtime: `${getRandomNum(40) + 100} min`,
      rating: data.ratings[getRandomNum(data.ratings.length)],
      rt_rating: getRandomNum(100),
      price: `$${getRandomNum(30)}.99`,
      thumbnail_url: `https://sdc1-cast-and-crew.s3-us-west-1.amazonaws.com/movie${getRandomNum(49) + 1}.jpg`,
    })) {
      await new Promise (resolve => writer.once('drain', resolve));
    }

    if (i % 2500000 === 0) {
      completion += 25;
      console.log(`movie csv ${completion}% complete`)
    }
  }

  writer.end();

  console.timeEnd('write movies CSV');
};

/* *** Personnel Table ** */
const writePersonnelCSV = async () => {
  const writer = csvWriter({
    separator: '|',
    headers: ['name', 'thumbnail_url']
  });
  console.log('personnel CSV started');
  console.time('write personnel csv');

  let completion = 0;

  writer.pipe(fs.createWriteStream('database/postgres/seed/CSV_files/personnel.csv'));
  // 1,000,000 personnel
  for (let i = 1; i <= 1000000; i++) {

    if (!writer.write({
      name: faker.name.findName(),
      thumbnail_url: `https://sdc1-cast-and-crew.s3-us-west-1.amazonaws.com/personnel${getRandomNum(49) + 1}.jpg`,
    })) {
      await new Promise (resolve => writer.once('drain', resolve));
    }

    if (i % 250000 === 0) {
      completion += 25;
      console.log(`personnel csv ${completion}% complete`);
    }
  }

  writer.end();

  console.timeEnd('write personnel csv');
};

/* *** Movies_Personnel Table *** */
// NOTE: Split this into 5 chunks so it'll copy
// OR, lower # of movies
// NOTE: lowered # of movies to 1,000,000
const writeMoviesPersonnelCSV = async () => {
  const writer = csvWriter({
    separator: '|',
    headers: ['movie_id', 'personnel_id', 'role']
  });
  console.log('movies_personnel CSV started');
  console.time('write movies_personnel csv');

  let completion = 0;

  writer.pipe(fs.createWriteStream('database/postgres/seed/CSV_files/movies_personnel.csv'));
  // 1,000,000 movies
  for (let i = 1; i <= 1000000; i++) {
    // 10-15 actors per movie
    for (let k = 1; k < getRandomNum(5) + 10; k++) {
      if (!writer.write({
        movie_id: i,
        personnel_id: getRandomNum(999999) + 1,
        role: faker.name.findName(),
      })) {
        await new Promise (resolve => writer.once('drain', resolve));
      }
    }

    if (i % 250000 === 0) {
      completion += 25;
      console.log(`movie_personnel csv ${completion}% complete`);
    }
  }

  writer.end();

  console.timeEnd('write movies_personnel csv')
};

const writeCSVs = async () => {
  await writeMoviesCSV();
  await writePersonnelCSV();
  await writeMoviesPersonnelCSV();
};

writeCSVs();
