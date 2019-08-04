const fs = require('fs');
const faker = require('faker');
const csvWriter = require('csv-write-stream');
const data = require('./dataGenerator.js');

const writer = csvWriter();


/* *** Movies Table *** */
const writeMoviesCSV = async () => {
  console.time('write movies CSV');

  let completion = 0;

  writer.pipe(fs.createWriteStream('./CSV_files/movies.csv'));

  for (let i = 1; i <= 10000000; i++) {
    if (!writer.write({
      title: faker.commerce.productName(),
      release_date: `${data.dates[data.getRandomNum(11)]} ${data.getRandomNum(27) + 1}`,
      vudu_rating: data.getRandomNum(5) + 1,
      runtime: `${data.getRandomNum(40) + 100} min`,
      rating: data.ratings[data.getRandomNum(data.ratings.length)],
      rt_rating: data.getRandomNum(100),
      price: `$${data.getRandomNum(30)}.99`,
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
  console.time('write personnel csv');

  let completion = 0;

  writer.pipe(fs.createWriteStream('./CSV_files/personnel.csv'));

  for (let i = 1; i <= 1000000; i++) {

    if (!writer.write({
      name: faker.name.findName(),
      thumbnail_url: `https://sdc1-cast-and-crew.s3-us-west-1.amazonaws.com/personnel${data.getRandomNum(49) + 1}.jpg`,
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
const writeMoviesPersonnelCSV = async (movieId) => {
  console.time('write movies_personnel csv');

  let completion = 0;

  writer.pipe(fs.createWriteStream('./CSV_files/movies_personnel.csv'));

  for (let i = 1; i <= 10000000; i++) {

    for (let k = 1; k < data.getRandomNum(5) + 5; k++) {
      if (!writer.write({
        movie_id: k,
        personnel_id: data.getRandomNum(999999) + 1,
        role: faker.name.findName(),
      })) {
        await new Promise (resolve => writer.once('drain', resolve));
      }
    }

    if (i % 2500000 === 0) {
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
