import React from 'react';
import ReactDOM from 'react-dom';
import PersonnelCarousel from './components/PersonnelCarousel.jsx';
import MoviesCarousel from './components/MoviesCarousel.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personnel: [],
      featuredMovie: {},
      featuredPersonnel: null
    };
  }

  componentDidMount() {
    this.getFeaturedMovie('feature=true');
  }

  getFeaturedMovie(querystring) {
    return fetch(`/api/movies?${querystring}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(results => results.json())
      .then(results => this.setState({ featuredMovie: results }))
      .then(() => this.setState({personnel: this.state.featuredMovie.personnel}));
  }

  getPersonnelInfo(id) {
    fetch(`/api/personnel?id=${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(results => results.json())
    .then(results => this.setState({featuredPersonnel: results}))
  }

  render() {
    return this.state.personnel.length ? (
      <div className="container">
        <PersonnelCarousel personnel={this.state.personnel} movie={this.state.featuredMovie} set={this.getPersonnelInfo.bind(this)}/>
        <MoviesCarousel featuredPersonnel={this.state.featuredPersonnel} />
      </div>
    ) : <div>Loading...</div>
  }

}

export default App;
