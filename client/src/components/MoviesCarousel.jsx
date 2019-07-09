import React from 'react';
import Movie from './Movie.jsx';
import $ from 'jquery';

class MovieCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      position: 0
    }
    this.moveForward = this.moveForward.bind(this);
    this.moveBackward = this.moveBackward.bind(this);
  }
  /* When App.jsx passes new movie information (as a prop), rerender the component. */
  componentDidUpdate(prevProps) {
    if(prevProps.featuredPersonnel !== this.props.featuredPersonnel){
      this.setState({movies: this.props.featuredPersonnel, position: 0});
    }
  }

  /* Restrict the carousel from moving too far backwards */
  moveBackward() {
    if (this.state.position + 800 > 0) {
      this.setState({position: 0});
    } else {
      this.setState({position: this.state.position + 800});
    }
  };

  /* Restrict the carousel from moving too far forward. Its left position
     should not extend further than width of carousel - width of window. */
  moveForward() {
    if(($('#movies_carousel').position().left - 800) * -1 > $('#movies_carousel').width() - $(window).width()) {
      this.setState({position: ($('#movies_carousel').width() - $(window).width()) * -1});
    } else {
      this.setState({position: this.state.position - 800});
    }
  }

  render() {
    /* Only render carousel if state is up to date */
    return this.state.movies ? (
      <div className="carousel_container">
        <div id="m_backward" onClick={this.moveBackward}></div>
        <div id="movies_carousel" style={{ transform: `translate3d(${this.state.position}px, 0px, 0px)` }}>
          {this.state.movies.map(movie => <div className="movie"><Movie movie={movie} /></div>)}
        </div>
        <div id="m_forward" onClick={this.moveForward}></div>
      </div>
    ) : null
  }

}

export default MovieCarousel;
