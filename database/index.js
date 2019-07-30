const { generateFakeMovie } = require('./seeder3.0/seed.js');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'mattsdc',
    password: 'password',
    database: 'castandcrew',
  }
});

knex.schema.createTable('movies', (table) => {
  table.increments();
  table.string('title', 500);
  table.string('release_date');
  table.string('vudu_rating');
  table.string('runtime');
  table.string('rating');
  table.string('rt_rating');
  table.string('price');
  table.string('thumbnail_url');
  table.json('personnel');
}).catch(err => console.log(err));

knex.schema.createTable('movies_personnel', (table) => {
  table.integer('movie_id');
  table.integer('personnel_id');
  table.string('role');
}).catch(err => console.log(err));

knex.schema.createTable('personnel', (table) => {
  table.increments();
  table.string('name');
  table.string('thumbnail_url');
}).catch(err => console.log(err));

// CRUD Routes

// Read
const getMovieById = (id) => {
  return knex.select().table('movies').where({ id });
};

const getPersonnelById = (id) => {
  knex.select().table('personnel').where({ id });
};

const getRelatedPersonnel = (movieId) => {
  return knex.raw(`
  SELECT personnel.name, movies_personnel.role, personnel.thumbnail_url
  FROM movies_personnel
    JOIN movies ON movies.id = movies_personnel.movie_id
    JOIN personnel ON personnel.id = movies_personnel.personnel_id
  WHERE movies_personnel.movie_id = ${movieId};
  `);
};

const getRelatedMovies = (personnelId) => {
  return knex.raw(`
  SELECT movies.title, movies.thumbnail_url
  FROM movies_personnel
    JOIN movies ON movies.id = movies_personnel.movie_id
    JOIN personnel ON personnel.id = movies_personnel.personnel_id
  WHERE movies_personnel.personnel_id = ${personnelId}
  ;`);
};

// Create
const addMovieEntry = () => {
  knex('movies').insert(generateFakeMovie());
};

// Update

// Delete

module.exports = {
  getMovieById,
  getPersonnelById,
  getRelatedPersonnel,
  getRelatedMovies,
  addMovieEntry,
};

// ////// Get related personnel ////////
// SELECT * unnest(Movies.personnel) AS currentPersonnel     <<-- is this correct way of unnesting?
//  INNER JOIN Personnel
//  WHERE currentPersonnel.id = Personnel.id


// ///// Get related movies /////////////
// populate foreign key with object just like mongo?
// use join -- select * from personnel where id = ??
// nested queries
// inner join on movie, unnest array, inner join on array

/*
  - perform a query to get the featuredMovie
- select * from movies where id = id (target current movie)
// unnest here?
- join personnel where personnel.id = unnest(movies.personnel).id
 //grab personnel whose id is contained in movie's personnel array
 //

 //select * from movies where id = id
 //select * from unnest(movies.personnel)
 //inner join where id = personnel_id
 unnest, inner join
*/
