const fs = require('fs');
const faker = require('faker');
const csvWriter = require('csv-write-stream');
const db = require('../index.js');

const dates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ratings = ['PG-13', 'R', 'TV-PG', 'NR', 'PG'];

const getRandomNum = (max) => {
  return Math.floor(Math.random() * max);
};

const generatePersonnelList = () => {
  const personnelList = [];
  for (let i = 0; i < 50; i++) {
    personnelList.push({
      name: faker.name.findName(),
      thumbnail_url: `https://sdc1-cast-and-crew.s3-us-west-1.amazonaws.com/personnel${getRandomNum(49) + 1}.jpg`,
    });
  }
  return personnelList;
};

const generateMoviePersonnel = (max, personnelArray) => {
  let moviePersonnel = [];
  for (let i = 0; i <= getRandomNum(25) + 10; i++) {
    moviePersonnel.push({ _id: personnelArray[getRandomNum(max)], role: faker.name.findName() });
  }
  return moviePersonnel;
};

const generateFakeMovie = (personnelArray) => {
  return {
    title: faker.commerce.productName(),
    release_date: `${dates[getRandomNum(11)]} ${getRandomNum(27) + 1}`,
    vudu_rating: getRandomNum(5) + 1,
    runtime: `${getRandomNum(40) + 100} min`,
    rating: ratings[getRandomNum(ratings.list)],
    rt_rating: getRandomNum(100),
    price: `$${getRandomNum(30)}.99`,
    thumbnail_url: `https://sdc1-cast-and-crew.s3-us-west-1.amazonaws.com/movie${getRandomNum(49) + 1}.jpg`,
    personnel: generateMoviePersonnel(21, personnelArray)
  };
};


const seed = async () => {
  console.time('seeding time');
  await db.Personnel.insertMany(generatePersonnelList());
  const moviePersonnel = await db.Personnel.find().distinct('_id').exec();

  return new Promise(resolve => {

    for (let i = 1; i <= 10000; i++) {
      const currentMovie = new db.Movie(generateFakeMovie(moviePersonnel));
      currentMovie.id = i;

      currentMovie.save()
        .then(async () => {
          if (i === 10000) {
            // await mongoose.connection.close();
            resolve();
            console.log(`seeding complete with ${i} entries`);
            console.timeEnd('seeding time');
          }
        })
        .catch(err => console.log(err));
    }
  });
};

// db.dropDatabase()
//   .then(() => seed());

seed();
