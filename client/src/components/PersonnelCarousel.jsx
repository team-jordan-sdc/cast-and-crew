import React from 'react';
import Person from './Person.jsx';
import $ from 'jquery';

class PersonnelCarousel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      position: 0,
      personnel: {},
    }
    this.moveForward = this.moveForward.bind(this);
    this.moveBackward = this.moveBackward.bind(this);
  }

  /* Restrict the carousel from moving too far backwards */
  moveBackward(){
    if (this.state.position + 800 > 0) {
      this.setState({position: 0});
    } else {
      this.setState({position: this.state.position + 800});
    }
  };

  /* Restrict the carousel from moving too far forward. Its left position
     should not extend further than width of carousel - width of window. */
  moveForward(){
    if(($('#personnel_carousel').position().left - 800) * -1 > $('#personnel_carousel').width() - $(window).width()) {
      this.setState({position: ($('#personnel_carousel').width() - $(window).width()) * -1});
    } else {
      this.setState({position: this.state.position - 800});
    }
  }

  render() {
    return (
      <div className="carousel_container">
          <div id="p_backward" onClick={this.moveBackward}></div>
          <div id="personnel_carousel" style={{ transform: `translate3d(${this.state.position}px, 0px, 0px)` }}>
            {this.props.personnel.map(person =><div className="person"><Person info={person} set={this.props.set}/></div>)}
          </div>
          <div id="p_forward" onClick={this.moveForward}></div>
      </div>
    )
  }

}

export default PersonnelCarousel;
