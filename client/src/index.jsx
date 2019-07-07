import React from 'react';
import ReactDOM from 'react-dom';
import PersonnelCarousel from './components/PersonnelCarousel.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personnel: [],
      featuredMovie: [],
    }
    this.getPersonnel = this.getPersonnel.bind(this);
  }

  componentDidMount(){
    this.getFeaturedMovie('feature=true')
      .then(() => this.getPersonnel())
  }

  getFeaturedMovie(querystring){
    return fetch(`/api/movies?${querystring}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(results => results.json())
      .then(results => this.setState({ featuredMovie: results }))
  }

  getPersonnel(){
    fetch(`/api/personnel?id=${this.state.featuredMovie._id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(results => results.json())
      .then(results => this.setState({ personnel: results }))
  }

  render() {
    return (
      <div className="container">
        <PersonnelCarousel personnel={this.state.personnel}/>
      </div>
    )
  }

}

ReactDOM.render(<App/>, document.getElementById('app'));