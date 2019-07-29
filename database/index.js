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

knex.schema.createTable('personnel', (table) => {
  table.increments();
  table.string('name');
  table.string('thumbnail_url');
}).catch(err => console.log(err));

// CRUD Routes

// Read
const getMovieById = (id) => {
  knex.select().table('movies').where({ id });
};

const getPersonnelById = (id) => {
  knex.select().table('personnel').where({ id });
};

const getRelatedPersonnel = (movieId) => {
  knex.raw(`SELECT * unnest(Movies.personnel) AS currentPersonnel
              INNER JOIN Personnel
              WHERE currentPersonnel.id = Personnel.id`);
};

const getRelatedMovies = (personnelId) => {
  // 10 million movies fml
  // where movie.id contains
};

// Create

// Update

// Delete

module.exports = {
  getMovieById,
  getPersonnelById,
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
