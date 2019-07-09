import React from 'react';

const Movie = ({ movie }) => (
  <div className="personnelMovie">
    <div className="movie_info">
      <div className="title">{movie.title}</div>
      <div className="container">
        <div className="infoplate_text">{movie.release_date}</div>
        <div className="infoplate_text rounded">{movie.rating}</div>
        <div className="infoplate_text rounded">{movie.runtime}</div>
      </div>
      <div className="container">
        <div className="star_rating"><img src="https://mapquiz.app/fec/infoplate/Star_empty.svg"></img></div>
      </div>
      <div className="text">{`Rent/Buy from ${movie.price}`}</div>
    </div>
    <div className="movie_thumbnail"><img src={movie.thumbnail_url}></img></div>
  </div>
)

export default Movie;
