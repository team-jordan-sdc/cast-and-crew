import React from 'react';

const Movie = ({movie}) => (
  <div className="personnelMovie">
    <div className="movie_thumbnail"><img src={movie.thumbnail_url}></img></div>
  </div>
)

export default Movie;