import React from 'react';
import ReactDOM from 'react-dom';
import Movie from './Movie.jsx';

class MovieCarousel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      movies: this.props.featuredPersonnel
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.featuredPersonnel !== this.props.featuredPersonnel){
      this.setState({movies: this.props.featuredPersonnel});
    }
  }

  render() {
    return this.state.movies ? (
      <div className="carousel_container">
        <div id="movies_carousel"></div>
        {this.state.movies.map(movie => {
          return (
            <div className="movie"><Movie movie={movie}/></div>
          )
        })}
      </div>
    ) : <div></div>
  }

}

export default MovieCarousel;