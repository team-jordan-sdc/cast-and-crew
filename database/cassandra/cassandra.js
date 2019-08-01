const cassandra = require('cassandra-driver');

const PlainTextAuthProvider = cassandra.auth.PlainTextAuthProvider;
const client = new cassandra.Client({
  contactPoints: ['localhost:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'castandcrew',
  authProvider: new PlainTextAuthProvider('mattsdc', 'password')
});

// 10M movies; 10K personnel
/* get list of movies related with personnel */
// SELECT * FROM Personnel_Movie WHERE personnel_id = 123
const Personnel_Movie =  `
  CREATE TABLE Personnel_Movie
    (
      personnel_id INT,
      movie_id INT,
      title TEXT,
      release_date TEXT,
      vudu_rating INT,
      runtime TEXT,
      rating TEXT,
      rt_rating INT,
      price TEXT,
      thumbnail_url TEXT,
      PRIMARY KEY(personnel_id, movie_id)
    );
`;

// SELECT * FROM Movie_Personnel WHERE movie_id = 1
const Movie_Personnel = `
  CREATE TABLE Movie_Personnel
      (
        movie_id int,
        role text,
        personnel_name text,
        personnel_id int,
        thumbnail_url TEXT,
        PRIMARY KEY(movie_id, personnel_id)
      );
`;

/* Queries */
const getEntryById = (table, id) => {
  const query = `SELECT * from ${table} WHERE id = ${id}`;
  return client.execute(query);
};

const getRelatedPersonnel = (movieId) => {
  const query = `SELECT * FROM movie_personnel WHERE movie_id = ${movieId};`;
  return client.execute(query);
};

const getRelatedMovies = (personnelId) => {
  const query = `SELECT * FROM personnel_movie WHERE personnel_id = ${personnelId};`;
  return client.execute(query);
};

module.exports = {
  client,
  getEntryById,
  getRelatedPersonnel,
  getRelatedMovies,
};


/*
Model around your queries (not relations):
- Key queries:
  - Personnel associated with movie (name, role, thumbnail)
  - Movies associated with personnel (title, thumbnail, price, rating, rt_rating)

In essence, query will filter out entries that are not associated with a given id

LIGHTBULB: table should already contain answer (no joining)
  - different answers? different tables -- optimizing for reads
  - Duplication is inevitable

EXISTENTIAL QUESTIONS:
- To use collections or not?
- Build many tables, each answering its own question

CREATE TABLE Personnel_Movie
  (
    Personnel_id int primary key,
    Personnel_name text,
    Movie_name text,
  );

CREATE TABLE Movie_Personnel
    (
      Movie_name text primary key,
      Personnel_name text,
      Perosnnel_id int
    );


CREATE TABLE movie_personnel (
  related_movies<set> PRIMARY KEY,
  name,
  thumbnail_url,
)

CREATE TABLE personnel (
  related_personnel<set> PRIMARY KEY
  title
  release_date
  vudu_rating
  runtime
  rating
  rt_rating
  price
  thumbnail_url
)

movies

personnel

roles?
*/
// /* MONGO SCHEMA CLONE */
// const Movies = `
//   CREATE TABLE movies (
//     id INT,
//     title TEXT,
//     release_date TEXT,
//     vudu_rating INT,
//     runtime TEXT,
//     rating TEXT,
//     rt_rating INT,
//     price TEXT,
//     thumbnail_url TEXT,
//     personnel set<text>,
//     PRIMARY KEY(id)
//   )
//   WITH CLUSTERING ORDER BY (createdAt DESC);
// `;

// const Personnel = `
//   CREATE TABLE personnel (
//     id INT,
//     name TEXT,
//     thumnail_url TEXT,
//     PRIMARY KEY(id)
//   )
//   WITH CLUSTERING ORDER BY (createdAt DESC);
// `;

