require('dotenv').config();
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }
});

knex.schema.hasTable('movies').then((exists) => {
  if (!exists) {
    knex.schema.createTable('movies', (table) => {
      table.increments(); // increments + sets as primary id
      table.string('title', 500);
      table.string('release_date');
      table.string('vudu_rating');
      table.string('runtime');
      table.string('rating');
      table.string('rt_rating');
      table.string('price');
      table.string('thumbnail_url');
      // TODO: add onDelete('CASCADE') to id
    }).catch(err => console.log(err));
  }
}).catch(err => console.log(err));

knex.schema.hasTable('movies_personnel').then((exists) => {
  if (!exists) {
    knex.schema.createTable('movies_personnel', (table) => {
      table.integer('movie_id');
      table.integer('personnel_id');
      table.string('role');
      table.foreign('movie_id').references('id').inTable('movies');
      table.foreign('personnel_id').references('id').inTable('personnel');
      table.index('movie_id', 'personnel_id');
      table.index('personnel_id', 'movie_id');
    }).catch(err => console.log(err));
  }
}).catch(err => console.log(err));

knex.schema.hasTable('personnel').then((exists) => {
  if (!exists) {
    knex.schema.createTable('personnel', (table) => {
      table.increments(); // increments + sets as primary id
      // TODO: add onDelete('CASCADE') to id
      table.string('name');
      table.string('thumbnail_url');
    }).catch(err => console.log(err));
  }
}).catch(err => console.log(err));

// CRUD Routes

// Read
const getMovieById = (id) => {
  return knex.select().table('movies').where({ id });
};

const getPersonnelById = (id) => {
  return knex.select().table('personnel').where({ id });
};

const getRelatedPersonnel = (movieId) => {
  return knex.raw(`
  SELECT personnel.name, personnel.id, movies_personnel.role, personnel.thumbnail_url
  FROM movies_personnel
    JOIN movies ON movies.id = movies_personnel.movie_id
    JOIN personnel ON personnel.id = movies_personnel.personnel_id
  WHERE movies_personnel.movie_id = ${movieId}
  ;`);
};

const getRelatedMovies = (personnelId) => {
  return knex.raw(`
  SELECT movies.title, movies.thumbnail_url, movies.release_date, movies.rating, movies.runtime, movies.vudu_rating, movies.rt_rating, movies.price
  FROM movies_personnel
    JOIN movies ON movies.id = movies_personnel.movie_id
    JOIN personnel ON personnel.id = movies_personnel.personnel_id
  WHERE movies_personnel.personnel_id = ${personnelId}
  ;`);
};

// Create
const addMovieEntry = (movieObj) => {
  return knex('movies').insert(movieObj);
  // add entries to junction table?
};

const addPersonnelEntry = (movieObj) => {
  return knex('personnel').insert(movieObj);
  // add entries to junction table?
};

const addRelationEntry = (movieId, personnelId) => {
  return knex('movies_personnel').insert({ movie_id: movieId, personnel_id: personnelId });
};

// Update

// Delete
const deletePersonnelById = (personnelId) => {
  knex('personnel').where({ id: personnelId }).del();
};

const deleteRelation = (movieId, personnelId) => {
  knex('movies_personnel').where({ movie_id: movieId, personnel_id: personnelId });
};

module.exports = {
  getMovieById,
  getPersonnelById,
  getRelatedPersonnel,
  getRelatedMovies,
  addMovieEntry,
  addPersonnelEntry,
  addRelationEntry,
  deletePersonnelById,
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
