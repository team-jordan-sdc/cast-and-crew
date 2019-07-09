const mongoose = require('mongoose');
const db = require('../database/index.js');
const seed = require('../database/seeder.js').seed;

describe('Database seeder', () => {
  let movies;
  let personnel;

  beforeAll(async () => {
    await seed();
    await db.Movie.find().then(results => movies = results);
    await db.Personnel.find().then(results => personnel = results);
  });

  test('should populate movies collection with 100 documents', () => {
    expect(movies.length).toBe(100);
  });

  test('should create movie documents with the correct properties', () => {
   expect(movies[0].title).toBeTruthy();
   expect(movies[0].rt_rating).toBeTruthy();
   expect(movies[0].price).toBeTruthy();
  });

  test('should populate personnel with 22 people', () => {
    expect(personnel.length).toBe(22);
  });

  test('should create movie documents with the correct properties', () => {
   expect(personnel[0].name).toBeTruthy();
   expect(personnel[0].thumbnail_url).toBeTruthy();
  });

  afterAll(async () => {
    await db.Movie.collection.drop();
    await db.Personnel.collection.drop();
    await mongoose.connection.close();
    console.log('Wrapping up done!')
  })

})

