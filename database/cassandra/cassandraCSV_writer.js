const csvWriter = require('csv-write-stream');
const fs = require('fs');
const cassandraSeed = require('./cassandraSeed.js');

const moviePersonnelWriter = csvWriter({ sendHeaders: true, separator: '|' });
const personnelMovieWriter = csvWriter({ sendHeaders: true, separator: '|' });

const createCsvFile = () => {
  moviePersonnelWriter.pipe(fs.createWriteStream('./movie_personnel.csv'));
  personnelMovieWriter.pipe(fs.createWriteStream('./personnel_movie.csv'));
};
