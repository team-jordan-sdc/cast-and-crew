import React from 'react';

const Movie = ({ movie }) => (
  <div className="personnelMovie">
    <div className="movie_info">
      <div className="title">{movie.title}</div>
      <div className="container">
        <div id="release_date" className="infoplate_text">{movie.release_date}</div>
        <div id="mpaa_rating" className="infoplate_text rounded">{movie.rating}</div>
        <div id="runtime" className="infoplate_text rounded">{movie.runtime}</div>
      </div>
      <div className="rating_container">
        <span className="star_rating_container">
          <div className="star_rating_empty">
            <img src="https://mapquiz.app/fec/infoplate/Star_empty.svg"></img>
          </div>
          <div className="star_rating_full" style={{ width: `${movie.vudu_rating * 17.75}px` }}>
            <img src="https://mapquiz.app/fec/infoplate/Star_full.svg"></img>
          </div>
        </span>
        <div className="rt_icon">
          <img src="https://mapquiz.app/fec/infoplate/Tomato_certified_fresh.svg"></img>
        </div>
        <div className="rt_rating">{movie.rt_rating}%</div>
      </div>
      <div className="text">{`Rent/Buy from ${movie.price}`}</div>
    </div>
    <div className="movie_thumbnail">
      <img src={movie.thumbnail_url}></img>
    </div>
  </div>
)

export default Movie;
