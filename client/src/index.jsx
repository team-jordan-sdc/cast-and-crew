import React from 'react';
import ReactDOM from 'react-dom';
import PersonnelCarousel from './components/PersonnelCarousel.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personnel: [],
      currentMovie: '5d20367ae5c39e473267de0f'
    }
    this.getPersonnel = this.getPersonnel.bind(this);
    this.getMovies = this.getMovies.bind(this);
  }

  componentDidMount(){
    this.getPersonnel();
  }

  getPersonnel(){
    fetch(`/api/personnel?id=${this.state.currentMovie}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(results => results.json())
      .then(results => this.setState({ personnel: results }))
  }

  getMovies(){
    fetch('/api/movies', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(results => results.json())
      .then(results => this.setState({ movies: results }))
  }

  render() {
    return (
      <div className="container">
        <PersonnelCarousel personnel={this.state.personnel} getMovies={this.getMovies}/>
      </div>
    )
  }

}

ReactDOM.render(<App/>, document.getElementById('app'));