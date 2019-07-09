module.exports.mockData = Promise.resolve({
  "json": function () { return this }, //mock fetch's response.json() function
  "_id": "5d218036d379e56725e8686b",
  "title": "The Matrix",
  "release_date": "May 12",
  "vudu_rating": 3,
  "rt_rating": 82,
  "price": "$9.99",
  "thumbnail_url": "https://mapquiz.app/fec/thumbnails/movie_thumbnail32.jpeg",
  "personnel": [
    {
      "_id": {
        "_id": "1",
        "name": "Will",
        "thumbnail_url": "https://mapquiz.app/fec/headshots/headshot16.jpeg",
      },
      "role": "Yodelist",
    },
    {
      "_id": {
        "_id": "2",
        "name": "Resen",
        "thumbnail_url": "https://mapquiz.app/fec/headshots/headshot16.jpeg",
      },
      "role": "Lead Guitarist",
    },
  ],
});

/* Mock fetch() */
global.fetch = jest.fn(() => module.exports.mockData);