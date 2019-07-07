import React from 'react';
import Person from './Person.jsx';

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

  moveBackward(){
    this.state.position !== 0 && this.setState({position: this.state.position + 800});
  };

  moveForward(){
    this.state.position > Object.keys(this.props.personnel).length * -100 && this.setState({position: this.state.position - 800});
  }

  render() {
    return (
      <div id="carousel_container">
        <div id="carousel" style={{transform: `translate3d(${this.state.position}px, 0px, 0px)`}}>
          {this.props.personnel.map(person => {
            return <div className="person"><Person info={person} /></div>
          })}
        </div>
        <button onClick={() => this.moveBackward()}>Backward</button>
        <button onClick={this.moveForward}>Forward</button>
      </div>
    )
  }

}

export default PersonnelCarousel;