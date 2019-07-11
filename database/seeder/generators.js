const data = require('./sampleData');

/*********** HELPER FUNCTIONS ***********/
const getRandomNum = (max) => {
  return Math.floor(Math.random() * max);
};

const generatePersonnelForMovies = (max, personnelList) => {
  let results = [];
  for (let i = 0; i <= getRandomNum(25) + 10; i++) { //each movie will have at least 10 members
    results.push({ _id: personnelList[getRandomNum(max)], role: data.roles[getRandomNum(19)] });
  }
  return results;
}; /***********************************/

module.exports.fakePersonnel = () => {
  let fakePersonnel = [];
  var count = 1;
  for (let actor of data.actors) {
    fakePersonnel.push({
      name: actor,
      thumbnail_url: `https://mapquiz.app/fec/headshots/headshot${count}.jpeg`,
    });
    count < 16 && count++;
  }
  return fakePersonnel;
};

module.exports.fakeMovie = (personnelList) => {
  return {
    title: data.titles[getRandomNum(31)],
    release_date: `${data.dates[getRandomNum(12)]} ${getRandomNum(27) + 1}`,
    vudu_rating: getRandomNum(5) + 1,
    runtime: `${getRandomNum(40) + 100} min`,
    rating: data.ratings[getRandomNum(5)],
    rt_rating: getRandomNum(101),
    price: `$${getRandomNum(30) + 1}.99`,
    thumbnail_url: `https://mapquiz.app/fec/thumbnails/movie_thumbnail${getRandomNum(46) + 1}.jpeg`,
    personnel: generatePersonnelForMovies(21, personnelList)
  };
};
