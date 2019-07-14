import React from 'react';
import ReactDOM from 'react-dom';
import Movie from './Movie.jsx';
import { CarouselContainer, Title, Container, NavBackward, NavForward, Carousel, Plate } from '../styling.jsx';

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
  };

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
    const position = ReactDOM.findDOMNode(this.refs['MoviesCarousel']).getBoundingClientRect();
    if((position.left - 800) * -1 > position.width - window.innerWidth) {
      this.setState({position: (position.width - window.innerWidth) * -1});
    } else {
      this.setState({position: this.state.position - 800});
    }
  };

  render() {
    /* Only render carousel if state is up to date */
    return this.state.movies ? (
      <Container>
        <Title>Movies Featuring {this.props.selectedPersonnel}</Title>
        <CarouselContainer>
          <NavBackward onClick={this.moveBackward} style={{height: '202px'}} />
          <NavForward onClick={this.moveForward} style={{height: '202px'}}/>
          <Carousel ref="MoviesCarousel" position={this.state.position}>
            {this.state.movies.map(movie => <Plate><Movie movie={movie} /></Plate>)}
          </Carousel>
        </CarouselContainer>
      </Container>
    ) : null
  };

}

export default MovieCarousel;
