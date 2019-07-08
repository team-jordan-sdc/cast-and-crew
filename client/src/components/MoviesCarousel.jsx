import React from 'react';
import ReactDOM from 'react-dom';
import Movie from './Movie.jsx';
import $ from 'jquery';

class MovieCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: this.props.featuredPersonnel,
      position: 0
    }
    this.moveForward = this.moveForward.bind(this);
    this.moveBackward = this.moveBackward.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.featuredPersonnel !== this.props.featuredPersonnel){
      this.setState({movies: this.props.featuredPersonnel});
    }
  }

  moveBackward() {
    if (this.state.position + 800 > 0) {
      this.setState({position: 0});
    } else {
      this.setState({position: this.state.position + 800});
    }
  };

  moveForward() {
    if(($('#movies_carousel').position().left - 800) * -1 > $('#movies_carousel').width() - $(window).width()) {
      this.setState({position: ($('#movies_carousel').width() - $(window).width()) * -1});
    } else {
      this.setState({position: this.state.position - 800});
    }
  }

  render() {
    return this.state.movies ? (
      <div className="carousel_container">
        <div id="m_backward" onClick={this.moveBackward}></div>
        <div id="movies_carousel" style={{ transform: `translate3d(${this.state.position}px, 0px, 0px)` }}>
          {this.state.movies.map(movie => <div className="movie"><Movie movie={movie} /></div>)}
        </div>
        <div id="m_forward" onClick={this.moveForward}></div>
      </div>
    ) : <div></div>
  }

}

export default MovieCarousel;