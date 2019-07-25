import React from 'react';
import ReactDOM from 'react-dom';
import Person from './Person.jsx';
import styled from 'styled-components'
import { CarouselContainer, Title, Container, NavBackward, NavForward, Carousel, Plate } from '../styling.jsx';

class PersonnelCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      personnel: {},
    }
    this.moveForward = this.moveForward.bind(this);
    this.moveBackward = this.moveBackward.bind(this);
  }

  /* Restrict the carousel from moving too far backwards */
  moveBackward() {
    if (this.state.position + 800 > 0) {
      this.setState({ position: 0 });
    } else {
      this.setState({ position: this.state.position + 800 });
    }
  };

  /* Restrict the carousel from moving too far forward. Its left position
     should not extend further than width of carousel - width of window. */
  moveForward() {
    const position = ReactDOM.findDOMNode(this.refs['PersonnelCarousel']).getBoundingClientRect();
    if ((position.left - 800) * -1 > position.width - window.innerWidth) {
      this.setState({ position: (position.width - window.innerWidth) * -1 });
    } else {
      this.setState({ position: this.state.position - 800 });
    }
  };

  render() {
    return (
      <Container>
        <Title>Cast & Crew</Title>
        <CarouselContainer>
          <NavBackward onClick={this.moveBackward} />
          <NavForward onClick={this.moveForward} />
          <Carousel ref="PersonnelCarousel" position={this.state.position}>
            {this.props.personnel.map(person => <Plate><Person info={person} set={this.props.set} /></Plate>)}
          </Carousel>
        </CarouselContainer>
      </Container>
    )
  };

}

export default PersonnelCarousel;
