const faker = require('faker');

/* ********* Sample Data ********** */

const dates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const ratings = ['PG-13', 'R', 'TV-PG', 'NR', 'PG'];

const getRandomNum = max => Math.floor(Math.random() * max);

/* ****** Generator functions ********* */

const generateSinglePersonnel = () => ({
  name: faker.name.findName(),
  thumbnail_url: `https://sdc1-cast-and-crew.s3-us-west-1.amazonaws.com/personnel${getRandomNum(49) + 1}.jpg`,
});

const generateMoviePersonnelRelation = movieId => ({
  // 10-15 cast members per movie
  // 100 cast id's
  movie_id: movieId,
  personnel_id: getRandomNum(999999) + 1,
  role: faker.name.findName(),
});

const generateFakeMovie = () => ({
  title: faker.commerce.productName(),
  release_date: `${dates[getRandomNum(11)]} ${getRandomNum(27) + 1}`,
  vudu_rating: getRandomNum(5) + 1,
  runtime: `${getRandomNum(40) + 100} min`,
  rating: ratings[getRandomNum(ratings.length)],
  rt_rating: getRandomNum(100),
  price: `$${getRandomNum(30)}.99`,
  thumbnail_url: `https://sdc1-cast-and-crew.s3-us-west-1.amazonaws.com/movie${getRandomNum(49) + 1}.jpg`,
});

module.exports = {
  getRandomNum,
  generateSinglePersonnel,
  generateMoviePersonnelRelation,
  generateFakeMovie,
};
