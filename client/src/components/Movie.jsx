import React from 'react';

const Movie = ({movie}) => (
  <div className="personnelMovie">
    <div className="movie_info">
      <div className="title">{movie.title}</div>
      <div className="text">{movie.release_date}</div>
      <div className="text">{`Rent/Buy from ${movie.price}`}</div>
    </div>
    <div className="movie_thumbnail"><img src={movie.thumbnail_url}></img></div>
  </div>
)

export default Movie;