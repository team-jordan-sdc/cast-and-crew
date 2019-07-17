const mongoose = require('mongoose');
const progress = require('cli-progress');
const data = require('./sampleData');
const { fakeMovie, fakePersonnel } = require('./generators')
const db = require('../index.js');


/******* PROGRESS BAR *******/
const bar = new progress.Bar({}, progress.Presets.shades_classic);
let completed = 0;
bar.start(100, 0);

const seed = async () => {
  await db.Personnel.insertMany(fakePersonnel());
  const personnelList = await db.Personnel.find().distinct('_id').exec();

  return new Promise(resolve => { //we want async nature for our tests

    for (let i = 1; i <= 100; i++) {
      let currentMovie = new db.Movie(fakeMovie(personnelList));
      currentMovie.id = i;
      currentMovie.save().then(async () => {
        bar.update(++completed);
        if (completed === 100) {
          bar.stop();
          console.log('Finished seeding!');
          await mongoose.connection.close();
          resolve();
        }
      });
    }

  });
};/**********************************/

module.exports.seed = seed;