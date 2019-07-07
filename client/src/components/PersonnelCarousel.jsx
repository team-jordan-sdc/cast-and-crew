import React from 'react';
import Person from './Person.jsx';

class PersonnelCarousel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      personnel: {},
    }
  }

  componentDidMount(){
    var personnel = {};

    this.props.movie.personnel.forEach(person => {
      if(!personnel[person.id]) {
        personnel[person.id] = {role: [person.role]}
      } else {
        personnel[person.id].role.push(person.role);
      }
    })

    this.props.personnel.forEach(person => {
      personnel[person._id].thumbnail_url = person.thumbnail_url;
      personnel[person._id].name = person.name;
    })

    this.setState({personnel: personnel});
  }

  render(){
    return(
      <div className="container">
        {Object.keys(this.state.personnel).map(person => {
          return <div className="person"><Person info={this.state.personnel[person]}/></div>
        })}
      </div>
    )
  }

}

export default PersonnelCarousel;