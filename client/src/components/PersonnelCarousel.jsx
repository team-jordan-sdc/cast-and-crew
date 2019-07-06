import React from 'react';
import Person from './Person.jsx';

class PersonnelCarousel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      position: '0, 0, 0'
    }
  }

  render(){
    return(
      <div className="container">
        {this.props.personnel.map(person => {
          return <div className="person"><Person info={person}/></div>
        })}
      </div>
    )
  }

}

export default PersonnelCarousel;